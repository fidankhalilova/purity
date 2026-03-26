// app/[locale]/checkout/success/page.tsx
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OrderSuccessTemplate from "@/templates/OrderSuccessTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "CheckoutPage.orderSuccess",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function OrderSuccessPage() {
  return <OrderSuccessTemplate />;
}
