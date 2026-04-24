"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/utils/imageUrl";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";
import { cartService } from "@/services/cartService";

type SizeOption = {
  size: string;
  inStock: boolean;
  price?: string;
};

type ColorOption = {
  name: string;
  hex: string;
  inStock: boolean;
};

type QuickViewProduct = {
  _id: string;
  id?: string;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  hoverImage?: string;
  tags: string[];
  rating: number;
  description?: string;
  sizes: SizeOption[];
  colors: ColorOption[];
  inStock: boolean;
};

function QuickViewContent({
  product,
  onClose,
}: {
  product: QuickViewProduct;
  onClose: () => void;
}) {
  const t = useTranslations("ProductDetail");
  const { user, accessToken, refreshCartCount } = useAuth();

  useEffect(() => {
    console.log("QuickView received product:", {
      name: product.name,
      sizesCount: product.sizes?.length,
      colorsCount: product.colors?.length,
      sizes: product.sizes,
      colors: product.colors,
    });
  }, [product]);

  const firstSize =
    product.sizes?.find((s) => s.inStock)?.size ||
    product.sizes?.[0]?.size ||
    null;
  const firstColor =
    product.colors?.find((c) => c.inStock)?.name ||
    product.colors?.[0]?.name ||
    null;

  const [selectedSize, setSelectedSize] = useState<string | null>(firstSize);
  const [selectedColor, setSelectedColor] = useState<string | null>(firstColor);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      if (user) {
        try {
          const userData = await userService.getById(user._id, accessToken);
          setIsWishlisted(
            userData.wishlist?.some((item: any) => item._id === product._id),
          );
        } catch (error) {
          console.error("Error checking wishlist:", error);
        }
      }
    };
    checkWishlist();
  }, [user, product._id, accessToken]);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    try {
      setWishlistLoading(true);
      if (isWishlisted) {
        await userService.removeFromWishlist(
          user._id,
          product._id,
          accessToken,
        );
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await userService.addToWishlist(user._id, product._id, accessToken);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      const guestCart = cartService.getLocalCart();
      const existingItemIndex = guestCart.findIndex(
        (item) =>
          item.productId === product._id &&
          item.size === selectedSize &&
          item.color === selectedColor,
      );

      const qtyToAdd = quantity;

      if (existingItemIndex !== -1) {
        guestCart[existingItemIndex].qty += qtyToAdd;
      } else {
        guestCart.push({
          id: `temp_${Date.now()}`,
          productId: product._id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          qty: qtyToAdd,
          size: selectedSize || undefined,
          color: selectedColor || undefined,
          sizeId: undefined,
          colorId: undefined,
          inStock: product.inStock,
        });
      }

      cartService.saveLocalCart(guestCart);

      // Update cart count
      if (refreshCartCount) {
        refreshCartCount();
      }

      toast.success("Added to cart! Sign in to save your cart.");
      onClose();
      return;
    }

    try {
      setAddingToCart(true);

      await cartService.addToCart(
        user._id,
        {
          productId: product._id,
          quantity: quantity,
          size: selectedSize || undefined,
          color: selectedColor || undefined,
        },
        accessToken || undefined,
      );

      if (refreshCartCount) {
        refreshCartCount();
      }

      toast.success("Added to cart!");
      onClose();
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const productSlug = product.id || product._id;
  const productHref = `/shop/${productSlug}`;

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden w-full max-w-3xl flex flex-col sm:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-100 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full sm:w-80 md:w-96 shrink-0 aspect-square sm:aspect-auto sm:self-stretch bg-[#f0ebe2]">
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.discount && (
            <span className="absolute top-3 left-3 bg-[#e8392a] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {product.discount}
            </span>
          )}
          <span className="absolute bottom-3 right-3 sm:top-3 sm:bottom-auto bg-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-800">{product.rating.toFixed(1)}</span>
          </span>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="absolute top-3 left-3 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50 sm:top-3 sm:left-3"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart
              size={16}
              className={`transition-colors ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-400"
              }`}
            />
          </button>

          {/* Out of Stock */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-15">
              <span className="text-white text-sm font-bold bg-black/60 px-3 py-1.5 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 p-7 overflow-y-auto flex-1">
          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs border border-gray-200 rounded-full px-3 py-1 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link href={productHref} onClick={onClose}>
            <h2 className="text-xl font-bold text-gray-900 leading-snug hover:text-[#1f473e] transition-colors">
              {product.name}
            </h2>
          </Link>

          <div className="flex items-baseline gap-2">
            <span
              className={`text-lg font-semibold ${product.originalPrice ? "text-[#e8392a]" : "text-gray-900"}`}
            >
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          {product.description && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {product.description}
            </p>
          )}

          {/* Size selector */}
          {product.inStock && product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {t("size")}
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size, idx) => (
                  <button
                    key={`size-${idx}-${size.size}`}
                    onClick={() => setSelectedSize(size.size)}
                    disabled={!size.inStock}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition-colors font-medium ${
                      selectedSize === size.size
                        ? "border-[#1f473e] bg-[#1f473e] text-white"
                        : size.inStock
                          ? "border-gray-200 text-gray-600 hover:border-gray-400"
                          : "border-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          {product.inStock && product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {t("color")} —{" "}
                <span className="font-normal normal-case text-gray-400">
                  {selectedColor || "Select color"}
                </span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color, idx) => (
                  <button
                    key={`color-${idx}-${color.name}`}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? "border-[#1f473e] scale-110"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      boxShadow: "0 0 0 1px #e5e7eb",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          {product.inStock && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                {t("quantity")}
              </p>
              <div className="flex items-center gap-3 border border-gray-200 rounded-full w-fit px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <span className="text-sm font-medium w-4 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-2 mt-auto pt-2">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || !product.inStock}
              className="w-full bg-[#1f473e] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#163830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart
                ? "Adding..."
                : product.inStock
                  ? `${t("addToCart")} — ${product.price}`
                  : "Out of Stock"}
            </button>
            <Link
              href={productHref}
              onClick={onClose}
              className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-center"
            >
              {t("viewFullDetails")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuickView({
  product,
  onClose,
}: {
  product: QuickViewProduct;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <QuickViewContent product={product} onClose={onClose} />,
    document.body,
  );
}
