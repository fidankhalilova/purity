"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/utils/imageUrl";

interface StickyAddToCartProps {
  product: {
    name: string;
    price: string;
    images: string[];
  };
}

export default function StickyAddToCart({ product }: StickyAddToCartProps) {
  const t = useTranslations("ProductDetail");
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
          <p className="text-xs md:text-sm text-gray-500">{product.price}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1.5 shrink-0">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
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
          <span className="text-sm font-medium w-4 text-center">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
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
        <button className="shrink-0 bg-[#1f473e] text-white px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-medium hover:bg-[#163830] transition-colors whitespace-nowrap">
          {t("addToCart")} — {product.price}
        </button>
      </div>
    </div>
  );
}
