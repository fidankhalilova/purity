"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const categories = [
  {
    label: "Facial Cleansers",
    count: 8,
    image:
      "https://purity.nextsky.co/cdn/shop/collections/collection-lv-2_1.jpg?v=1758855565&width=660",
    href: "/shop/facial-cleansers",
  },
  {
    label: "Serums",
    count: 8,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
    href: "/shop/serums",
  },
  {
    label: "Toners",
    count: 5,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
    href: "/shop/toners",
  },
  {
    label: "Makeup Removers",
    count: 8,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
    href: "/shop/makeup-removers",
  },
  {
    label: "Moisturisers",
    count: 6,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
    href: "/shop/moisturisers",
  },
  {
    label: "Sunscreens",
    count: 4,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
    href: "/shop/sunscreens",
  },
];

export default function CategoryList() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [hovered, setHovered] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="py-10">
      <div
        className="relative flex gap-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Prev button */}
        <button
          ref={prevRef}
          className={`hidden md:flex absolute left-3 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm items-center justify-center text-gray-700 shadow-sm transition-all duration-300 ${
            hovered && !isBeginning
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
          style={{ top: "calc(50% - 24px)", transform: "translateY(-50%)" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Next button */}
        <button
          ref={nextRef}
          className={`hidden md:flex absolute right-3 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm items-center justify-center text-gray-700 shadow-sm transition-all duration-300 ${
            hovered && !isEnd
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
          style={{ top: "calc(50% - 24px)", transform: "translateY(-50%)" }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1.5}
          spaceBetween={16}
          grabCursor
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onReachBeginning={() => setIsBeginning(true)}
          onReachEnd={() => setIsEnd(true)}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={i}>
              <Link href={cat.href} className="flex flex-col gap-3 group">
                {/* Image */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>

                {/* Label */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-medium text-gray-900">
                    {cat.label}
                  </span>
                  <span className="text-sm text-gray-400">{cat.count}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
