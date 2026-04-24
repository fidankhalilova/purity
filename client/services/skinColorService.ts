import { SkinColor, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const skinColorService = {
  async getAll(): Promise<SkinColor[]> {
    const response = await fetch(`${API_BASE_URL}/skin-colors`);
    const data: ApiResponse<SkinColor[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch skin colors");
    return data.data || [];
  },

  async getById(id: string): Promise<SkinColor> {
    const response = await fetch(`${API_BASE_URL}/skin-colors/${id}`);
    const data: ApiResponse<SkinColor> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch skin color");
    if (!data.data) throw new Error("Skin color not found");
    return data.data;
  },

  async create(color: Partial<SkinColor>): Promise<SkinColor> {
    const response = await fetch(`${API_BASE_URL}/skin-colors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(color),
    });
    const data: ApiResponse<SkinColor> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create skin color");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, color: Partial<SkinColor>): Promise<SkinColor> {
    const response = await fetch(`${API_BASE_URL}/skin-colors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(color),
    });
    const data: ApiResponse<SkinColor> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update skin color");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/skin-colors/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete skin color");
  },
};
