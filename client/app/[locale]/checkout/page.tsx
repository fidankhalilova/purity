import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CheckoutTemplate from "@/templates/CheckoutTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CheckoutPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function CheckoutPage() {
  return <CheckoutTemplate />;
}
