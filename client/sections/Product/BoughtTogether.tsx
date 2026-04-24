"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/utils/imageUrl";

interface BoughtTogetherItem {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  href: string;
  isCurrentItem?: boolean;
  sizes?: string[];
}

interface BoughtTogetherProps {
  items?: BoughtTogetherItem[];
}

export default function BoughtTogether({ items = [] }: BoughtTogetherProps) {
  const t = useTranslations("ProductDetail");
  const [selected, setSelected] = useState<boolean[]>(items.map(() => true));
  const [sizes, setSizes] = useState<Record<number, string>>({});

  if (!items || items.length === 0) return null;

  const selectedItems = items.filter((_, i) => selected[i]);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace(/[^0-9.]/g, "")),
    0,
  );
  const originalTotal = selectedItems.reduce(
    (sum, item) =>
      sum +
      parseFloat((item.originalPrice || item.price).replace(/[^0-9.]/g, "")),
    0,
  );
  const savings = originalTotal - totalPrice;

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-[#faf8f5]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#1f473e] uppercase mb-2 block">
            {t("lovedByCustomers")}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {t("boughtTogether")}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch">
          <div className="flex-1 bg-white rounded-2xl md:rounded-3xl p-4 md:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 md:gap-4 w-full"
                >
                  <div
                    onClick={() => {
                      const next = [...selected];
                      next[i] = !next[i];
                      setSelected(next);
                    }}
                    className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0 cursor-pointer group transition-all duration-200 w-full sm:w-auto"
                  >
                    <div
                      className={`relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden transition-all duration-200 ${selected[i] ? "ring-2 ring-[#1f473e]" : "opacity-50"}`}
                    >
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-contain p-3 md:p-5 transition-transform duration-300 group-hover:scale-105"
                      />
                      <div
                        className={`absolute bottom-2 right-2 md:bottom-3 md:right-3 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-all shadow ${selected[i] ? "bg-[#1f473e]" : "bg-white border-2 border-gray-200"}`}
                      >
                        {selected[i] && (
                          <svg
                            className="w-3 h-3 md:w-3.5 md:h-3.5 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={3}
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 px-1">
                      <p className="text-xs text-gray-400 leading-snug">
                        {item.isCurrentItem ? t("thisItem") : ""}
                      </p>
                      <p className="text-xs md:text-sm font-semibold text-gray-900 leading-snug truncate">
                        {item.name}
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          className={`text-xs md:text-sm font-bold ${item.originalPrice ? "text-[#e8392a]" : "text-gray-900"}`}
                        >
                          {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>
                      {item.sizes && (
                        <select
                          value={sizes[i] || item.sizes[0]}
                          onChange={(e) => {
                            e.stopPropagation();
                            setSizes({ ...sizes, [i]: e.target.value });
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs border border-gray-200 rounded-xl px-2 py-1.5 outline-none mt-1 bg-white"
                        >
                          {item.sizes.map((s) => (
                            <option key={s} value={s}>
                              Size: {s}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                  {i < items.length - 1 && (
                    <div
                      key={`plus-${i}`}
                      className="shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                      <span className="text-gray-400 text-sm font-medium">
                        +
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-52 xl:w-56 shrink-0 bg-[#1f473e] rounded-2xl md:rounded-3xl p-5 md:p-6 flex flex-col justify-center items-center gap-4 md:gap-5">
            <p className="font-bold text-white text-sm md:text-base">
              {t("totalPrice")}
            </p>
            <div className="flex flex-col items-center gap-2 w-full">
              <span className="text-2xl md:text-3xl font-bold text-white">
                ${totalPrice.toFixed(2)}
              </span>
              {savings > 0 && (
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span className="text-sm text-white/50 line-through">
                    ${originalTotal.toFixed(2)}
                  </span>
                  <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {t("save")} ${savings.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
            <div className="w-full h-px bg-white/20" />
            <div className="w-full flex flex-col gap-1.5">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 text-xs transition-opacity ${selected[i] ? "opacity-100" : "opacity-30"}`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${selected[i] ? "bg-white" : "bg-white/30"}`}
                  />
                  <span className="text-white/80 truncate">{item.name}</span>
                </div>
              ))}
            </div>
            <button className="w-full bg-white text-[#1f473e] py-2.5 md:py-3 rounded-full text-sm font-bold hover:bg-gray-50 transition-colors">
              {t("addToCartCount")} {selectedItems.length}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
