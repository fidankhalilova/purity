"use client";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { useTranslations } from "next-intl";

const reviews = [
  {
    author: "Carrie S.",
    title: "Refreshingly effective.",
    text: "The texture is light, almost water-like, but it delivers powerful results. My dull areas started to ...",
    rating: 5.0,
    verified: true,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=600",
    product: "Brighten Serum",
    price: "$160.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=200",
  },
  {
    author: "Algist L.",
    title: "Pure comfort in a bottle",
    text: "Every time I wear it, people ask what I'm using. The scent is heavenly. The glow it leaves is incredible...",
    rating: 5.0,
    verified: true,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=600",
    product: "Anti—Aging Serum",
    price: "From $140.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=200",
    hasSlider: true,
  },
  {
    author: "Susan G.",
    title: "Perfectly balanced skin.",
    text: "That cleanser keeps both dry and oily areas happy and removes makeup without stripping...",
    rating: 5.0,
    verified: true,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=600",
    product: "Pore Detox Scrub",
    price: "$70.00",
    originalPrice: "$100.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=200",
  },
  {
    author: "Célo F.",
    title: "Fades dark spots well",
    text: "This serum is a skin-brightener. patches from breakouts and...",
    rating: 5.0,
    verified: true,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_5.jpg?v=1746763913&width=600",
    product: "Brighten Serum",
    price: "$160.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=200",
  },
  {
    author: "Mia C.",
    title: "Glowing results!",
    text: "After two weeks my skin literally glows. Dark spots from old breakouts have faded significantly...",
    rating: 5.0,
    verified: true,
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_6.jpg?v=1746763913&width=600",
    product: "Dark Circle Patch",
    price: "$75.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=200",
  },
];

export default function WhatTheyAreSaying() {
  const t = useTranslations("HomePage.whatTheyAreSaying");
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="py-16 md:py-20 bg-[#f5f0e8] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-10">
        <p className="text-sm text-gray-400 text-center mb-2">{t("tag")}</p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          {t("title")}
        </h2>
      </div>

      <div className="relative container mx-auto px-4 md:px-14">
        <button
          ref={prevRef}
          className="hidden md:flex absolute left-4 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
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
          className="hidden md:flex absolute right-4 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1f473e] items-center justify-center hover:bg-[#163830] transition-colors shadow-sm"
        >
          <svg
            className="w-4 h-4 text-white"
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
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          grabCursor
          breakpoints={{
            0: { slidesPerView: 1.1, spaceBetween: 12 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3.5, spaceBetween: 20 },
          }}
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-3xl overflow-hidden flex flex-col">
                <div className="relative w-full h-52 md:h-64">
                  <Image
                    src={review.image}
                    alt={review.author}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                    <svg
                      className="w-3 h-3 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-semibold text-gray-800">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                  {review.hasSlider && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {review.author}
                    </span>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs text-green-600 font-medium">
                        Verified Customer
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    {review.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">
                    {review.text}
                  </p>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
                      <Image
                        src={review.productImage}
                        alt={review.product}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">
                        {review.product}
                      </p>
                      <div className="flex items-baseline gap-1.5 mt-0.5">
                        <span
                          className={`text-xs font-bold ${review.originalPrice ? "text-[#e8392a]" : "text-gray-700"}`}
                        >
                          {review.price}
                        </span>
                        {review.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            {review.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
