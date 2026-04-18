// services/productService.ts
import { Product, ProductListResponse, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// All fields to populate for full product detail
const DETAIL_POPULATE =
  "productColors,productSizes,badges,brand,formulation,glowIngredients";
const LIST_POPULATE =
  "collection,tags,badges,productColors,productSizes,brand,formulation";

async function handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text || response.statusText}`);
  }
  const data: ApiResponse<T> = await response.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data;
}

export const productService = {
  // ─── READ ──────────────────────────────────────────────────────────────────

  async getAll(
    page?: number,
    limit?: number,
    options?: {
      search?: string;
      collection?: string;
      tag?: string;
      inStock?: boolean;
      status?: "active" | "draft";
      sort?: string;
      order?: "asc" | "desc";
      priceMin?: number;
      priceMax?: number;
      colors?: string[];
      sizes?: string[];
      brands?: string[];
      categories?: string[];
      concerns?: string[];
      formulations?: string[];
      onSale?: boolean;
      newArrivals?: boolean;
    },
  ): Promise<ProductListResponse> {
    const params = new URLSearchParams();

    // Pagination
    if (page) params.append("page", page.toString());
    if (limit) params.append("limit", limit.toString());

    // Search
    if (options?.search) params.append("search", options.search);

    // Simple filters
    if (options?.collection) params.append("collection", options.collection);
    if (options?.tag) params.append("tag", options.tag);
    if (options?.inStock !== undefined)
      params.append("inStock", options.inStock.toString());
    if (options?.status) params.append("status", options.status);

    // Sorting
    if (options?.sort) params.append("sort", options.sort);
    if (options?.order) params.append("order", options.order);

    // Price range
    if (options?.priceMin && options.priceMin > 0) {
      params.append("priceMin", options.priceMin.toString());
    }
    if (options?.priceMax && options.priceMax < 585) {
      params.append("priceMax", options.priceMax.toString());
    }

    // Array filters
    if (options?.colors && options.colors.length > 0) {
      params.append("colors", options.colors.join(","));
    }
    if (options?.sizes && options.sizes.length > 0) {
      params.append("sizes", options.sizes.join(","));
    }
    if (options?.brands && options.brands.length > 0) {
      params.append("brands", options.brands.join(","));
    }
    if (options?.categories && options.categories.length > 0) {
      params.append("categories", options.categories.join(","));
    }
    if (options?.concerns && options.concerns.length > 0) {
      params.append("concerns", options.concerns.join(","));
    }
    if (options?.formulations && options.formulations.length > 0) {
      params.append("formulations", options.formulations.join(","));
    }

    // Special filters
    if (options?.onSale) params.append("onSale", "true");
    if (options?.newArrivals) params.append("newArrivals", "true");

    params.append("populate", LIST_POPULATE);

    console.log("Fetching products with params:", params.toString());

    const response = await fetch(
      `${API_BASE_URL}/products?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data: ApiResponse<Product[]> = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to fetch products");
    }

    return {
      products: data.data || [],
      pagination: data.pagination || {
        page: page || 1,
        limit: limit || 10,
        total: 0,
        pages: 0,
      },
    };
  },

  async getById(id: string): Promise<Product> {
    try {
      const params = new URLSearchParams({
        populate: DETAIL_POPULATE,
      });

      // First try: find by custom id field (e.g., "prd-123456789-abc123")
      let response = await fetch(
        `${API_BASE_URL}/products/id/${encodeURIComponent(id)}?${params.toString()}`,
      );
      let data: ApiResponse<Product> = await response.json();

      // Second try: find by slug
      if (!data.success || !data.data) {
        response = await fetch(
          `${API_BASE_URL}/products/slug/${encodeURIComponent(id)}?${params.toString()}`,
        );
        data = await response.json();
      }

      // Third try: find by MongoDB _id
      if (!data.success || !data.data) {
        response = await fetch(
          `${API_BASE_URL}/products/${encodeURIComponent(id)}?${params.toString()}`,
        );
        data = await response.json();
      }

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch product");
      }
      if (!data.data) throw new Error("Product not found");
      return data.data;
    } catch (error) {
      console.error("Error fetching product by id:", error);
      throw error;
    }
  },

  async getBySlug(slug: string): Promise<Product> {
    const params = new URLSearchParams({ populate: DETAIL_POPULATE });
    const response = await fetch(
      `${API_BASE_URL}/products/slug/${slug}?${params.toString()}`,
    );
    const data = await handleResponse<Product>(response);
    if (!data.data) throw new Error("Product not found");
    return data.data;
  },

  async getRelated(
    productId: string,
    type: "pairsWell" | "boughtTogether" | "similarProducts",
  ): Promise<Product[]> {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/related?type=${type}&populate=productSizes,productColors`,
    );
    const data = await handleResponse<Product[]>(response);
    return data.data || [];
  },

  async search(query: string, limit = 10): Promise<Product[]> {
    const params = new URLSearchParams({
      search: query,
      limit: limit.toString(),
      populate: LIST_POPULATE,
    });
    const response = await fetch(
      `${API_BASE_URL}/products?${params.toString()}`,
    );
    const data = await handleResponse<Product[]>(response);
    return data.data || [];
  },

  async getByCollection(collectionId: string): Promise<Product[]> {
    const params = new URLSearchParams({
      collection: collectionId,
      populate: LIST_POPULATE,
    });
    const response = await fetch(
      `${API_BASE_URL}/products?${params.toString()}`,
    );
    const data = await handleResponse<Product[]>(response);
    return data.data || [];
  },

  // ─── WRITE ─────────────────────────────────────────────────────────────────

  async create(product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await handleResponse<Product>(response);
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await handleResponse<Product>(response);
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async patch(id: string, fields: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const data = await handleResponse<Product>(response);
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    await handleResponse(response);
  },

  async bulkDelete(ids: string[]): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/bulk-delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    await handleResponse(response);
  },

  async toggleStock(id: string, inStock: boolean): Promise<Product> {
    return productService.patch(id, { inStock });
  },

  async toggleStatus(id: string, status: "active" | "draft"): Promise<Product> {
    return productService.patch(id, { status });
  },
};
