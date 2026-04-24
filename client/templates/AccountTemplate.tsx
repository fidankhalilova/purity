"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AccountSidebar from "@/sections/Account/AccountSidebar";
import ProfileSection from "@/sections/Account/ProfileSection";
import OrdersSection from "@/sections/Account/OrdersSection";
import WishlistSection from "@/sections/Account/WishlistSection";
import BasketSection from "@/sections/Account/BasketSection";
import SettingsSection from "@/sections/Account/SettingsSection";

export default function AccountTemplate({ activeTab }: { activeTab: string }) {
  const router = useRouter();
  const locale = useLocale();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(`/${locale}/account/login`);
    }
  }, [user, isLoading, router, locale]);

  const handleTabChange = (tab: string) => {
    router.push(`/${locale}/account/${tab}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <AccountSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          userId={user._id}
        />
        <div className="flex-1 min-w-0 w-full">
          {activeTab === "profile" && <ProfileSection userId={user._id} />}
          {activeTab === "orders" && <OrdersSection userId={user._id} />}
          {activeTab === "wishlist" && <WishlistSection userId={user._id} />}
          {activeTab === "basket" && <BasketSection />}
          {activeTab === "settings" && <SettingsSection userId={user._id} />}
        </div>
      </div>
    </div>
  );
}
