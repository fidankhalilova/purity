"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const hotspots = [
  { id: 0, x: 44, y: 30 },
  { id: 1, x: 58, y: 51 },
  { id: 2, x: 38, y: 54 },
];

const products = [
  {
    id: 0,
    name: "Lift Lash Mascara",
    price: "$40.00",
    color: "Orange",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=300",
    colors: ["Orange", "Black", "Brown"],
  },
  {
    id: 1,
    name: "Divine Matte Blush",
    price: "$250.00",
    color: "Sienna",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=300",
    colors: ["Sienna", "Rose", "Coral"],
  },
  {
    id: 2,
    name: "Sensual Shine Lip",
    price: "$80.00",
    originalPrice: "$200.00",
    color: "Plum",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=300",
    colors: ["Plum", "Nude", "Red"],
    expanded: true,
  },
];

export default function EditorChoiceSet() {
  const locale = useLocale();
  const t = useTranslations("HomePage.editorChoice");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [openColor, setOpenColor] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>(
    Object.fromEntries(products.map((p) => [p.id, p.color])),
  );

  const total = products.reduce((sum, p) => {
    return sum + parseFloat(p.price.replace("$", ""));
  }, 0);

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-3/4 w-full">
            <Image
              src="https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900"
              alt="Editor's Choice"
              fill
              className="object-cover object-top"
            />

            {hotspots.map((dot) => (
              <button
                key={dot.id}
                onMouseEnter={() => setHoveredId(dot.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="absolute group"
                style={{
                  left: `${dot.x}%`,
                  top: `${dot.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span
                  className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    hoveredId === dot.id
                      ? "bg-[#1f473e]/30 scale-150"
                      : "bg-white/20 scale-100"
                  }`}
                />
                {/* Dot */}
                <span
                  className={`relative flex w-4 h-4 rounded-full border-2 border-white items-center justify-center transition-all duration-300 ${
                    hoveredId === dot.id
                      ? "bg-[#1f473e] scale-125"
                      : "bg-white/80"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      hoveredId === dot.id ? "bg-white" : "bg-gray-500"
                    }`}
                  />
                </span>

                {/* Tooltip popup */}
                <div
                  className={`absolute bottom-7 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none ${
                    hoveredId === dot.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-3 flex items-center gap-3 whitespace-nowrap min-w-48">
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#f0ebe2] shrink-0">
                      <Image
                        src={products[dot.id].image}
                        alt={products[dot.id].name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        {products[dot.id].name}
                      </p>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span
                          className={`text-xs font-bold ${products[dot.id].originalPrice ? "text-[#e8392a]" : "text-gray-700"}`}
                        >
                          {products[dot.id].price}
                        </span>
                        {products[dot.id].originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {products[dot.id].originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="w-3 h-3 bg-white rotate-45 mx-auto -mt-1.5 shadow-sm" />
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-gray-400 font-medium mb-2">
                {t("tag")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {t("title")}{" "}
                <span className="relative inline-block">
                  {t("titleHighlight")}
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 200 10"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 6 C40 2, 90 9, 140 4 C165 1, 185 7, 198 5"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Products */}
            <div className="flex flex-col divide-y divide-gray-100">
              {products.map((product) => {
                const isHovered = hoveredId === product.id;
                const isColorOpen = openColor === product.id;

                return (
                  <div
                    key={product.id}
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`py-5 flex flex-col gap-3 transition-all duration-200 rounded-2xl px-3 -mx-3 ${
                      isHovered ? "bg-[#f5f0e8]" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Image */}
                      <div
                        className={`relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden transition-all duration-300 ${
                          isHovered ? "bg-[#e8dfd4] scale-105" : "bg-[#f0ebe2]"
                        }`}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      {/* Name + Color */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-semibold transition-colors duration-200 ${
                            isHovered ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {product.name}
                        </p>

                        {/* Color selector */}
                        <div className="relative mt-1">
                          <button
                            onClick={() =>
                              setOpenColor(isColorOpen ? null : product.id)
                            }
                            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            {t("color")}: {selectedColors[product.id]}
                            <ChevronDown
                              className={`w-3 h-3 transition-transform ${isColorOpen ? "rotate-180" : ""}`}
                            />
                          </button>

                          {/* Dropdown */}
                          {isColorOpen && (
                            <div className="absolute top-6 left-0 z-20 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-28">
                              {product.colors.map((c) => (
                                <button
                                  key={c}
                                  onClick={() => {
                                    setSelectedColors({
                                      ...selectedColors,
                                      [product.id]: c,
                                    });
                                    setOpenColor(null);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                                    selectedColors[product.id] === c
                                      ? "font-semibold text-gray-900"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {c}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <div className="flex items-baseline gap-1.5 justify-end">
                          <span
                            className={`text-sm font-bold ${product.originalPrice ? "text-[#e8392a]" : "text-gray-700"}`}
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

                    {/* Add to Cart — shows on hover */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isHovered ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <button className="text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-[#1f473e] transition-colors">
                        {t("addToCart")}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add all to cart */}
            <button className="w-full py-4 bg-[#1f473e] text-white font-semibold text-sm rounded-full hover:bg-[#163830] transition-colors">
              {t("addAllToCart")} — ${total.toFixed(2)}
            </button>

            {/* View usage guide */}
            <Link
              href={`/${locale}/shop`}
              className="text-center text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-[#1f473e] transition-colors"
            >
              {t("viewGuide")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
