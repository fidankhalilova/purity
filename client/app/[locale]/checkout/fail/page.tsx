import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import OrderFailTemplate from "@/templates/OrderFailTemplate";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "CheckoutPage.orderFail",
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function OrderFailPage() {
  return <OrderFailTemplate />;
}
