import { Collection, ApiResponse } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const collectionService = {
  async getAll(): Promise<Collection[]> {
    const response = await fetch(`${API_BASE_URL}/collections`);
    const data: ApiResponse<Collection[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch collections");
    return data.data || [];
  },

  async getById(id: string): Promise<Collection> {
    const response = await fetch(`${API_BASE_URL}/collections/${id}`);
    const data: ApiResponse<Collection> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch collection");
    if (!data.data) throw new Error("Collection not found");
    return data.data;
  },

  async create(collection: Partial<Collection>): Promise<Collection> {
    const response = await fetch(`${API_BASE_URL}/collections`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collection),
    });
    const data: ApiResponse<Collection> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create collection");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(
    id: string,
    collection: Partial<Collection>,
  ): Promise<Collection> {
    const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collection),
    });
    const data: ApiResponse<Collection> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update collection");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/collections/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete collection");
  },
};
