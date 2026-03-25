// services/cartService.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  qty: number;
  size?: string | null;
  color?: string | null;
  sizeId?: string | null;
  colorId?: string | null;
  inStock: boolean;
}

export const cartService = {
  // Get cart from backend
  async getCart(userId: string, token?: string): Promise<CartItem[]> {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
      headers,
      credentials: "include",
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  // services/cartService.ts - Updated addToCart method
  async addToCart(
    userId: string,
    item: {
      productId: string;
      quantity: number;
      sizeId?: string | null;
      colorId?: string | null;
      size?: string | null;
      color?: string | null;
    },
    token?: string,
  ): Promise<CartItem[]> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Only include fields that are provided and not empty
    const payload: any = {
      productId: item.productId,
      quantity: item.quantity,
    };

    // Only add sizeId if it's a valid ObjectId string (24 hex chars or 12 bytes)
    if (item.sizeId && /^[0-9a-fA-F]{24}$/.test(item.sizeId)) {
      payload.sizeId = item.sizeId;
    }
    // Only add colorId if it's a valid ObjectId string
    if (item.colorId && /^[0-9a-fA-F]{24}$/.test(item.colorId)) {
      payload.colorId = item.colorId;
    }
    // Always add size and color as strings if provided
    if (item.size) payload.size = item.size;
    if (item.color) payload.color = item.color;

    const response = await fetch(`${API_BASE_URL}/cart/${userId}/add`, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  // Update quantity
  async updateQuantity(
    userId: string,
    itemId: string,
    quantity: number,
    token?: string,
  ): Promise<CartItem[]> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/cart/${userId}/items/${itemId}`,
      {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify({ quantity }),
      },
    );

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  // Remove item
  async removeItem(
    userId: string,
    itemId: string,
    token?: string,
  ): Promise<CartItem[]> {
    const headers: HeadersInit = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${API_BASE_URL}/cart/${userId}/items/${itemId}`,
      {
        method: "DELETE",
        headers,
        credentials: "include",
      },
    );

    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  getLocalCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem("guestCart");
    console.log("Getting local cart:", cart);
    return cart ? JSON.parse(cart) : [];
  },

  saveLocalCart(cart: CartItem[]) {
    if (typeof window === "undefined") return;
    console.log("Saving local cart:", cart);
    localStorage.setItem("guestCart", JSON.stringify(cart));
  },

  clearLocalCart() {
    if (typeof window === "undefined") return;
    console.log("Clearing local cart");
    localStorage.removeItem("guestCart");
  },

  // Sync local cart to backend when user logs in
  async syncLocalCartToBackend(userId: string, token: string): Promise<void> {
    const localCart = this.getLocalCart();
    if (localCart.length === 0) return;

    for (const item of localCart) {
      try {
        await this.addToCart(
          userId,
          {
            productId: item.productId,
            quantity: item.qty,
            sizeId: item.sizeId,
            colorId: item.colorId,
            size: item.size,
            color: item.color,
          },
          token,
        );
      } catch (error) {
        console.error("Error syncing cart item:", error);
      }
    }

    this.clearLocalCart();
  },
};
