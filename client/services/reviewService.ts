import { Review, ApiResponse } from "@/types/review";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const reviewService = {
  async getAll(): Promise<Review[]> {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    const data: ApiResponse<Review[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch reviews");
    return data.data || [];
  },

  async getById(id: string): Promise<Review> {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`);
    const data: ApiResponse<Review> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch review");
    if (!data.data) throw new Error("Review not found");
    return data.data;
  },

  async getByProduct(productId: string): Promise<Review[]> {
    const response = await fetch(
      `${API_BASE_URL}/reviews/product/${productId}`,
    );
    const data: ApiResponse<Review[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch product reviews");
    return data.data || [];
  },

  async create(review: Partial<Review>): Promise<Review> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    const data: ApiResponse<Review> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create review");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  // Add this update method
  async update(id: string, review: Partial<Review>): Promise<Review> {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });
    const data: ApiResponse<Review> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update review");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async updateStatus(
    id: string,
    status: "published" | "deleted",
  ): Promise<Review> {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data: ApiResponse<Review> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update review status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete review");
  },
};
