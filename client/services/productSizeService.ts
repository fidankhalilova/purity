import { ProductSize, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const productSizeService = {
  async getAll(): Promise<ProductSize[]> {
    const response = await fetch(`${API_BASE_URL}/product-sizes`);
    const data: ApiResponse<ProductSize[]> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch sizes");
    return data.data || [];
  },

  async getById(id: string): Promise<ProductSize> {
    const response = await fetch(`${API_BASE_URL}/product-sizes/${id}`);
    const data: ApiResponse<ProductSize> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch size");
    if (!data.data) throw new Error("Size not found");
    return data.data;
  },

  async create(size: Partial<ProductSize>): Promise<ProductSize> {
    const response = await fetch(`${API_BASE_URL}/product-sizes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(size),
    });
    const data: ApiResponse<ProductSize> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to create size");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, size: Partial<ProductSize>): Promise<ProductSize> {
    const response = await fetch(`${API_BASE_URL}/product-sizes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(size),
    });
    const data: ApiResponse<ProductSize> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to update size");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/product-sizes/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to delete size");
  },
};
