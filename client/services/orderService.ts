import { Order, ApiResponse } from "@/types/order";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const orderService = {
  async getAll(
    page?: number,
    limit?: number,
  ): Promise<{ orders: Order[]; pagination: any }> {
    let url = `${API_BASE_URL}/orders`;
    if (page || limit) {
      const params = new URLSearchParams();
      if (page) params.append("page", page.toString());
      if (limit) params.append("limit", limit.toString());
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
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

  async getById(id: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`);
    const data: ApiResponse<Order> = await response.json();
    if (!data.success) throw new Error(data.message || "Failed to fetch order");
    if (!data.data) throw new Error("Order not found");
    return data.data;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
    const data: ApiResponse<Order[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch user orders");
    return data.data || [];
  },

  async create(order: Partial<Order>): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
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
  ): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, trackingNumber }),
    });
    const data: ApiResponse<Order> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update order status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async cancel(id: string): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/cancel`, {
      method: "POST",
    });
    const data: ApiResponse<Order> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to cancel order");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },
};
