"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

const slides = [
  {
    date: "05/2017",
    title: "Where It All Began",
    desc: "Purity began with one simple question: what does sensitive skin need most?",
    img: "https://purity.nextsky.co/cdn/shop/files/about-us-banner-1.jpg?v=1761009966&width=720",
    offset: false,
  },
  {
    date: "08/2019",
    title: "A Studio of Our Own",
    desc: "From a small kitchen to our first lab, each batch was crafted with care and purpose—not mass production.",
    img: "https://purity.nextsky.co/cdn/shop/files/about-us-banner-2.jpg?v=1761009966&width=720",
    offset: true,
  },
  {
    date: "07/2021",
    title: "10,000 Strong",
    desc: "Our first 10,000 customers became believers, shaping Purity's soul.",
    img: "https://purity.nextsky.co/cdn/shop/files/about-us-banner-3.jpg?v=1761009966&width=720",
    offset: false,
  },
  {
    date: "01/2023",
    title: "Beyond Borders",
    desc: "We grew into global markets with a commitment to clean, sustainable beauty.",
    img: "https://purity.nextsky.co/cdn/shop/files/about-us-banner-4.jpg?v=1761009966&width=720",
    offset: true,
  },
];

export default function AboutTimeline() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-16">
      <p className="text-center text-sm text-gray-500 mb-2">Our History</p>
      <h2 className="text-center text-4xl font-semibold text-gray-900 mb-12">
        Our Story in Time
      </h2>

      <div className="relative">
        {/* Prev button */}
        <button
          ref={prevRef}
          className="absolute left-0 top-[38%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
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

        {/* Next button */}
        <button
          ref={nextRef}
          className="absolute right-0 top-[38%] -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
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
          slidesPerView={2.3}
          spaceBetween={28}
          grabCursor
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            640: { slidesPerView: 2.5, spaceBetween: 28 },
            1024: { slidesPerView: 3.2, spaceBetween: 32 },
          }}
          className="overflow-visible"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                className={`flex flex-col ${slide.offset ? "mt-20" : "mt-0"}`}
              >
                <div className="relative w-full aspect-3/3.5 rounded-2xl overflow-hidden">
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="pt-4 px-1">
                  <p className="text-sm text-gray-400 mb-1">{slide.date}</p>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
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
