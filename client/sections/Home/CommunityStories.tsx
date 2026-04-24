"use client";
import { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTranslations } from "next-intl";
import "swiper/css";

const stories = [
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=600",
    product: "Foam Cleanser",
    price: "From $75.00",
    originalPrice: "$84.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=200",
  },
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=600",
    product: "Anti—Aging Serum",
    price: "From $140.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=200",
  },
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_4.jpg?v=1746763913&width=600",
    product: "Hydration Drops",
    price: "$120.00",
    originalPrice: "$150.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=200",
    featured: true,
  },
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_5.jpg?v=1746763913&width=600",
    product: "Pore Detox Scrub",
    price: "$70.00",
    originalPrice: "$100.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=200",
  },
  {
    image:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_6.jpg?v=1746763913&width=600",
    product: "Brighten Serum",
    price: "$160.00",
    productImage:
      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=200",
  },
];

export default function CommunityStories() {
  const t = useTranslations("HomePage.communityStories");
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="py-16 md:py-20 overflow-hidden">
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
          className="hidden md:flex absolute right-4 top-[38%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
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
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          centeredSlides
          grabCursor
          breakpoints={{
            0: { slidesPerView: 1.3, spaceBetween: 12 },
            640: { slidesPerView: 2.5, spaceBetween: 16 },
            1024: { slidesPerView: 4.5, spaceBetween: 20 },
          }}
        >
          {stories.map((story, i) => (
            <SwiperSlide key={i}>
              <div
                className={`flex flex-col gap-3 ${story.featured ? "-mt-6 md:-mt-10" : ""}`}
              >
                <div
                  className={`relative rounded-3xl overflow-hidden ${story.featured ? "h-72 md:h-96" : "h-56 md:h-72"}`}
                >
                  <Image
                    src={story.image}
                    alt={story.product}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div
                  className={`flex items-center gap-3 bg-white rounded-2xl p-3 shadow-sm border border-gray-50 ${story.featured ? "mx-2" : ""}`}
                >
                  <div className="relative w-10 h-10 shrink-0 rounded-xl overflow-hidden bg-[#f0ebe2]">
                    <Image
                      src={story.productImage}
                      alt={story.product}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">
                      {story.product}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span
                        className={`text-xs font-bold ${story.originalPrice ? "text-[#e8392a]" : "text-gray-700"}`}
                      >
                        {story.price}
                      </span>
                      {story.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {story.originalPrice}
                        </span>
                      )}
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
