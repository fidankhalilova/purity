"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Breadcrumb from "@/components/BreadCrumb";
import GoogleButton from "@/components/GoogleButton";
import OrDivider from "@/components/OrDivider";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function RegisterTemplate() {
  const t = useTranslations("AuthPages.register");
  const tg = useTranslations("AuthPages.google");
  const locale = useLocale();
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const inputClass =
    "w-full px-5 py-4 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors bg-white";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.firstName, form.lastName, form.email, form.password);
      toast.success("Account created successfully!");
      router.push(`/${locale}/account/profile`);
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
      <Breadcrumb />
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-10">
        <div className="w-full max-w-md flex flex-col gap-8">
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t("title")}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
              {t("desc")}
            </p>
          </div>
          <GoogleButton label={tg("registerWithGoogle")} />
          <OrDivider label={tg("orDivider")} />
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={t("firstName")}
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="text"
              placeholder={t("lastName")}
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="email"
              placeholder={t("email")}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("password")}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`${inputClass} pr-12`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 px-1">{t("security")}</p>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1f473e] text-white font-semibold text-sm rounded-full hover:bg-[#163830] transition-colors mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t("createBtn")}
            </button>
          </form>
          <div className="flex items-center justify-center gap-1 text-sm">
            <span className="text-gray-500">{t("hasAccount")}</span>
            <Link
              href={`/${locale}/account/login`}
              className="font-semibold text-gray-900 underline underline-offset-2 hover:text-[#1f473e] transition-colors"
            >
              {t("login")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
