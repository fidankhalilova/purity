"use client";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OrderFailTemplate() {
  const t = useTranslations("CheckoutPage.orderFail");
  const locale = useLocale();
  const router = useRouter();
  const reasons = t.raw("reasonsList") as string[];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-10">
        {/* Fail icon */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-20" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
            {t("desc")}
          </p>
        </div>

        {/* Reasons card */}
        <div className="w-full bg-red-50 rounded-3xl p-6 md:p-8 border border-red-100">
          <p className="text-sm font-bold text-gray-900 mb-4">{t("reasons")}</p>
          <div className="flex flex-col gap-3">
            {reasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-200 flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    className="w-3 h-3 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => router.back()}
            className="flex-1 py-3.5 bg-[#1f473e] text-white text-sm font-bold rounded-full hover:bg-[#163830] transition-colors text-center"
          >
            {t("tryAgain")}
          </button>
          <Link
            href={`/${locale}/account/orders`}
            className="flex-1 py-3.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 transition-colors text-center"
          >
            {t("viewOrders")}
          </Link>
        </div>
      </div>
    </div>
  );
}
