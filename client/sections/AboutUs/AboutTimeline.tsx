"use client";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const slideImages = [
  "https://purity.nextsky.co/cdn/shop/files/about-us-banner-1.jpg?v=1761009966&width=720",
  "https://purity.nextsky.co/cdn/shop/files/about-us-banner-2.jpg?v=1761009966&width=720",
  "https://purity.nextsky.co/cdn/shop/files/about-us-banner-3.jpg?v=1761009966&width=720",
  "https://purity.nextsky.co/cdn/shop/files/about-us-banner-4.jpg?v=1761009966&width=720",
];

const offsets = [false, true, false, true];

export default function AboutTimeline() {
  const t = useTranslations("AboutUs.Timeline");
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const slides = t.raw("slides") as {
    date: string;
    title: string;
    desc: string;
  }[];

  return (
    <section className="py-10 md:py-16">
      <p className="text-center text-sm text-gray-500 mb-2">{t("tag")}</p>
      <h2 className="text-center text-2xl md:text-4xl font-semibold text-gray-900 mb-8 md:mb-12">
        {t("title")}
      </h2>

      <div className="relative">
        {/* Nav — hidden on mobile */}
        <button
          ref={prevRef}
          className="hidden md:flex absolute left-0 top-[38%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors"
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
          className="hidden md:flex absolute right-0 top-[38%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors"
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

        <Swiper
          modules={[Navigation]}
          grabCursor
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 16 },
            480: { slidesPerView: 1.8, spaceBetween: 20 },
            640: { slidesPerView: 2.3, spaceBetween: 24 },
            1024: { slidesPerView: 3.2, spaceBetween: 32 },
          }}
          className="overflow-visible"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className={`flex flex-col ${offsets[i] ? "md:mt-20 mt-0" : "mt-0"}`}
              >
                <div className="relative w-full aspect-3/3.5 rounded-2xl overflow-hidden">
                  <Image
                    src={slideImages[i]}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pt-3 md:pt-4 px-1">
                  <p className="text-xs md:text-sm text-gray-400 mb-1">
                    {slide.date}
                  </p>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                    {slide.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
