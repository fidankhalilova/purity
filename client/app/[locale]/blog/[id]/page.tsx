import { getPostById, getAllPostIds } from "@/data/blogPosts";
import BlogDetailTemplate from "@/templates/BlogDetailTemplate";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateStaticParams() {
  const locales = ["en", "az", "ru"];
  const ids = getAllPostIds();
  return locales.flatMap((locale) => ids.map((id) => ({ locale, id })));
}

export default async function BlogDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const post = getPostById(id);
  if (!post) notFound();
  return <BlogDetailTemplate post={post} />;
}
