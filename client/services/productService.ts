import { Product, ProductListResponse, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const productService = {
  async getAll(page?: number, limit?: number): Promise<ProductListResponse> {
    let url = `${API_BASE_URL}/products`;
    if (page || limit) {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      if (limit) params.append("limit", limit.toString());
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const data: ApiResponse<Product[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch products");

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
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    const data: ApiResponse<Product> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch product");
    if (!data.data) throw new Error("Product not found");
    return data.data;
  },

  async create(product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data: ApiResponse<Product> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create product");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data: ApiResponse<Product> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update product");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete product");
  },
};
