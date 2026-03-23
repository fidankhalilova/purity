// hooks/useCart.ts
import { useState } from "react";
import { toast } from "react-hot-toast";

interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
}

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const addToCart = async (
    productId: string,
    quantity: number,
    size?: string,
    color?: string,
  ) => {
    setLoading(true);
    try {
      // API call to add to cart
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, size, color }),
      });

      if (!response.ok) throw new Error("Failed to add to cart");

      const data = await response.json();
      setItems(data.items);
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, addToCart };
};
