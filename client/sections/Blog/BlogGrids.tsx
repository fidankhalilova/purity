"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import BlogCard from "@/components/BlogCard_Two";
import Pagination from "@/components/Pagination";

const POSTS_PER_PAGE = 6;

const postImages = [
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
  "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720",
];

export default function BlogGrid() {
  const t = useTranslations("BlogPage");
  const router = useRouter();
  const searchParams = useSearchParams();
  const categories = t.raw("grid.categories") as string[];

  const allPosts = (t.raw("posts") as any[]).map((post, i) => ({
    ...post,
    image: postImages[i % postImages.length],
  }));

  const urlPage = Number(searchParams?.get("page")) || 1;
  const urlCategory = searchParams?.get("category") || categories[0];
  const [active, setActive] = useState(urlCategory);
  const [page, setPage] = useState(urlPage);

  useEffect(() => {
    setPage(Number(searchParams?.get("page")) || 1);
    setActive(searchParams?.get("category") || categories[0]);
  }, [searchParams]);

  const updateURL = (newPage: number, newCategory: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("page", String(newPage));
    params.set("category", newCategory);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (cat: string) => {
    setActive(cat);
    setPage(1);
    updateURL(1, cat);
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    updateURL(p, active);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered =
    active === categories[0]
      ? allPosts
      : allPosts.filter((p) => p.category === active);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * POSTS_PER_PAGE,
    page * POSTS_PER_PAGE,
  );

  return (
    <section className="pb-12 pt-8">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
        {t("grid.title")}
      </h2>

      <div className="flex overflow-x-auto scrollbar-hide justify-start md:justify-center gap-3 mb-12 px-4 md:px-0 pb-2">
        {categories.map((cat, i) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium border transition-colors duration-200 ${
              active === cat
                ? "bg-[#1f473e] text-white border-[#1f473e]"
                : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
            }`}
          >
            {i === categories.length - 1 ? t("grid.editorsPick") : cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginated.map((post, i) => (
          <BlogCard key={`${post.href}-${i}`} {...post} />
        ))}
      </div>

      {filtered.length > POSTS_PER_PAGE && (
        <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </section>
  );
}
