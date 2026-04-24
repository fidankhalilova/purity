"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Bell,
  Lock,
  Globe,
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { userService } from "@/services/userService";
import { User, NotificationSettings } from "@/types/user";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SettingsSectionProps {
  userId: string;
}

export default function SettingsSection({ userId }: SettingsSectionProps) {
  const t = useTranslations("AccountPage.settings");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    orderUpdates: true,
    shippingDelivery: true,
    promotionsOffers: true,
    newsletter: false,
    smsNotifications: false,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [lang, setLang] = useState("en");

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await userService.getById(userId);
      setUser(data);
      setNotifications(data.notificationSettings || notifications);
      setLang(data.displayLanguage || "en");
    } catch (error) {
      console.error("Error loading user:", error);
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateNotificationSettings = async (
    key: keyof NotificationSettings,
    value: boolean,
  ) => {
    try {
      setUpdating(true);
      const newSettings = { ...notifications, [key]: value };
      setNotifications(newSettings);
      await userService.update(userId, { notificationSettings: newSettings });
      toast.success("Settings updated");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setUpdating(false);
    }
  };

  const updateLanguage = async (newLang: string) => {
    try {
      setUpdating(true);
      setLang(newLang);
      await userService.update(userId, {
        displayLanguage: newLang as "en" | "az" | "ru",
      });
      toast.success("Language updated");
      setTimeout(() => window.location.reload(), 500);
    } catch (error) {
      console.error("Error updating language:", error);
      toast.error("Failed to update language");
    } finally {
      setUpdating(false);
    }
  };

  const updatePassword = async () => {
    if (!passwordForm.current || !passwordForm.newPass) {
      toast.error("Please fill in all fields");
      return;
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    if (passwordForm.newPass.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setUpdating(true);
      await userService.updatePassword(
        userId,
        passwordForm.current,
        passwordForm.newPass,
      );
      toast.success("Password updated successfully");
      setPasswordForm({ current: "", newPass: "", confirm: "" });
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error(error.message || "Failed to update password");
    } finally {
      setUpdating(false);
    }
  };

  const deleteAccount = async () => {
    try {
      setUpdating(true);
      await userService.delete(userId);
      toast.success("Account deleted successfully");
      localStorage.removeItem("user");
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account");
    } finally {
      setUpdating(false);
    }
  };

  const Toggle = ({
    value,
    onChange,
  }: {
    value: boolean;
    onChange: () => void;
  }) => (
    <button
      onClick={onChange}
      disabled={updating}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${value ? "bg-[#1f473e]" : "bg-gray-200"} disabled:opacity-50`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm ${value ? "translate-x-5" : "translate-x-0.5"}`}
      />
    </button>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1f473e]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-sm text-gray-500 mt-1">{t("subtitle")}</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-2xl bg-[#1f473e]/10 flex items-center justify-center">
            <Bell className="w-4 h-4 text-[#1f473e]" />
          </div>
          <h2 className="font-bold text-gray-900">
            {t("notifications.title")}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            {
              key: "orderUpdates" as const,
              label: t("notifications.orders"),
              desc: t("notifications.ordersDesc"),
            },
            {
              key: "shippingDelivery" as const,
              label: t("notifications.shipping"),
              desc: t("notifications.shippingDesc"),
            },
            {
              key: "promotionsOffers" as const,
              label: t("notifications.promotions"),
              desc: t("notifications.promotionsDesc"),
            },
            {
              key: "newsletter" as const,
              label: t("notifications.newsletter"),
              desc: t("notifications.newsletterDesc"),
            },
            {
              key: "smsNotifications" as const,
              label: t("notifications.sms"),
              desc: t("notifications.smsDesc"),
            },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
              </div>
              <Toggle
                value={notifications[key]}
                onChange={() =>
                  updateNotificationSettings(key, !notifications[key])
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Password */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-2xl bg-[#1f473e]/10 flex items-center justify-center">
            <Lock className="w-4 h-4 text-[#1f473e]" />
          </div>
          <h2 className="font-bold text-gray-900">{t("password.title")}</h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            { key: "current" as const, label: t("password.current") },
            { key: "newPass" as const, label: t("password.new") },
            { key: "confirm" as const, label: t("password.confirm") },
          ].map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {label}
              </label>
              <input
                type="password"
                value={passwordForm[key]}
                onChange={(e) =>
                  setPasswordForm({ ...passwordForm, [key]: e.target.value })
                }
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors"
                placeholder="••••••••"
              />
            </div>
          ))}
          <button
            onClick={updatePassword}
            disabled={updating}
            className="self-start px-6 py-3 bg-[#1f473e] text-white text-sm font-medium rounded-full hover:bg-[#163830] transition-colors disabled:opacity-50"
          >
            {t("password.update")}
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="bg-white rounded-3xl border border-gray-100 p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-2xl bg-[#1f473e]/10 flex items-center justify-center">
            <Globe className="w-4 h-4 text-[#1f473e]" />
          </div>
          <h2 className="font-bold text-gray-900">{t("language.title")}</h2>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {t("language.label")}
          </label>
          <select
            value={lang}
            onChange={(e) => updateLanguage(e.target.value)}
            disabled={updating}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#1f473e] transition-colors max-w-xs disabled:opacity-50"
          >
            <option value="en">English</option>
            <option value="az">Azərbaycan</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-3xl border border-red-100 p-5 md:p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <h2 className="font-bold text-red-500">{t("danger.title")}</h2>
        </div>
        {!showDeleteConfirm ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t("danger.deleteTitle")}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {t("danger.deleteDesc")}
              </p>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="shrink-0 flex items-center gap-2 px-5 py-2.5 border border-red-200 text-red-500 text-sm font-medium rounded-full hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              {t("danger.deleteBtn")}
            </button>
          </div>
        ) : (
          <div className="bg-red-50 rounded-2xl p-4 flex flex-col gap-4">
            <p className="text-sm font-semibold text-red-700">
              {t("danger.confirmTitle")}
            </p>
            <p className="text-xs text-red-600 leading-relaxed">
              {t("danger.confirmDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
              >
                {t("danger.cancelBtn")}
              </button>
              <button
                onClick={deleteAccount}
                disabled={updating}
                className="flex-1 py-2.5 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {t("danger.confirmBtn")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
