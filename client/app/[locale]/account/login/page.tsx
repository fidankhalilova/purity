import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import LoginTemplate from "@/templates/LoginTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AuthPages.login" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function LoginPage() {
  return <LoginTemplate />;
}
