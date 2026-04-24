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

function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("accessToken");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
}

export const cartService = {
  async getCart(userId: string, token?: string): Promise<CartItem[]> {
    if (!userId) {
      console.log(
        "getCart called with undefined userId - returning empty cart",
      );
      return [];
    }

    const authToken =
      token || getAuthHeader().Authorization?.replace("Bearer ", "");
    if (!authToken) {
      console.log("No auth token available - user not logged in");
      return [];
    }

    try {
      const headers: HeadersInit = {
        Authorization: `Bearer ${authToken}`,
      };

      const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
        headers,
        credentials: "include",
      });

      if (response.status === 401 || response.status === 403) {
        console.log(
          "Authentication failed when fetching cart - user may be logged out",
        );
        return [];
      }

      const data = await response.json();
      if (!data.success) {
        if (data.message?.includes("token") || data.message?.includes("auth")) {
          console.log("Auth error when fetching cart:", data.message);
          return [];
        }
        throw new Error(data.message);
      }
      return data.data || [];
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  },

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
    if (!userId) {
      console.log("Cannot add to cart - no user ID");
      throw new Error("Please log in to add items to cart");
    }

    const authToken =
      token || getAuthHeader().Authorization?.replace("Bearer ", "");
    if (!authToken) {
      throw new Error("Please log in to add items to cart");
    }

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    };

    const payload: any = {
      productId: item.productId,
      quantity: item.quantity,
    };

    if (item.sizeId && /^[0-9a-fA-F]{24}$/.test(item.sizeId)) {
      payload.sizeId = item.sizeId;
    }
    if (item.colorId && /^[0-9a-fA-F]{24}$/.test(item.colorId)) {
      payload.colorId = item.colorId;
    }
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

  async updateQuantity(
    userId: string,
    itemId: string,
    quantity: number,
    token?: string,
  ): Promise<CartItem[]> {
    if (!userId || !isAuthenticated()) {
      throw new Error("Please log in to update cart");
    }

    const authToken =
      token || getAuthHeader().Authorization?.replace("Bearer ", "");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
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

  async removeItem(
    userId: string,
    itemId: string,
    token?: string,
  ): Promise<CartItem[]> {
    if (!userId || !isAuthenticated()) {
      throw new Error("Please log in to remove items from cart");
    }

    const authToken =
      token || getAuthHeader().Authorization?.replace("Bearer ", "");
    const headers: HeadersInit = {};
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
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
    return cart ? JSON.parse(cart) : [];
  },

  saveLocalCart(cart: CartItem[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem("guestCart", JSON.stringify(cart));
  },

  clearLocalCart() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("guestCart");
  },

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
