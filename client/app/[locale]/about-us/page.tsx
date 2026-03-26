// app/[locale]/about/page.tsx
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutUsTemplate from "@/templates/AboutUsTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutUs" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default async function AboutUsPage({ params }: Props) {
  return <AboutUsTemplate />;
}
