"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/utils/imageUrl";
import ProductAccordion from "./ProductAccordion";
import PairsWell from "./PairsWell";
import { useAuth } from "@/context/AuthContext";
import { userService } from "@/services/userService";
import { toast } from "react-hot-toast";
import { cartService } from "@/services/cartService";
import StickyAddToCart from "./StickyAddToCart";

interface ProductHeroProps {
  product: {
    _id: string;
    name: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    description: string;
    images: string[];
    badges: { icon: string; label: string }[];
    benefits: string[];
    actionImages: string[];
    productInfo: string;
    howToUse: string;
    ingredients: string;
    brand?: {
      _id: string;
      name: string;
      logo?: string;
      website?: string;
      description?: string;
      isFeatured?: boolean;
      isActive?: boolean;
    };
    formulation?: { _id: string; name: string };
    productColors?: {
      _id: string;
      name: string;
      hexCode?: string;
      inStock: boolean;
    }[];
    productSizes?: {
      _id: string;
      size: string;
      ml: number;
      price: string;
      originalPrice?: string;
      inStock: boolean;
    }[];
    pairsWell: {
      _id: string;
      name: string;
      price: string;
      originalPrice?: string;
      image: string;
      href: string;
    }[];
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : i < rating ? "text-yellow-300" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductHero({ product }: ProductHeroProps) {
  const t = useTranslations("ProductDetail");
  const router = useRouter();
  const { user, accessToken, refreshCartCount } = useAuth();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string | null>(() => {
    if (product.productColors && product.productColors.length > 0) {
      const inStockColor = product.productColors.find((c) => c.inStock);
      return inStockColor?._id ?? product.productColors[0]?._id ?? null;
    }
    return null;
  });

  const [selectedSize, setSelectedSize] = useState<string | null>(() => {
    if (product.productSizes && product.productSizes.length > 0) {
      const inStockSize = product.productSizes.find((s) => s.inStock);
      return inStockSize?._id ?? product.productSizes[0]?._id ?? null;
    }
    return null;
  });

  const [stickyQty, setStickyQty] = useState(qty);

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

  const handleWishlist = async () => {
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
      const selectedSizeObj = product.productSizes?.find(
        (s) => s._id === selectedSize,
      );
      const selectedColorObj = product.productColors?.find(
        (c) => c._id === selectedColor,
      );

      const existingItemIndex = guestCart.findIndex(
        (item) =>
          item.productId === product._id &&
          item.size === selectedSizeObj?.size &&
          item.color === selectedColorObj?.name,
      );

      if (existingItemIndex !== -1) {
        guestCart[existingItemIndex].qty += qty;
      } else {
        guestCart.push({
          id: `temp_${Date.now()}`,
          productId: product._id,
          name: product.name,
          price: displayPrice,
          originalPrice: displayOriginalPrice,
          image: product.images?.[0] || "",
          qty: qty,
          size: selectedSizeObj?.size,
          color: selectedColorObj?.name,
          sizeId: undefined,
          colorId: undefined,
          inStock: product.inStock,
        });
      }

      cartService.saveLocalCart(guestCart);
      if (refreshCartCount) refreshCartCount();
      toast.success("Added to cart! Sign in to save your cart.");
      return;
    }

    try {
      setAddingToCart(true);
      const selectedSizeObj = product.productSizes?.find(
        (s) => s._id === selectedSize,
      );
      const selectedColorObj = product.productColors?.find(
        (c) => c._id === selectedColor,
      );

      await cartService.addToCart(
        user._id,
        {
          productId: product._id,
          quantity: qty,
          size: selectedSizeObj?.size,
          color: selectedColorObj?.name,
        },
        accessToken || undefined,
      );

      if (refreshCartCount) refreshCartCount();
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    const selectedSizeObj = product.productSizes?.find(
      (s) => s._id === selectedSize,
    );
    const selectedColorObj = product.productColors?.find(
      (c) => c._id === selectedColor,
    );

    const checkoutItem = {
      productId: product._id,
      name: product.name,
      price: displayPrice,
      image: product.images?.[0] || "",
      quantity: qty,
      size: selectedSizeObj?.size,
      color: selectedColorObj?.name,
      sizeId: selectedSize,
      colorId: selectedColor,
    };
    sessionStorage.setItem("directCheckout", JSON.stringify(checkoutItem));
    router.push("/checkout");
  };

  const handleStickyQuantityChange = (newQty: number) => {
    setQty(newQty);
    setStickyQty(newQty);
  };

  const gridImages = product.images?.slice(0, 6) || [];
  const activeSize = product.productSizes?.find((s) => s._id === selectedSize);
  const displayPrice = activeSize?.price ?? product.price;
  const displayOriginalPrice =
    activeSize?.originalPrice ?? product.originalPrice;

  const selectedColorObj = selectedColor
    ? product.productColors?.find((c) => c._id === selectedColor)
    : null;
  const selectedSizeObj = selectedSize
    ? product.productSizes?.find((s) => s._id === selectedSize)
    : null;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 py-6 md:py-8">
        {/* Left — images */}
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-pointer bg-[#f0ebe2]">
            {gridImages[activeImg] && (
              <Image
                src={getImageUrl(gridImages[activeImg])}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-300"
              />
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {gridImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                  activeImg === i ? "border-[#1f473e]" : "border-transparent"
                }`}
              >
                <Image
                  src={getImageUrl(img)}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right — info */}
        <div className="flex flex-col gap-4 md:gap-5">
          {/* Brand + formulation tags + wishlist */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {product.brand && (
                <div className="flex items-center gap-2 bg-[#1f473e]/10 px-3 py-1.5 rounded-full">
                  {product.brand.logo ? (
                    <div className="relative w-5 h-5 shrink-0 rounded-full overflow-hidden bg-white">
                      <Image
                        src={getImageUrl(product.brand.logo)}
                        alt={product.brand.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#1f473e] flex items-center justify-center shrink-0">
                      <span className="text-[9px] font-black text-white leading-none">
                        {product.brand.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-xs font-semibold text-[#1f473e]">
                    {product.brand.name}
                  </span>
                </div>
              )}
              {product.formulation && (
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                  {product.formulation.name}
                </span>
              )}
            </div>

            <button
              onClick={handleWishlist}
              disabled={wishlistLoading}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                size={18}
                className={`transition-colors ${
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-400"
                }`}
              />
            </button>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <Stars rating={product.rating} />
            <span className="text-sm font-semibold text-gray-700">
              {product.rating}
            </span>
            <span className="text-sm text-gray-400">
              ({product.reviewCount} {t("reviews")})
            </span>
          </div>

          {/* Price */}
          <div>
            <div className="flex items-baseline gap-2">
              <p
                className={`text-xl md:text-2xl font-bold ${displayOriginalPrice ? "text-[#e8392a]" : "text-gray-900"}`}
              >
                {displayPrice}
              </p>
              {displayOriginalPrice && (
                <p className="text-base text-gray-400 line-through">
                  {displayOriginalPrice}
                </p>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {t("taxesIncluded")}{" "}
              <a href="#" className="underline text-gray-600">
                {t("shipping")}
              </a>{" "}
              {t("shippingCalculated")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-400"}`}
            />
            <span
              className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}
            >
              {product.inStock ? t("inStock") : t("outOfStock")}
            </span>
          </div>

          {/* Color selector */}
          {product.productColors && product.productColors.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-700">
                  {t("color") ?? "Color"}:
                </p>
                <p className="text-sm text-gray-500">
                  {
                    product.productColors.find((c) => c._id === selectedColor)
                      ?.name
                  }
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.productColors.map((color) => (
                  <button
                    key={color._id}
                    onClick={() => setSelectedColor(color._id)}
                    title={color.name}
                    disabled={!color.inStock}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color._id
                        ? "border-[#1f473e] scale-110 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    } ${!color.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ backgroundColor: color.hexCode ?? "#e5e7eb" }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {product.productSizes && product.productSizes.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-gray-700">
                {t("size") ?? "Size"}:
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.productSizes.map((size) => (
                  <button
                    key={size._id}
                    onClick={() => {
                      if (size.inStock) setSelectedSize(size._id);
                    }}
                    disabled={!size.inStock}
                    className={`relative px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                      selectedSize === size._id
                        ? "border-[#1f473e] bg-[#1f473e] text-white"
                        : size.inStock
                          ? "border-gray-200 text-gray-700 hover:border-[#1f473e]/50"
                          : "border-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {!size.inStock && (
                      <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="w-full h-px bg-gray-300 absolute rotate-[-20deg]" />
                      </span>
                    )}
                    {size.size}
                    {size.price &&
                      selectedSize !== size._id &&
                      size.inStock && (
                        <span className="ml-1 text-xs text-gray-400">
                          {size.price}
                        </span>
                      )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-3 w-fit">
              <button
                onClick={() => {
                  const newQty = Math.max(1, qty - 1);
                  setQty(newQty);
                  setStickyQty(newQty);
                }}
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
              <span className="text-sm font-medium w-4 text-center">{qty}</span>
              <button
                onClick={() => {
                  const newQty = qty + 1;
                  setQty(newQty);
                  setStickyQty(newQty);
                }}
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
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || !product.inStock}
              className="flex-1 bg-[#1f473e] text-white py-3 px-6 rounded-full font-medium hover:bg-[#163830] transition-colors text-sm disabled:opacity-50"
            >
              {addingToCart
                ? "Adding..."
                : `${t("addToCart")} — ${displayPrice}`}
            </button>
          </div>

          {/* Buy It Now button */}
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="w-full border border-gray-200 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm disabled:opacity-50"
          >
            {t("buyItNow")}
          </button>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4 text-gray-400 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              {t("freeShipping")}{" "}
              <a href="#" className="underline ml-1">
                {t("shippingPolicy")}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg
                className="w-4 h-4 text-gray-400 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              {t("returns")}{" "}
              <a href="#" className="underline ml-1">
                {t("returnPolicy")}
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {product.badges.length > 0 && (
            <div className="flex gap-4 md:gap-6 flex-wrap">
              {product.badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center text-lg md:text-xl">
                    {badge.icon}
                  </div>
                  <span className="text-xs text-gray-600 text-center">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {product.benefits.length > 0 && (
            <div className="bg-gray-50 rounded-2xl p-4 md:p-5">
              <p className="font-bold text-gray-900 mb-3">{t("topBenefits")}</p>
              <ul className="flex flex-col gap-1.5">
                {product.benefits.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-gray-400 mt-0.5">•</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.actionImages.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                {t("seeInAction")}
              </p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.actionImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={getImageUrl(img)}
                      alt="In action"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <ProductAccordion product={product} />
          {product.pairsWell && product.pairsWell.length > 0 && (
            <PairsWell items={product.pairsWell} />
          )}
        </div>
      </div>

      {/* Sticky Add to Cart Component */}
      <StickyAddToCart
        product={{
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          inStock: product.inStock,
        }}
        selectedSize={selectedSizeObj}
        selectedColor={selectedColorObj}
        qty={qty}
        onQuantityChange={handleStickyQuantityChange}
      />
    </>
  );
}
