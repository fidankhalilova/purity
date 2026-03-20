import { notFound } from "next/navigation";
import AccountTemplate from "@/templates/AccountTemplate";

const validTabs = ["profile", "orders", "wishlist", "basket", "settings"];

type Props = {
  params: Promise<{ locale: string; tab: string }>;
};

export default async function AccountTabPage({ params }: Props) {
  const { tab } = await params;
  if (!validTabs.includes(tab)) notFound();
  return <AccountTemplate activeTab={tab} />;
}
