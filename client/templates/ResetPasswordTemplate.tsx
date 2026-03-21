"use client";
import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "@/components/BreadCrumb";

export default function ResetPasswordTemplate() {
  const t = useTranslations("AuthPages.reset");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full px-5 py-4 border border-gray-200 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-gray-400 transition-colors bg-white";

  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
      <Breadcrumb />

      <div className="flex flex-col items-center justify-center min-h-[70vh] py-10">
        <div className="w-full max-w-md flex flex-col gap-8">
          {!submitted ? (
            <>
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
                <button
                  onClick={() => {
                    if (email) setSubmitted(true);
                  }}
                  className="w-full py-4 bg-[#1f473e] text-white font-semibold text-sm rounded-full hover:bg-[#163830] transition-colors"
                >
                  {t("submit")}
                </button>
              </div>

              <div className="flex justify-center">
                <Link
                  href={`/${locale}/account/login`}
                  className="text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-[#1f473e] transition-colors"
                >
                  {t("backToLogin")}
                </Link>
              </div>
            </>
          ) : (
            /* Success state */
            <div className="text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("successTitle")}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {t("successDesc")}
                </p>
              </div>
              <Link
                href={`/${locale}/account/login`}
                className="text-sm font-semibold text-gray-900 underline underline-offset-2 hover:text-[#1f473e] transition-colors"
              >
                {t("backToLogin")}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
