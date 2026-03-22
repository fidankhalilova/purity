import { SkinConcern, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const skinConcernService = {
  async getAll(): Promise<SkinConcern[]> {
    const response = await fetch(`${API_BASE_URL}/skin-concerns`);
    const data: ApiResponse<SkinConcern[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch skin concerns");
    return data.data || [];
  },

  async getById(id: string): Promise<SkinConcern> {
    const response = await fetch(`${API_BASE_URL}/skin-concerns/${id}`);
    const data: ApiResponse<SkinConcern> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch skin concern");
    if (!data.data) throw new Error("Skin concern not found");
    return data.data;
  },

  async create(concern: Partial<SkinConcern>): Promise<SkinConcern> {
    const response = await fetch(`${API_BASE_URL}/skin-concerns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(concern),
    });
    const data: ApiResponse<SkinConcern> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create skin concern");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(
    id: string,
    concern: Partial<SkinConcern>,
  ): Promise<SkinConcern> {
    const response = await fetch(`${API_BASE_URL}/skin-concerns/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(concern),
    });
    const data: ApiResponse<SkinConcern> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update skin concern");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/skin-concerns/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete skin concern");
  },
};
