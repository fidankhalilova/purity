"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { skinConcernService } from "@/services/skinConcernService";
import { getImageUrl } from "@/utils/imageUrl";

export default function SkinConcerns() {
  const t = useTranslations("HomePage.skinConcerns");
  const locale = useLocale();
  const [concerns, setConcerns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConcerns();
  }, []);

  const loadConcerns = async () => {
    try {
      setLoading(true);
      const data = await skinConcernService.getAll();
      setConcerns(data.slice(0, 6));
    } catch (error) {
      console.error("Error loading skin concerns:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 md:py-20 px-4 md:px-6 bg-[#f5f0e8]">
        <div className="container mx-auto flex justify-center items-center h-64">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#1f473e] rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (concerns.length === 0) return null;

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
              key={concern._id}
              href={`/${locale}/shop?concerns=${encodeURIComponent(concern.name)}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-white">
                <Image
                  src={getImageUrl(
                    concern.image ||
                      "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_1_1.jpg?v=1746763913&width=720",
                  )}
                  alt={concern.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center group-hover:text-[#1f473e] transition-colors">
                {concern.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
