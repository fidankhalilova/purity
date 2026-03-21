"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";

const brands = [
  "allure",
  "Kleenex",
  "InStyle",
  "Men's Health",
  "allure",
  "Kleenex",
];

export default function FeaturedBrandsAndDeals() {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3">
            {t("featuredBrands.title")}
          </h2>
          <p className="text-sm text-gray-400 text-center mb-10">
            {t("featuredBrands.desc")}
          </p>
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...brands, ...brands].map((brand, i) => (
                <div
                  key={i}
                  className="inline-flex items-center justify-center mx-10 md:mx-16"
                >
                  <span
                    className={`text-xl md:text-2xl font-bold tracking-tight ${i % 4 === 0 ? "text-gray-300" : "text-gray-800"}`}
                    style={{ fontFamily: i % 2 === 1 ? "cursive" : "inherit" }}
                  >
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-[#e8e0d0] min-h-72">
            <div className="relative min-h-64 md:min-h-auto">
              <Image
                src="https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_2.jpg?v=1746763913&width=900"
                alt="Beauty Offers"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col items-center justify-center p-8 md:p-12 gap-5 text-center">
              <span className="bg-[#e8392a] text-white text-xs font-semibold px-4 py-2 rounded-full">
                {t("exclusiveDeals.badge")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t("exclusiveDeals.title")}
              </h2>
              <p className="text-sm text-gray-600 max-w-xs leading-relaxed">
                {t("exclusiveDeals.desc")}
              </p>
              <div className="flex gap-3 flex-wrap justify-center">
                <Link
                  href={`/${locale}/account/profile`}
                  className="px-8 py-3.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors"
                >
                  {t("exclusiveDeals.signIn")}
                </Link>
                <Link
                  href={`/${locale}/account/profile`}
                  className="px-8 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {t("exclusiveDeals.createAccount")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
