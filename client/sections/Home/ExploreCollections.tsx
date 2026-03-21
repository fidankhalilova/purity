"use client";
import { useState, useRef } from "react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const collections = [
  {
    name: "Glow Sets",
    count: 20,
    href: "/shop",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=600",
  },
  {
    name: "Hair Care",
    count: 11,
    href: "/shop",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=600",
  },
  {
    name: "Body Care",
    count: 5,
    href: "/shop",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=600",
  },
  {
    name: "Self—Care Tools",
    count: 5,
    href: "/shop",
    hoverImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=600",
  },
];

const categoryImages = [
  {
    label: "Skin Care",
    count: 31,
    image:
      "https://purity.nextsky.co/cdn/shop/files/highlight_collection-12.jpg?v=1755240670&width=660",
    href: "/shop",
  },
  {
    label: "Make Up",
    count: 33,
    image:
      "https://purity.nextsky.co/cdn/shop/files/home2_collection-2_v2.jpg?v=1752139340&width=660",
    href: "/shop",
  },
];

export default function ExploreCollections() {
  const locale = useLocale();
  const t = useTranslations("HomePage.exploreCollections");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — category image cards */}
          <div className="flex gap-3 md:gap-4 h-64 sm:h-80 md:h-105 lg:h-130">
            {categoryImages.map((cat, i) => (
              <Link
                key={i}
                href={`/${locale}${cat.href}`}
                className={`relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden group`}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white font-semibold text-sm md:text-base">
                    {cat.label}{" "}
                    <sup className="text-white/70 text-xs font-normal">
                      {cat.count}
                    </sup>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Right — collection list */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative flex flex-col"
          >
            <div className="mb-6 md:mb-8">
              <p className="text-sm text-gray-400 mb-2">{t("tag")}</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {t("title")}{" "}
                <span className="relative inline-block">
                  {t("titleHighlight")}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 220 12"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 C30 3, 60 11, 90 6 C120 1, 150 10, 180 5 C195 2, 210 8, 218 6"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>
            </div>

            <div className="flex flex-col">
              {collections.map((col, i) => (
                <Link
                  key={i}
                  href={`/${locale}${col.href}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group flex items-center justify-between py-4 md:py-5 border-t border-gray-100 last:border-b transition-all duration-200 ${hoveredIndex === i ? "pl-2" : "pl-0"}`}
                >
                  <span
                    className={`text-base md:text-lg font-semibold transition-colors duration-200 ${hoveredIndex === i ? "text-gray-900" : "text-gray-400"}`}
                  >
                    {col.name}{" "}
                    <sup
                      className={`text-xs font-normal transition-colors duration-200 ${hoveredIndex === i ? "text-gray-500" : "text-gray-300"}`}
                    >
                      {col.count}
                    </sup>
                  </span>
                  <div
                    className={`w-8 h-8 md:w-9 md:h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${hoveredIndex === i ? "bg-[#1f473e] border-[#1f473e]" : "border-gray-200"}`}
                  >
                    <svg
                      className={`w-4 h-4 transition-colors duration-200 ${hoveredIndex === i ? "text-white" : "text-gray-300"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {/* Floating image — desktop only */}
            {hoveredIndex !== null && (
              <div
                className="hidden md:block absolute pointer-events-none z-20 w-28 h-32 rounded-2xl overflow-hidden shadow-xl"
                style={{
                  left: mousePos.x - 64,
                  top: mousePos.y - 72,
                  transform: "translate(40px, -50%)",
                }}
              >
                <Image
                  src={collections[hoveredIndex].hoverImage}
                  alt={collections[hoveredIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
