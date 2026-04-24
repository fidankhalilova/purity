import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BlogTemplate from "@/templates/BlogTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BlogPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function BlogPage() {
  return <BlogTemplate />;
}
