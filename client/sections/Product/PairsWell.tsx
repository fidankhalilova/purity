"use client";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { getImageUrl } from "@/utils/imageUrl";

interface PairsWellItem {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  href: string;
}

interface PairsWellProps {
  items: PairsWellItem[];
}

export default function PairsWell({ items }: PairsWellProps) {
  const t = useTranslations("ProductDetail");
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  if (!items || items.length === 0) return null;

  return (
    <div className="py-6 md:py-8 border-t border-gray-100">
      <div className="flex items-center justify-between mb-4 md:mb-5">
        <h3 className="font-bold text-gray-900 text-base md:text-lg">
          {t("pairsWell")}
        </h3>
        <div className="flex gap-2">
          <button
            ref={prevRef}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            ref={nextRef}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        spaceBetween={12}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={(swiper) => {
          // @ts-ignore
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-ignore
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="flex items-center gap-3 md:gap-4 border border-gray-100 rounded-2xl p-3 md:p-4">
              <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span
                    className={`text-sm font-medium ${item.originalPrice ? "text-[#e8392a]" : "text-gray-700"}`}
                  >
                    {item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <button className="shrink-0 px-4 md:px-5 py-2 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors">
                Add
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
