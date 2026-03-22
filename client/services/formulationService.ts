import { Formulation, ApiResponse } from "@/types/formulation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const formulationService = {
  async getAll(): Promise<Formulation[]> {
    const response = await fetch(`${API_BASE_URL}/formulations`);
    const data: ApiResponse<Formulation[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch formulations");
    return data.data || [];
  },

  async getById(id: string): Promise<Formulation> {
    const response = await fetch(`${API_BASE_URL}/formulations/${id}`);
    const data: ApiResponse<Formulation> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch formulation");
    if (!data.data) throw new Error("Formulation not found");
    return data.data;
  },

  async getProductsByFormulation(id: string): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/formulations/${id}/products`);
    const data: ApiResponse<any[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch formulation products");
    return data.data || [];
  },

  async create(formulation: Partial<Formulation>): Promise<Formulation> {
    const response = await fetch(`${API_BASE_URL}/formulations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulation),
    });
    const data: ApiResponse<Formulation> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create formulation");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(
    id: string,
    formulation: Partial<Formulation>,
  ): Promise<Formulation> {
    const response = await fetch(`${API_BASE_URL}/formulations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulation),
    });
    const data: ApiResponse<Formulation> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update formulation");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async toggleActive(id: string): Promise<Formulation> {
    const response = await fetch(
      `${API_BASE_URL}/formulations/${id}/toggle-active`,
      {
        method: "PATCH",
      },
    );
    const data: ApiResponse<Formulation> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to toggle active status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/formulations/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete formulation");
  },
};
