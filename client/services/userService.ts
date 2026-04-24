import { User, ApiResponse } from "@/types/user";
import { Address } from "@/types/order";
import { Product } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const userService = {
  async getAll(token?: string | null): Promise<User[]> {
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users`, { headers });
    const data: ApiResponse<User[]> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch users");
    return data.data || [];
  },

  async getById(id: string, token?: string | null): Promise<User> {
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users/${id}`, { headers });
    const data: ApiResponse<User> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch user");
    if (!data.data) throw new Error("User not found");
    return data.data;
  },

  async create(
    user: Partial<User> & { password: string },
    token?: string | null,
  ): Promise<User> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers,
      body: JSON.stringify(user),
    });
    const data: ApiResponse<User> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to create user");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(
    id: string,
    user: Partial<User>,
    token?: string | null,
  ): Promise<User> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(user),
    });
    const data: ApiResponse<User> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to update user");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async updateStatus(
    id: string,
    status: "active" | "blocked",
    token?: string | null,
  ): Promise<User> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users/${id}/status`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });
    const data: ApiResponse<User> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update user status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async addAddress(
    userId: string,
    address: Partial<Address>,
    token?: string | null,
  ): Promise<Address[]> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}/addresses`, {
      method: "POST",
      headers,
      body: JSON.stringify(address),
    });
    const data: ApiResponse<Address[]> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to add address");
    return data.data || [];
  },

  async updateAddress(
    userId: string,
    addressId: string,
    address: Partial<Address>,
    token?: string | null,
  ): Promise<Address[]> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/addresses/${addressId}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(address),
      },
    );
    const data: ApiResponse<Address[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update address");
    return data.data || [];
  },

  async deleteAddress(
    userId: string,
    addressId: string,
    token?: string | null,
  ): Promise<Address[]> {
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/addresses/${addressId}`,
      {
        method: "DELETE",
        headers,
      },
    );
    const data: ApiResponse<Address[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete address");
    return data.data || [];
  },

  async addToWishlist(
    userId: string,
    productId: string,
    token?: string | null,
  ): Promise<Product[]> {
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/wishlist/${productId}`,
      {
        method: "POST",
        headers,
      },
    );
    const data: ApiResponse<Product[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to add to wishlist");
    return data.data || [];
  },

  async removeFromWishlist(
    userId: string,
    productId: string,
    token?: string | null,
  ): Promise<Product[]> {
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/users/${userId}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers,
      },
    );
    const data: ApiResponse<Product[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to remove from wishlist");
    return data.data || [];
  },

  async updateAvatar(
    userId: string,
    file: File,
    token?: string | null,
  ): Promise<User> {
    const formData = new FormData();
    formData.append("avatar", file);

    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}/avatar`, {
      method: "PATCH",
      headers,
      body: formData,
    });
    const data: ApiResponse<User> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update avatar");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    token?: string | null,
  ): Promise<void> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}/password`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update password");
  },

  async delete(id: string, token?: string | null): Promise<void> {
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers,
    });
    const data: ApiResponse = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to delete user");
  },
};
