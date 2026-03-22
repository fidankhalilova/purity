import { ProductColor } from "@/types/product";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const productColorService = {
  async getAll(): Promise<ProductColor[]> {
    console.log("Fetching from:", `${API_BASE_URL}/product-colors`); // Add this line
    try {
      const response = await fetch(`${API_BASE_URL}/product-colors`);
      console.log("Response status:", response.status); // Add this line
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data.data;
    } catch (error) {
      console.error("Fetch error details:", error); // Add this line
      throw error;
    }
  },

  async getById(id: string): Promise<ProductColor> {
    const response = await fetch(`${API_BASE_URL}/product-colors/${id}`);
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async create(color: Partial<ProductColor>): Promise<ProductColor> {
    const response = await fetch(`${API_BASE_URL}/product-colors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(color),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async update(
    id: string,
    color: Partial<ProductColor>,
  ): Promise<ProductColor> {
    const response = await fetch(`${API_BASE_URL}/product-colors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(color),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/product-colors/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
  },
};
