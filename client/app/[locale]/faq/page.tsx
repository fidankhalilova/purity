import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import FAQTemplate from "@/templates/FAQTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function FAQPage() {
  return <FAQTemplate />;
}
