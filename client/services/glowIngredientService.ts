// services/glowIngredientService.ts
import { GlowIngredient, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const glowIngredientService = {
  async getAll(token?: string | null): Promise<GlowIngredient[]> {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/glow-ingredients`, {
      headers,
    });
    const data: ApiResponse<GlowIngredient[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch glow ingredients");
    return data.data || [];
  },

  async getById(id: string, token?: string | null): Promise<GlowIngredient> {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/glow-ingredients/${id}`, {
      headers,
    });
    const data: ApiResponse<GlowIngredient> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch glow ingredient");
    if (!data.data) throw new Error("Glow ingredient not found");
    return data.data;
  },

  async create(
    ingredient: Partial<GlowIngredient>,
    token?: string | null,
  ): Promise<GlowIngredient> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/glow-ingredients`, {
      method: "POST",
      headers,
      body: JSON.stringify(ingredient),
    });
    const data: ApiResponse<GlowIngredient> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create glow ingredient");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(
    id: string,
    ingredient: Partial<GlowIngredient>,
    token?: string | null,
  ): Promise<GlowIngredient> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/glow-ingredients/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(ingredient),
    });
    const data: ApiResponse<GlowIngredient> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update glow ingredient");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string, token?: string | null): Promise<void> {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/glow-ingredients/${id}`, {
      method: "DELETE",
      headers,
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete glow ingredient");
  },
};
