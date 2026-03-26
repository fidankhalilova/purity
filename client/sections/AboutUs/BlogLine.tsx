// components/AboutUs/BlogLine.tsx
"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { Loader2 } from "lucide-react";

export default function BlogLine() {
  const t = useTranslations("AboutUs.BlogLine");
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRandomBlogs();
  }, []);

  const loadRandomBlogs = async () => {
    try {
      setLoading(true);
      // Get all published blogs
      const { blogs: allBlogs } = await blogService.getAll(1, 100);

      // Filter only published posts
      const publishedBlogs = allBlogs.filter(
        (blog) => blog.status === "published",
      );

      // Shuffle and take first 3
      const shuffled = [...publishedBlogs].sort(() => 0.5 - Math.random());
      const randomBlogs = shuffled.slice(0, 3);

      setBlogs(randomBlogs);
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mb-12 md:mb-20">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm text-gray-400 tracking-wide mb-2">{t("tag")}</p>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            {t("title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-4 animate-pulse">
              <div className="relative w-full aspect-4/3 rounded-2xl bg-gray-200" />
              <div className="flex flex-col gap-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 md:mb-20">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-sm text-gray-400 tracking-wide mb-2">{t("tag")}</p>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          {t("title")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
            className="group flex flex-col gap-4"
          >
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={
                  blog.featuredImage ||
                  "https://purity.nextsky.co/cdn/shop/files/about-us-multi-3.jpg?v=1745911038&width=1100"
                }
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#c0392b] font-medium">
                  {blog.category}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">
                  {blog.publishedAt
                    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-[#1f473e] transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                {blog.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
