"use client";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    author: "Isabella D.",
    rating: 5,
    text: "I've been using the Dark Circle Patch for 3 weeks and my under-eyes look so much brighter. The formula is incredibly gentle on sensitive skin.",
    date: "Mar 2026",
  },
  {
    author: "Amelia T.",
    rating: 5,
    text: "The Brighten Serum is a game changer. My dark spots have faded noticeably and my skin texture is so smooth. Worth every penny.",
    date: "Feb 2026",
  },
  {
    author: "Sophie M.",
    rating: 5,
    text: "Finally found a scrub that doesn't strip my skin dry. The Pore Detox Scrub leaves my face feeling clean and balanced.",
    date: "Jan 2026",
  },
  {
    author: "Jordan K.",
    rating: 5,
    text: "My whole routine is now Purity products. The quality is unmatched and the results speak for themselves.",
    date: "Mar 2026",
  },
  {
    author: "Priya S.",
    rating: 4,
    text: "Love the cruelty-free philosophy and the products actually deliver results. My skin has never looked better.",
    date: "Feb 2026",
  },
  {
    author: "Mia C.",
    rating: 5,
    text: "The packaging is beautiful and the products feel luxurious without the luxury price tag. So happy with my purchase.",
    date: "Jan 2026",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations("HomePage.testimonials");

  return (
    <section className="py-16 md:py-20 overflow-hidden bg-white">
      <div className="container mx-auto mb-10">
        <p className="text-sm text-gray-400 tracking-widest uppercase text-center mb-3">
          {t("tag")}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          {t("title")}
        </h2>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.2}
        spaceBetween={20}
        centeredSlides
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2, centeredSlides: false },
          1024: { slidesPerView: 3, centeredSlides: false },
        }}
      >
        {testimonials.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="bg-[#f5f0e8] rounded-3xl p-6 flex flex-col gap-4 h-full">
              <Stars rating={item.rating} />
              <p className="text-sm text-gray-700 leading-relaxed flex-1">
                "{item.text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1f473e] flex items-center justify-center text-white text-sm font-bold">
                    {item.author.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.author}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
