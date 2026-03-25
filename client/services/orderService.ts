// services/orderService.ts
import { Order, ApiResponse, CreateOrderInput } from "@/types/order";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const orderService = {
  async getAll(
    page?: number,
    limit?: number,
    token?: string | null,
  ): Promise<{ orders: Order[]; pagination: any }> {
    let url = `${API_BASE_URL}/orders`;
    if (page || limit) {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      if (limit) params.append("limit", limit.toString());
      url += `?${params.toString()}`;
    }

    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, { headers });
    const data: ApiResponse<Order[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch orders");

    return {
      orders: data.data || [],
      pagination: data.pagination || {
        page: page || 1,
        limit: limit || 10,
        total: 0,
        pages: 0,
      },
    };
  },

  async getById(id: string, token?: string | null): Promise<Order> {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/orders/${id}`, { headers });
    const data: ApiResponse<Order> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch order");
    if (!data.data) throw new Error("Order not found");
    return data.data;
  },

  async getUserOrders(userId: string, token?: string | null): Promise<Order[]> {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`, {
      headers,
    });
    const data: ApiResponse<Order[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch user orders");
    return data.data || [];
  },

  async create(
    orderData: CreateOrderInput,
    token?: string | null,
  ): Promise<Order> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify(orderData),
    });
    const data: ApiResponse<Order> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create order");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async updateStatus(
    id: string,
    status: Order["status"],
    trackingNumber?: string,
    token?: string | null,
  ): Promise<Order> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status, trackingNumber }),
    });
    const data: ApiResponse<Order> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update order status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async cancel(id: string, token?: string | null): Promise<Order> {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/orders/${id}/cancel`, {
      method: "POST",
      headers,
    });
    const data: ApiResponse<Order> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to cancel order");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },
};
