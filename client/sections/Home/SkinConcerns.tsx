"use client";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";

const concernImages = [
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_3.jpg?v=1746763913&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_2_d042f124-9b0e-4e04-8779-038fb8e6b420.jpg?v=1753074132&width=720",
];

export default function SkinConcerns() {
  const t = useTranslations("HomePage.skinConcerns");
  const locale = useLocale();
  const concerns = t.raw("concerns") as string[];

  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-[#f5f0e8]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm text-gray-400 tracking-widest uppercase mb-3">
            {t("tag")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {concerns.map((concern, i) => (
            <Link
              key={i}
              href={`/${locale}/shop`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white">
                <Image
                  src={concernImages[i]}
                  alt={concern}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center group-hover:text-[#1f473e] transition-colors">
                {concern}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
