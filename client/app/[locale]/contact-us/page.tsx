// app/[locale]/contact/page.tsx
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactUsTemplate from "@/templates/ContactUsTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactUsPage" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function ContactUsPage() {
  return <ContactUsTemplate />;
}
