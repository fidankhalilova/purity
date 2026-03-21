"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import ProductCard from "@/components/ProductCard";
import { useTranslations } from "next-intl";

const skinTones = [
  {
    label: "Fair Skin",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=200",
    sliderValue: 0,
  },
  {
    label: "Light Skin",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=200",
    sliderValue: 33,
  },
  {
    label: "Medium Skin",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=200",
    sliderValue: 66,
  },
  {
    label: "Dark Skin",
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_5.jpg?v=1746763913&width=200",
    sliderValue: 100,
  },
];

const productsByTone: Record<number, any[]> = {
  0: [
    {
      name: "Glossy Lipstick",
      price: "$75.00",
      badge: "Buy 1 Get 1",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Lip", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Soft Pinch Blush",
      price: "$150.00",
      originalPrice: "$300.00",
      badge: "-50%",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Gentle", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
      href: "/shop/pore-detox-scrub",
    },
    {
      name: "Phantom Lip Balm",
      price: "$170.00",
      originalPrice: "$200.00",
      badge: "-15%",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Lip", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
      href: "/shop/brighten-serum",
    },
    {
      name: "Plump Foundation",
      price: "$150.00",
      rating: 5.0,
      tags: ["Cover", "Repair"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Glow Tinted Serum",
      price: "$95.00",
      rating: 5.0,
      tags: ["Glow", "Serum"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
  ],
  1: [
    {
      name: "Plump Foundation",
      price: "$150.00",
      rating: 5.0,
      tags: ["Cover", "Repair"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Glossy Lipstick",
      price: "$75.00",
      badge: "Buy 1 Get 1",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Lip", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Soft Pinch Blush",
      price: "$150.00",
      originalPrice: "$300.00",
      badge: "-50%",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Gentle", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
      href: "/shop/pore-detox-scrub",
    },
    {
      name: "Phantom Lip Balm",
      price: "$170.00",
      originalPrice: "$200.00",
      badge: "-15%",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Lip", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
      href: "/shop/brighten-serum",
    },
    {
      name: "Glow Tinted Serum",
      price: "$95.00",
      rating: 5.0,
      tags: ["Glow", "Serum"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
  ],
  2: [
    {
      name: "Phantom Lip Balm",
      price: "$170.00",
      originalPrice: "$200.00",
      badge: "-15%",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Lip", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
      href: "/shop/brighten-serum",
    },
    {
      name: "Plump Foundation",
      price: "$150.00",
      rating: 5.0,
      tags: ["Cover", "Repair"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Soft Pinch Blush",
      price: "$150.00",
      originalPrice: "$300.00",
      badge: "-50%",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Gentle", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
      href: "/shop/pore-detox-scrub",
    },
    {
      name: "Glossy Lipstick",
      price: "$75.00",
      badge: "Buy 1 Get 1",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Lip", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Glow Tinted Serum",
      price: "$95.00",
      rating: 5.0,
      tags: ["Glow", "Serum"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
  ],
  3: [
    {
      name: "Glow Tinted Serum",
      price: "$95.00",
      rating: 5.0,
      tags: ["Glow", "Serum"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Phantom Lip Balm",
      price: "$170.00",
      originalPrice: "$200.00",
      badge: "-15%",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Lip", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
      href: "/shop/brighten-serum",
    },
    {
      name: "Plump Foundation",
      price: "$150.00",
      rating: 5.0,
      tags: ["Cover", "Repair"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=720",
      href: "/shop/dark-circle-patch",
    },
    {
      name: "Soft Pinch Blush",
      price: "$150.00",
      originalPrice: "$300.00",
      badge: "-50%",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Gentle", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
      href: "/shop/pore-detox-scrub",
    },
    {
      name: "Glossy Lipstick",
      price: "$75.00",
      badge: "Buy 1 Get 1",
      badgeColor: "bg-[#e8392a]",
      rating: 5.0,
      tags: ["Lip", "Makeup"],
      image:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
      hoverImage:
        "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
      href: "/shop/dark-circle-patch",
    },
  ],
};

export default function ChooseYourShade() {
  const locale = useLocale();
  const t = useTranslations("HomePage.chooseYourShade");
  const skinToneLabels = t.raw("skinTones") as string[];
  const [activeTone, setActiveTone] = useState(0);
  const [animating, setAnimating] = useState(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleToneChange = (index: number) => {
    if (index === activeTone) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTone(index);
      setAnimating(false);
      swiperRef.current?.slideTo(0);
    }, 200);
  };

  const sliderValue = skinTones[activeTone].sliderValue;

  return (
    <section className="py-16 md:py-20 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block relative">
            {t("title")}{" "}
            <span className="relative inline-block">
              {t("titleHighlight")}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 120 10"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 C20 2, 50 9, 80 4 C100 1, 112 7, 118 5"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Skin tone selector */}
        <div className="flex flex-col items-center gap-6 mb-10">
          {/* Tone ovals */}
          <div className="flex gap-4 md:gap-10 justify-center">
            {skinTones.map((tone, i) => (
              <button
                key={i}
                onClick={() => handleToneChange(i)}
                className="flex flex-col items-center gap-2 shrink-0"
              >
                <div
                  className={`relative overflow-hidden transition-all duration-300
          w-20 h-20 md:w-24 md:h-24
          rounded-full
          ${
            activeTone === i
              ? "ring-2 ring-offset-2 ring-gray-900 scale-105"
              : "opacity-60 hover:opacity-90"
          }`}
                >
                  <Image
                    src={tone.image}
                    alt={skinToneLabels[i]}
                    fill
                    className="object-cover object-[center_20%]"
                  />
                </div>
                <span
                  className={`text-xs transition-colors whitespace-nowrap ${
                    activeTone === i
                      ? "font-semibold text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {skinToneLabels[i]}
                </span>
              </button>
            ))}
          </div>

          {/* Slider */}
          <div className="w-full max-w-2xl px-4">
            <div className="relative h-2 py-3">
              <div
                className="absolute inset-y-0 my-auto left-0 right-0 h-2 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, #f5deb3, #d2a679, #c68642, #8d5524)",
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#1f473e] rounded-full shadow-md border-2 border-white transition-all duration-300 -translate-x-1/2 z-10"
                style={{ left: `${sliderValue}%` }}
              />
            </div>
          </div>
        </div>

        {/* Products swiper — nav buttons inside on mobile */}
        <div className="relative">
          <button
            ref={prevRef}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
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
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
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

          <div
            className={`transition-all duration-200 ${animating ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}`}
          >
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
                swiperRef.current = swiper;
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              grabCursor
              breakpoints={{
                0: { slidesPerView: 1.5, spaceBetween: 12 },
                480: { slidesPerView: 2.2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
            >
              {(productsByTone[activeTone] || []).map((product, i) => (
                <SwiperSlide key={`${activeTone}-${i}`}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
