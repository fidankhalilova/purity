"use client";
import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Eye, EyeOff } from "lucide-react";
import Breadcrumb from "@/components/BreadCrumb";

export default function LoginTemplate() {
  const t = useTranslations("AuthPages.login");
  const locale = useLocale();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputClass =
    "w-full px-5 py-4 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors bg-white";

  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
      <Breadcrumb />

      <div className="flex flex-col items-center justify-center min-h-[70vh] py-10">
        <div className="w-full max-w-md flex flex-col gap-8">
          {/* Header */}
          <div className="text-center flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {t("title")}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto">
              {t("desc")}
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-12`}
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

            <button className="w-full py-4 bg-[#1f473e] text-white font-semibold text-sm rounded-full hover:bg-[#163830] transition-colors mt-2">
              {t("signIn")}
            </button>
          </div>

          {/* Footer links */}
          <div className="flex flex-col items-center gap-2 text-sm">
            <p className="text-gray-500">
              {t("noAccount")}{" "}
              <Link
                href={`/${locale}/account/register`}
                className="font-semibold text-gray-900 underline underline-offset-2 hover:text-[#1f473e] transition-colors"
              >
                {t("createAccount")}
              </Link>
            </p>
            <Link
              href={`/${locale}/account/reset-password`}
              className="font-semibold text-gray-900 underline underline-offset-2 hover:text-[#1f473e] transition-colors"
            >
              {t("forgotPassword")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
