import { User, ApiResponse } from "@/types/user";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const userService = {
  async getAll(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`);
    const data: ApiResponse<User[]> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch users");
    return data.data || [];
  },

  async getById(id: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    const data: ApiResponse<User> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch user");
    if (!data.data) throw new Error("User not found");
    return data.data;
  },

  async create(user: Partial<User> & { password: string }): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data: ApiResponse<User> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to create user");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, user: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data: ApiResponse<User> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to update user");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async updateStatus(id: string, status: "active" | "blocked"): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data: ApiResponse<User> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update user status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to delete user");
  },
};
