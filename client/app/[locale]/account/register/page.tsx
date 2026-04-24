import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import RegisterTemplate from "@/templates/RegisterTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AuthPages.register" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function RegisterPage() {
  return <RegisterTemplate />;
}
