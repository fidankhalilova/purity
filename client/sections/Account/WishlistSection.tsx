"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Heart, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { useLocale } from "next-intl";
import { userService } from "@/services/userService";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";
import { getImageUrl } from "@/utils/imageUrl";
import { toast } from "react-hot-toast";
import { cartService } from "@/services/cartService";
import { useAuth } from "@/context/AuthContext";

interface WishlistSectionProps {
  userId: string;
}

export default function WishlistSection({ userId }: WishlistSectionProps) {
  const t = useTranslations("AccountPage.wishlist");
  const locale = useLocale();
  const { accessToken, refreshCartCount } = useAuth();
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);

  useEffect(() => {
    loadWishlist();
  }, [userId]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const user = await userService.getById(userId, accessToken);
      const wishlistItems = user.wishlist || [];

      const fullProductDetails = await Promise.all(
        wishlistItems.map(async (item: Product) => {
          try {
            const productId = item._id || item.id;
            if (!productId) return item;

            const fullProduct = await productService.getById(productId);
            return fullProduct;
          } catch (error) {
            console.error(`Error fetching product ${item._id}:`, error);
            return item;
          }
        }),
      );

      setItems(fullProductDetails);
    } catch (error) {
      console.error("Error loading wishlist:", error);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      setRemovingId(productId);
      await userService.removeFromWishlist(userId, productId, accessToken);
      setItems(items.filter((item) => item._id !== productId));
      toast.success("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove from wishlist");
    } finally {
      setRemovingId(null);
    }
  };

  const addToCart = async (product: Product) => {
    if (!product.inStock) {
      toast.error("This product is out of stock");
      return;
    }

    try {
      setAddingToCartId(product._id);
      await cartService.addToCart(
        userId,
        {
          productId: product._id,
          quantity: 1,
          size: undefined,
          color: undefined,
        },
        accessToken || undefined,
      );

      if (refreshCartCount) refreshCartCount();
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setAddingToCartId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <Heart className="w-12 h-12 text-gray-200" />
        <p className="text-lg font-semibold text-gray-900">{t("emptyTitle")}</p>
        <p className="text-sm text-gray-500">{t("emptyDesc")}</p>
        <Link
          href={`/${locale}/shop`}
          className="mt-2 px-6 py-3 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors"
        >
          {t("exploreProducts")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {items.length} {t("savedItems")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-3xl border border-gray-100 overflow-hidden group"
          >
            <Link href={`/${locale}/shop/${item.id || item._id}`}>
              <div className="relative w-full aspect-square bg-[#f0ebe2] overflow-hidden">
                <Image
                  src={getImageUrl(item.images?.[0] || "")}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                      {t("outOfStock")}
                    </span>
                  </div>
                )}
              </div>
            </Link>
            <div className="p-4 flex flex-col gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-sm font-bold ${item.originalPrice ? "text-[#e8392a]" : "text-gray-900"}`}
                  >
                    ${item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${item.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.inStock || addingToCartId === item._id}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1f473e] text-white text-xs font-medium rounded-full hover:bg-[#163830] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {addingToCartId === item._id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ShoppingCart className="w-3.5 h-3.5" />
                  )}
                  {t("addToCart")}
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  disabled={removingId === item._id}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-red-50 hover:border-red-200 transition-colors disabled:opacity-50"
                >
                  {removingId === item._id ? (
                    <Loader2 className="w-3.5 h-3.5 text-gray-400 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
