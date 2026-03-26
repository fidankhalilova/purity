// app/[locale]/blog/page.tsx
import { blogService } from "@/services/blogService";
import BlogCard_One from "@/components/BlogCard_One";
import Breadcrumb from "@/components/BreadCrumb";
import BlogGrid from "@/sections/Blog/BlogGrids";
import { getTranslations } from "next-intl/server";

export default async function BlogTemplate() {
  const t = await getTranslations("BlogPage");

  // Get featured post (most viewed or latest)
  let featuredPost = null;
  try {
    const { blogs } = await blogService.getAll(1, 1);
    if (blogs.length > 0) {
      featuredPost = blogs[0];
    }
  } catch (error) {
    console.error("Error fetching featured post:", error);
  }

  // Fallback data if no posts exist
  const fallbackFeatured = {
    category: "Tips",
    title: "Glow in 3 Steps",
    date: "Mar 10, 2026",
    author: "Admin",
    excerpt:
      "Discover the simple three-step routine that will transform your skin and give you that natural, healthy glow you've been looking for.",
    href: "glow-in-3-steps",
  };

  const featured = featuredPost
    ? {
        category: featuredPost.category,
        title: featuredPost.title,
        date: featuredPost.publishedAt
          ? new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : new Date(featuredPost.createdAt).toLocaleDateString(),
        author: featuredPost.author,
        excerpt: featuredPost.excerpt,
        href: featuredPost.slug,
      }
    : fallbackFeatured;

  return (
    <div className="container mx-auto px-6 py-4">
      <Breadcrumb />
      <div className="flex flex-col gap-6 sm:gap-12">
        <BlogCard_One
          {...featured}
          image={
            featuredPost?.featuredImage ||
            "https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720"
          }
          viewDetailsLabel={t("grid.viewDetails")}
        />

        <BlogGrid />
      </div>
    </div>
  );
}
