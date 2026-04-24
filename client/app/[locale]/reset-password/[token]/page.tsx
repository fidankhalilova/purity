import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ResetPasswordConfirmTemplate from "@/templates/ResetPasswordConfirmTemplate";

type Props = {
  params: Promise<{ locale: string; token: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AuthPages.reset" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ResetPasswordConfirmPage() {
  return <ResetPasswordConfirmTemplate />;
}
