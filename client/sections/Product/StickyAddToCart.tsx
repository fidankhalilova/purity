"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/utils/imageUrl";
import { useRouter } from "next/navigation";

interface StickyAddToCartProps {
  product: {
    _id: string;
    name: string;
    price: string;
    images: string[];
    inStock: boolean;
  };
  selectedSize?: { _id: string; size: string; price: string } | null;
  selectedColor?: { _id: string; name: string } | null;
  qty?: number;
  onQuantityChange?: (qty: number) => void;
}

export default function StickyAddToCart({
  product,
  selectedSize,
  selectedColor,
  qty = 1,
  onQuantityChange,
}: StickyAddToCartProps) {
  const t = useTranslations("ProductDetail");
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [localQty, setLocalQty] = useState(qty);

  useEffect(() => {
    setLocalQty(qty);
  }, [qty]);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const displayPrice = selectedSize?.price || product.price;
  const priceValue = parseFloat(displayPrice.replace("$", ""));
  const totalPrice = priceValue * localQty;
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  const handleQuantityChange = (newQty: number) => {
    setLocalQty(newQty);
    if (onQuantityChange) {
      onQuantityChange(newQty);
    }
  };

  const handleBuyNow = () => {
    const checkoutItem = {
      productId: product._id,
      name: product.name,
      price: displayPrice,
      image: product.images[0],
      quantity: localQty,
      size: selectedSize?.size,
      color: selectedColor?.name,
      sizeId: selectedSize?._id,
      colorId: selectedColor?._id,
    };
    sessionStorage.setItem("directCheckout", JSON.stringify(checkoutItem));
    router.push("/checkout");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-lg px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center gap-3 md:gap-4">
        <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
          <Image
            src={getImageUrl(product.images[0])}
            alt={product.name}
            fill
            className="object-contain p-1"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs md:text-sm font-semibold text-gray-900 truncate">
            {product.name}
          </p>
          <p className="text-xs md:text-sm text-gray-500">{displayPrice}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 shrink-0">
          <button
            onClick={() => handleQuantityChange(Math.max(1, localQty - 1))}
            className="text-gray-500 hover:text-gray-900"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14" />
            </svg>
          </button>
          <span className="text-sm font-medium w-4 text-center">
            {localQty}
          </span>
          <button
            onClick={() => handleQuantityChange(localQty + 1)}
            className="text-gray-500 hover:text-gray-900"
          >
            <svg
              className="w-3.5 h-3.5"
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
          onClick={handleBuyNow}
          disabled={!product.inStock}
          className="shrink-0 bg-[#1f473e] text-white px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-medium hover:bg-[#163830] transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {t("buyItNow")} — {formattedTotalPrice}
        </button>
      </div>
    </div>
  );
}
