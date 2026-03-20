"use client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import AccountSidebar from "@/sections/Account/AccountSidebar";
import ProfileSection from "@/sections/Account/ProfileSection";
import OrdersSection from "@/sections/Account/OrdersSection";
import WishlistSection from "@/sections/Account/WishlistSection";
import BasketSection from "@/sections/Account/BasketSection";
import SettingsSection from "@/sections/Account/SettingsSection";

export default function AccountTemplate({ activeTab }: { activeTab: string }) {
  const router = useRouter();
  const locale = useLocale();

  const handleTabChange = (tab: string) => {
    router.push(`/${locale}/account/${tab}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AccountSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="flex-1 min-w-0 w-full">
          {activeTab === "profile" && <ProfileSection />}
          {activeTab === "orders" && <OrdersSection />}
          {activeTab === "wishlist" && <WishlistSection />}
          {activeTab === "basket" && <BasketSection />}
          {activeTab === "settings" && <SettingsSection />}
        </div>
      </div>
    </div>
  );
}
