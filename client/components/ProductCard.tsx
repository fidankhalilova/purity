"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import QuickView from "./QuickView";
import { getImageUrl } from "@/utils/imageUrl";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";
import { toast } from "react-hot-toast";

type Product = {
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
  href: string;
  description?: string;
  sizes?: { size: string; inStock: boolean }[];
  colors?: { name: string; hex: string; inStock?: boolean }[];
  inStock: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const { user, accessToken } = useAuth();

  // Create the quickViewProduct object with proper defaults and inStock for colors
  const quickViewProduct = {
    _id: product._id,
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    image: product.image,
    hoverImage: product.hoverImage,
    tags: product.tags,
    rating: product.rating,
    description: product.description,
    sizes: product.sizes || [],
    // Add inStock property to each color (default to true if not provided)
    colors: (product.colors || []).map((color) => ({
      name: color.name,
      hex: color.hex,
      inStock: color.inStock !== false, // Default to true
    })),
    inStock: product.inStock,
  };

  // Check if product is in wishlist on mount
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

  return (
    <>
      <div
        className="group flex flex-col gap-3 relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image box */}
        <Link
          href={product.href}
          className="relative block aspect-3/4 rounded-2xl overflow-hidden bg-[#f0ebe2]"
        >
          {/* Main image */}
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}
          />
          {/* Hover image */}
          <Image
            src={getImageUrl(product.hoverImage || product.image)}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
          />

          {/* Rating badge — top right */}
          <span className="absolute top-3 right-3 z-10 bg-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-gray-800">{product.rating.toFixed(1)}</span>
          </span>

          {/* Wishlist button - heart icon (top left) */}
          <button
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="absolute top-3 left-3 z-20 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
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

          {/* Out of Stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-15">
              <span className="text-white text-sm font-bold bg-black/60 px-3 py-1.5 rounded-full">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick view — slides up on hover (only if in stock) */}
          {product.inStock && (
            <div
              className={`absolute bottom-0 inset-x-0 p-3 transition-all duration-300 ${
                hovered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuickViewOpen(true);
                }}
                className="w-full bg-white text-gray-900 text-sm font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Quick view
              </button>
            </div>
          )}
        </Link>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-500"
            >
              {tag}
            </span>
          ))}
          {/* Discount badge next to tags */}
          {product.discount && (
            <span className="text-xs font-semibold bg-[#e8392a]/10 text-[#e8392a] px-2 py-0.5 rounded-full flex items-center justify-center">
              {product.discount}
            </span>
          )}
        </div>

        {/* Name */}
        <Link
          href={product.href}
          className="text-sm font-bold text-gray-900 hover:underline leading-snug"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-sm font-semibold ${
                product.originalPrice ? "text-[#e8392a]" : "text-gray-900"
              }`}
            >
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {quickViewOpen && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
}
