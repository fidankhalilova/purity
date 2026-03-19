"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  image: string;
  tags: string[];
  rating: number;
  description?: string;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
};

export default function QuickView({
  product,
  onClose,
}: {
  product: Product;
  onClose: () => void;
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes?.[0] ?? null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors?.[0]?.name ?? null,
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl overflow-hidden w-full max-w-3xl flex flex-col sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-100 hover:bg-gray-50 transition-colors"
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
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />

          {product.discount && (
            <span className="absolute top-3 left-3 bg-[#e8392a] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {product.discount}
            </span>
          )}

          {/* Mobile: bottom-right — Desktop: top-right */}
          <span className="absolute bottom-3 right-3 sm:top-3 sm:bottom-auto bg-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-800">{product.rating.toFixed(1)}</span>
          </span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 p-7 overflow-y-auto">
          {/* Tags */}
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

          {/* Name */}
          <h2 className="text-xl font-bold text-gray-900 leading-snug">
            {product.name}
          </h2>

          {/* Price */}
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

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
              {product.description}
            </p>
          )}

          {/* Size options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Size
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition-colors font-medium ${
                      selectedSize === size
                        ? "border-[#1f473e] bg-[#1f473e] text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color options */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Color —{" "}
                <span className="font-normal normal-case text-gray-400">
                  {selectedColor}
                </span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
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

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-auto pt-2">
            <button className="w-full bg-[#1f473e] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#163830] transition-colors">
              Add to cart
            </button>
            <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              View full details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
