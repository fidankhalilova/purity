import { Badge, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const badgeService = {
  async getAll(): Promise<Badge[]> {
    const response = await fetch(`${API_BASE_URL}/badges`);
    const data: ApiResponse<Badge[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch badges");
    return data.data || [];
  },

  async getById(id: string): Promise<Badge> {
    const response = await fetch(`${API_BASE_URL}/badges/${id}`);
    const data: ApiResponse<Badge> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch badge");
    if (!data.data) throw new Error("Badge not found");
    return data.data;
  },

  async create(badge: Partial<Badge>): Promise<Badge> {
    const response = await fetch(`${API_BASE_URL}/badges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(badge),
    });
    const data: ApiResponse<Badge> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create badge");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, badge: Partial<Badge>): Promise<Badge> {
    const response = await fetch(`${API_BASE_URL}/badges/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(badge),
    });
    const data: ApiResponse<Badge> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update badge");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/badges/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete badge");
  },
};
