"use client";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const icons = {
  left: ["◎", "◈", "◉"],
  right: ["✦", "⁘", "❄"],
};

export default function SpotlessInAWeek() {
  const locale = useLocale();
  const t = useTranslations("HomePage.spotless");
  const leftBenefits = t.raw("leftBenefits") as string[];
  const rightBenefits = t.raw("rightBenefits") as string[];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block relative mb-3">
            {t("title")}
            <svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 260 10"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 6 C50 2, 110 9, 170 4 C210 1, 240 7, 258 5"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </h2>
          <p className="text-sm text-gray-500 mt-3">{t("desc")}</p>
        </div>

        {/* Mobile */}
        <div className="flex flex-col items-center gap-6 md:hidden">
          <div className="relative w-40 h-52 shrink-0">
            <Image
              src="https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=600"
              alt="Serum"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            {[...leftBenefits, ...rightBenefits].map((label, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-[#f5f0e8] rounded-2xl px-3 py-2.5"
              >
                <span className="text-[#1f473e] text-base shrink-0">
                  {[...icons.left, ...icons.right][i]}
                </span>
                <span className="text-xs font-medium text-gray-800">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center gap-8 lg:gap-16">
          <div className="flex flex-col gap-6">
            {leftBenefits.map((label, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#f5f0e8] rounded-2xl px-4 py-3"
              >
                <span className="text-[#1f473e] text-lg">{icons.left[i]}</span>
                <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="relative w-64 h-80 shrink-0">
            <Image
              src="https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=600"
              alt="Serum"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>
          <div className="flex flex-col gap-6">
            {rightBenefits.map((label, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-[#f5f0e8] rounded-2xl px-4 py-3"
              >
                <span className="text-[#1f473e] text-lg">{icons.right[i]}</span>
                <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10 md:mt-14">
          <Link
            href={`/${locale}/shop/brighten-serum`}
            className="px-10 py-4 bg-[#1f473e] text-white font-semibold text-sm rounded-full hover:bg-[#163830] transition-colors"
          >
            {t("viewBtn")}
          </Link>
        </div>
      </div>
    </section>
  );
}
