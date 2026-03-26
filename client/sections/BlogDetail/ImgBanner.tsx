// sections/BlogDetail/ImgBanner.tsx
"use client";
import { BlogPost } from "@/types/blog";
import Image from "next/image";

interface ImgBannerProps {
  post: BlogPost;
}

export default function ImgBanner({ post }: ImgBannerProps) {
  const defaultImage =
    "https://purity.nextsky.co/cdn/shop/articles/blog-1_4f251b38-25e3-48eb-bf5d-e01d7cf8f600.jpg?v=1746791974&width=1920";

  const bannerImage = post?.featuredImage || defaultImage;

  return (
    <div className="w-full rounded-2xl overflow-hidden relative container mx-auto px-4 md:px-6">
      <div className="relative w-full aspect-video md:aspect-21/9 rounded-2xl overflow-hidden">
        <img
          src={bannerImage}
          alt={post?.title || "Blog banner"}
          className="w-full h-full object-cover object-[center_30%]"
        />
      </div>
    </div>
  );
}
