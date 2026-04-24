import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ShopTemplate from "@/templates/ShopTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ShopPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ShopPage() {
  return <ShopTemplate />;
}
