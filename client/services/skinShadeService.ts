import { SkinShade, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const skinShadeService = {
  async getAll(): Promise<SkinShade[]> {
    const response = await fetch(`${API_BASE_URL}/skin-shades`);
    const data: ApiResponse<SkinShade[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch skin shades");
    return data.data || [];
  },

  async getById(id: string): Promise<SkinShade> {
    const response = await fetch(`${API_BASE_URL}/skin-shades/${id}`);
    const data: ApiResponse<SkinShade> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch skin shade");
    if (!data.data) throw new Error("Skin shade not found");
    return data.data;
  },

  async create(shade: Partial<SkinShade>): Promise<SkinShade> {
    const response = await fetch(`${API_BASE_URL}/skin-shades`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shade),
    });
    const data: ApiResponse<SkinShade> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create skin shade");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, shade: Partial<SkinShade>): Promise<SkinShade> {
    const response = await fetch(`${API_BASE_URL}/skin-shades/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(shade),
    });
    const data: ApiResponse<SkinShade> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update skin shade");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/skin-shades/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete skin shade");
  },
};
