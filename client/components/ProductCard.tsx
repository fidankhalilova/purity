"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QuickView from "./QuickView";

type Product = {
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
  sizes?: string[];
  colors?: { name: string; hex: string }[];
};

export default function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  return (
    <>
      <div
        className="group flex flex-col gap-3"
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
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}
          />
          {/* Hover image */}
          <Image
            src={product.hoverImage || product.image}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
          />

          {/* Discount badge — top left */}
          {product.discount && (
            <span className="absolute top-3 left-3 z-10 bg-[#e8392a] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {product.discount}
            </span>
          )}

          {/* Rating badge — top right */}
          <span className="absolute top-3 right-3 z-10 bg-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-gray-800">{product.rating.toFixed(1)}</span>
          </span>

          {/* Quick view — slides up on hover */}
          <div
            className={`absolute bottom-0 inset-x-0 p-3 transition-all duration-300 ${
              hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
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
        </div>

        {/* Name */}
        <Link
          href={product.href}
          className="text-sm font-bold text-gray-900 hover:underline leading-snug"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span
            className={`text-sm font-semibold ${product.originalPrice ? "text-[#e8392a]" : "text-gray-900"}`}
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

      {quickViewOpen && (
        <QuickView product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}
