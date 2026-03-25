"use client";
import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

export default function HomeHelpCenter() {
  const locale = useLocale();
  const t = useTranslations("HomePage.helpCenter");
  const faqs = t.raw("faqs") as { q: string; a: string }[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-16 md:py-20  border-t border-gray-100">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm text-gray-400 mb-2">{t("tag")}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t("title")}
              </h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{t("desc")}</p>
            <Link
              href={`/${locale}/faq`}
              className="self-start px-7 py-3.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors"
            >
              {t("visitBtn")}
            </Link>
          </div>
          <div className="md:col-span-2 flex flex-col divide-y divide-gray-100">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="text-sm md:text-base font-medium text-gray-900">
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {open === i && (
                  <p className="text-sm text-gray-500 leading-relaxed pb-5 pr-8">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
