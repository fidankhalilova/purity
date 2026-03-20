"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ShoppingBag,
  Heart,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const mockUser = {
  name: "Isabella D.",
  email: "isabella@example.com",
};

type Props = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

export default function AccountSidebar({ activeTab, onTabChange }: Props) {
  const t = useTranslations("AccountPage.sidebar");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "profile", label: t("profile"), icon: User },
    { id: "orders", label: t("orders"), icon: ShoppingBag },
    { id: "wishlist", label: t("wishlist"), icon: Heart },
    { id: "basket", label: t("basket"), icon: ShoppingCart },
    { id: "settings", label: t("settings"), icon: Settings },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col gap-1">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => {
            onTabChange(id);
            setMobileOpen(false);
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors text-left w-full ${
            activeTab === id
              ? "bg-[#1f473e] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Icon className="w-4 h-4 shrink-0" />
          {label}
        </button>
      ))}
      <div className="border-t border-gray-100 mt-3 pt-3">
        <button className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full">
          <LogOut className="w-4 h-4 shrink-0" />
          {t("signOut")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden w-full">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-3 w-full px-4 py-3 bg-[#f0ebe2] rounded-2xl text-sm font-medium text-gray-900"
        >
          {mobileOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
          {navItems.find((n) => n.id === activeTab)?.label || t("profile")}
        </button>
        {mobileOpen && (
          <div className="mt-2 bg-white rounded-2xl border border-gray-100 p-3 shadow-sm">
            <SidebarContent />
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col gap-6 w-64 shrink-0 sticky top-24 self-start">
        <div className="bg-[#f0ebe2] rounded-3xl p-5 flex flex-col items-center gap-3 text-center">
          <div className="w-16 h-16 rounded-full bg-[#1f473e] flex items-center justify-center text-white text-xl font-bold">
            {mockUser.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{mockUser.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">{mockUser.email}</p>
            <p className="text-xs text-gray-400 mt-1">{t("memberSince")}</p>
          </div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 p-3">
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
