// app/[locale]/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { blogService } from "@/services/blogService";
import BlogDetailTemplate from "@/templates/BlogDetailTemplate";

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await blogService.getBySlug(slug);
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.featuredImage ? [post.featuredImage] : [],
      },
    };
  } catch {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  try {
    const { blogs } = await blogService.getAll(1, 100);
    const locales = ["en", "az", "ru"];

    return locales.flatMap((locale) =>
      blogs.map((post) => ({
        locale,
        slug: post.slug,
      })),
    );
  } catch {
    return [];
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug, locale } = await params;

  let post;
  let olderPost = null;
  let newerPost = null;

  try {
    post = await blogService.getBySlug(slug);

    // Get related posts for navigation
    const related = await blogService.getRelated(post._id);
    if (related.length > 0) {
      const index = related.findIndex((p) => p.slug === slug);
      if (index > 0) newerPost = related[index - 1];
      if (index < related.length - 1) olderPost = related[index + 1];
    }
  } catch {
    notFound();
  }

  return (
    <BlogDetailTemplate
      post={post}
      olderPost={olderPost}
      newerPost={newerPost}
    />
  );
}
