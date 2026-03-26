// app/[locale]/account/[tab]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AccountTemplate from "@/templates/AccountTemplate";

const validTabs = ["profile", "orders", "wishlist", "basket", "settings"];

type Props = {
  params: Promise<{ locale: string; tab: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tab } = await params;
  const t = await getTranslations({ locale, namespace: "AccountPage" });

  const tabNames: Record<string, string> = {
    profile: t("profile.title"),
    orders: t("orders.title"),
    wishlist: t("wishlist.title"),
    basket: t("basket.title"),
    settings: t("settings.title"),
  };

  const title = tabNames[tab] || "Account";

  return {
    title: `${title} | Purity`,
    description: `Manage your ${title.toLowerCase()} on Purity`,
  };
}

export default async function AccountTabPage({ params }: Props) {
  const { tab } = await params;
  if (!validTabs.includes(tab)) notFound();
  return <AccountTemplate activeTab={tab} />;
}
