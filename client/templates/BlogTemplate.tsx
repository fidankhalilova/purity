import BlogCard_One from "@/components/BlogCard_One";
import Breadcrumb from "@/components/BreadCrumb";
import BlogGrid from "@/sections/Blog/BlogGrids";
import { useTranslations } from "next-intl";

export default function BlogTemplate() {
  const t = useTranslations("BlogPage");
  const featured = t.raw("featured") as {
    category: string;
    title: string;
    date: string;
    author: string;
    excerpt: string;
    href: string;
  };
  return (
    <div className="container mx-auto px-6 py-4">
      <Breadcrumb />
      <div className="flex flex-col gap-6 sm:gap-12 mt-2">
        <BlogCard_One
          {...featured}
          image="https://purity.nextsky.co/cdn/shop/articles/blog-15_0a8f86ee-b23c-4363-bd05-ddd1c60a428d.jpg?v=1747765188&width=720"
          viewDetailsLabel={t("grid.viewDetails")}
        />

        <BlogGrid />
      </div>
    </div>
  );
}
