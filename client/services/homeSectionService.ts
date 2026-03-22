import { HomeSection, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const homeSectionService = {
  async getAll(): Promise<HomeSection[]> {
    const response = await fetch(`${API_BASE_URL}/home-sections`);
    const data: ApiResponse<HomeSection[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch home sections");
    return data.data || [];
  },

  async getById(id: string): Promise<HomeSection> {
    const response = await fetch(`${API_BASE_URL}/home-sections/${id}`);
    const data: ApiResponse<HomeSection> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch home section");
    if (!data.data) throw new Error("Home section not found");
    return data.data;
  },

  async create(section: Partial<HomeSection>): Promise<HomeSection> {
    const response = await fetch(`${API_BASE_URL}/home-sections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    });
    const data: ApiResponse<HomeSection> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create home section");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(
    id: string,
    section: Partial<HomeSection>,
  ): Promise<HomeSection> {
    const response = await fetch(`${API_BASE_URL}/home-sections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    });
    const data: ApiResponse<HomeSection> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update home section");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/home-sections/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete home section");
  },
};
