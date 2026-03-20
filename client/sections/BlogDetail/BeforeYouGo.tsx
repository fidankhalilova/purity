"use client";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import BlogCard from "@/components/BlogCard_Two";

const relatedPosts = [
  {
    category: "Holidays",
    title: "Your Gifting Season Glow Guide",
    date: "10 Apr 2025",
    author: "Olivia Bennett",
    image:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    href: "gifting-season-glow",
  },
  {
    category: "Gifting",
    title: "Best Skincare Gifts Under $75",
    date: "09 Apr 2025",
    author: "Olivia Bennett",
    image:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    href: "skincare-gifts-under-75",
  },
  {
    category: "Tips",
    title: "Are You Over-Exfoliating Your Skin?",
    date: "08 Apr 2025",
    author: "Olivia Bennett",
    image:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    href: "over-exfoliating",
  },
  {
    category: "Self-Care",
    title: "Morning Rituals That Actually Work",
    date: "05 Apr 2025",
    author: "Olivia Bennett",
    image:
      "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
    href: "morning-rituals",
  },
];

export default function BeforeYouGo() {
  const t = useTranslations("BlogDetail.beforeYouGo");

  return (
    <section className="py-10 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {t("title")}
          </h2>
          <p className="text-sm text-gray-500 mt-2">{t("description")}</p>
        </div>
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1.1}
          spaceBetween={16}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 20 },
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {relatedPosts.map((post, i) => (
            <SwiperSlide key={`${post.href}-${i}`}>
              <BlogCard {...post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
