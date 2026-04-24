import { Tag, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const tagService = {
  async getAll(): Promise<Tag[]> {
    const response = await fetch(`${API_BASE_URL}/tags`);
    const data: ApiResponse<Tag[]> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch tags");
    return data.data || [];
  },

  async getById(id: string): Promise<Tag> {
    const response = await fetch(`${API_BASE_URL}/tags/${id}`);
    const data: ApiResponse<Tag> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch tag");
    if (!data.data) throw new Error("Tag not found");
    return data.data;
  },

  async create(tag: Partial<Tag>): Promise<Tag> {
    const response = await fetch(`${API_BASE_URL}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag),
    });
    const data: ApiResponse<Tag> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to create tag");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, tag: Partial<Tag>): Promise<Tag> {
    const response = await fetch(`${API_BASE_URL}/tags/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag),
    });
    const data: ApiResponse<Tag> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to update tag");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tags/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to delete tag");
  },
};
