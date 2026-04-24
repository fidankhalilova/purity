import { Brand, ApiResponse } from "@/types/brand";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const brandService = {
  async getAll(): Promise<Brand[]> {
    const response = await fetch(`${API_BASE_URL}/brands`);
    const data: ApiResponse<Brand[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch brands");
    return data.data || [];
  },

  async getById(id: string): Promise<Brand> {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`);
    const data: ApiResponse<Brand> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch brand");
    if (!data.data) throw new Error("Brand not found");
    return data.data;
  },

  async getProductsByBrand(id: string): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/brands/${id}/products`);
    const data: ApiResponse<any[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch brand products");
    return data.data || [];
  },

  async create(brand: Partial<Brand>): Promise<Brand> {
    const response = await fetch(`${API_BASE_URL}/brands`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    });
    const data: ApiResponse<Brand> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create brand");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, brand: Partial<Brand>): Promise<Brand> {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brand),
    });
    const data: ApiResponse<Brand> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update brand");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async toggleFeatured(id: string): Promise<Brand> {
    const response = await fetch(
      `${API_BASE_URL}/brands/${id}/toggle-featured`,
      {
        method: "PATCH",
      },
    );
    const data: ApiResponse<Brand> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to toggle featured status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async toggleActive(id: string): Promise<Brand> {
    const response = await fetch(`${API_BASE_URL}/brands/${id}/toggle-active`, {
      method: "PATCH",
    });
    const data: ApiResponse<Brand> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to toggle active status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/brands/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete brand");
  },
};
