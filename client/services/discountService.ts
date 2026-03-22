import { Discount, ApiResponse } from "@/types/discount";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const discountService = {
  async getAll(): Promise<Discount[]> {
    const response = await fetch(`${API_BASE_URL}/discounts`);
    const data: ApiResponse<Discount[]> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch discounts");
    return data.data || [];
  },

  async getById(id: string): Promise<Discount> {
    const response = await fetch(`${API_BASE_URL}/discounts/${id}`);
    const data: ApiResponse<Discount> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch discount");
    if (!data.data) throw new Error("Discount not found");
    return data.data;
  },

  async getByCode(code: string): Promise<Discount> {
    const response = await fetch(`${API_BASE_URL}/discounts/code/${code}`);
    const data: ApiResponse<Discount> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to fetch discount");
    if (!data.data) throw new Error("Discount not found");
    return data.data;
  },

  async create(discount: Partial<Discount>): Promise<Discount> {
    const response = await fetch(`${API_BASE_URL}/discounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discount),
    });
    const data: ApiResponse<Discount> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to create discount");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async update(id: string, discount: Partial<Discount>): Promise<Discount> {
    const response = await fetch(`${API_BASE_URL}/discounts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discount),
    });
    const data: ApiResponse<Discount> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update discount");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async updateStatus(
    id: string,
    status: "active" | "expired" | "disabled",
  ): Promise<Discount> {
    const response = await fetch(`${API_BASE_URL}/discounts/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data: ApiResponse<Discount> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to update discount status");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/discounts/${id}`, {
      method: "DELETE",
    });
    const data: ApiResponse = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to delete discount");
  },

  async applyToProduct(
    discountId: string,
    productId: string,
  ): Promise<Discount> {
    const response = await fetch(`${API_BASE_URL}/discounts/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ discountId, productId }),
    });
    const data: ApiResponse<Discount> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to apply discount to product");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },

  async removeFromProduct(id: string): Promise<Discount> {
    const response = await fetch(`${API_BASE_URL}/discounts/${id}/product`, {
      method: "DELETE",
    });
    const data: ApiResponse<Discount> = await response.json();
    if (!data.success)
      throw new Error(data.message || "Failed to remove discount from product");
    if (!data.data) throw new Error("No data returned");
    return data.data;
  },
};
