import { SkinType, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const skinTypeService = {
  async getAll(): Promise<SkinType[]> {
    const response = await fetch(`${API_BASE_URL}/skin-types`);
    const data: ApiResponse<SkinType[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch skin types");
    return data.data || [];
  },

  async getById(id: string): Promise<SkinType> {
    const response = await fetch(`${API_BASE_URL}/skin-types/${id}`);
    const data: ApiResponse<SkinType> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch skin type");
    if (!data.data) throw new Error("Skin type not found");
    return data.data;
  },

  async create(skinType: Partial<SkinType>): Promise<SkinType> {
    const response = await fetch(`${API_BASE_URL}/skin-types`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skinType),
    });
    const data: ApiResponse<SkinType> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create skin type");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, skinType: Partial<SkinType>): Promise<SkinType> {
    const response = await fetch(`${API_BASE_URL}/skin-types/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skinType),
    });
    const data: ApiResponse<SkinType> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update skin type");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/skin-types/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete skin type");
  },
};
