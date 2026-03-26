// components/Blog/BlogGrid.tsx
"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import BlogCard from "@/components/BlogCard_Two";
import Pagination from "@/components/Pagination";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import { Loader2 } from "lucide-react";

const POSTS_PER_PAGE = 6;

export default function BlogGrid() {
  const t = useTranslations("BlogPage");
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    "All",
    "Tips",
    "Reviews",
    "Guide",
    "Holidays",
    "Gifting",
    "Self-Care",
    "Trends",
    "Ingredients",
  ];

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  const urlPage = Number(searchParams?.get("page")) || 1;
  const urlCategory = searchParams?.get("category") || "All";
  const [active, setActive] = useState(urlCategory);
  const [page, setPage] = useState(urlPage);

  useEffect(() => {
    loadPosts();
  }, [page, active]);

  useEffect(() => {
    setPage(Number(searchParams?.get("page")) || 1);
    setActive(searchParams?.get("category") || "All");
  }, [searchParams]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const category = active === "All" ? undefined : active;
      const { blogs, pagination } = await blogService.getAll(
        page,
        POSTS_PER_PAGE,
        category,
      );
      setPosts(blogs);
      setTotalPages(pagination.pages);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

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
            {i === 0 ? t("grid.all") : cat}
          </button>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500">No blog posts found in this category.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <BlogCard
                key={post._id}
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
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </section>
  );
}
