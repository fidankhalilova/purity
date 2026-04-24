import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ForgotPasswordTemplate from "@/templates/ForgotPasswordTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AuthPages.reset" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ForgotPasswordPage() {
  return <ForgotPasswordTemplate />;
}
