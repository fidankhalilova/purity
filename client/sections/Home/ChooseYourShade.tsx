"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import ProductCard from "@/components/ProductCard";
import { useTranslations } from "next-intl";
import { skinShadeService } from "@/services/skinShadeService";
import { productService } from "@/services/productService";
import { getImageUrl } from "@/utils/imageUrl";
import "swiper/css";

export default function ChooseYourShade() {
  const locale = useLocale();
  const t = useTranslations("HomePage.chooseYourShade");
  const [activeTone, setActiveTone] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [skinShades, setSkinShades] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [shadesData, productsData] = await Promise.all([
        skinShadeService.getAll(),
        productService.getAll(1, 100, { inStock: true, status: "active" }),
      ]);
      setSkinShades(shadesData.slice(0, 4));
      setProducts(productsData.products);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToneChange = (index: number) => {
    if (index === activeTone) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTone(index);
      setAnimating(false);
      swiperRef.current?.slideTo(0);
    }, 200);
  };

  // Get products for active skin shade (filter by skinShade)
  const getProductsByShade = () => {
    const currentShade = skinShades[activeTone];
    if (!currentShade) return [];
    // Filter products that match this skin shade
    return products
      .filter((p) =>
        p.skinShades?.some(
          (s: any) => s._id === currentShade._id || s === currentShade._id,
        ),
      )
      .slice(0, 5);
  };

  const mappedProducts = getProductsByShade().map((p: any) => ({
    _id: p._id,
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    discount: p.originalPrice
      ? `-${Math.round((1 - parseFloat(p.price.replace("$", "")) / parseFloat(p.originalPrice.replace("$", ""))) * 100)}%`
      : undefined,
    description: p.description,
    sizes:
      p.productSizes?.map((s: any) => ({
        size: s.size,
        inStock: s.inStock !== false,
      })) || [],
    colors:
      p.productColors?.map((c: any) => ({ name: c.name, hex: c.hexCode })) ||
      [],
    image: getImageUrl(p.images?.[0]),
    hoverImage: getImageUrl(p.images?.[1] || p.images?.[0]),
    tags: p.badges?.map((b: any) => b.label).slice(0, 2) || [],
    rating: p.rating,
    href: p.id ? `/shop/${p.id}` : `/shop/${p._id}`,
    inStock: p.inStock,
  }));

  if (loading) {
    return (
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="container mx-auto flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (skinShades.length === 0) return null;

  const sliderValue = (activeTone / (skinShades.length - 1)) * 100;

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
          <div className="flex gap-4 md:gap-10 justify-center flex-wrap">
            {skinShades.map((shade, i) => (
              <button
                key={shade._id}
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
                  <div
                    className="w-full h-full"
                    style={{ backgroundColor: shade.colorCode || "#f5deb3" }}
                  />
                </div>
                <span
                  className={`text-xs transition-colors whitespace-nowrap ${
                    activeTone === i
                      ? "font-semibold text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {shade.name}
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

        {/* Products swiper */}
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
              grabCursor
              breakpoints={{
                0: { slidesPerView: 1.5, spaceBetween: 12 },
                480: { slidesPerView: 2.2, spaceBetween: 16 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
              }}
            >
              {mappedProducts.map((product, i) => (
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
