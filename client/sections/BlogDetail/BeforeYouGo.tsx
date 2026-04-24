"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import BlogCard from "@/components/BlogCard_Two";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { Loader2 } from "lucide-react";
import "swiper/css";

interface BeforeYouGoProps {
  currentPostId: string;
}

export default function BeforeYouGo({ currentPostId }: BeforeYouGoProps) {
  const t = useTranslations("BlogDetail.beforeYouGo");
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRelatedPosts();
  }, [currentPostId]);

  const loadRelatedPosts = async () => {
    try {
      setLoading(true);
      const posts = await blogService.getRelated(currentPostId);
      setRelatedPosts(posts);
    } catch (error) {
      console.error("Error loading related posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-10 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#1f473e] mx-auto" />
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

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
          {relatedPosts.map((post) => (
            <SwiperSlide key={post._id}>
              <BlogCard
                category={post.category}
                title={post.title}
                date={
                  post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : post.createdAt.split("T")[0]
                }
                author={post.author}
                image={post.featuredImage}
                href={post.slug}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
