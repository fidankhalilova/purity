"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/utils/imageUrl";

interface GlowIngredient {
  tag: string;
  subtitle: string;
  title: string;
  description: string;
  image: string;
}

interface GlowIngredientsProps {
  ingredients: GlowIngredient[];
}

export default function GlowIngredients({ ingredients }: GlowIngredientsProps) {
  const t = useTranslations("ProductDetail");
  const [active, setActive] = useState(0);

  if (!ingredients || ingredients.length === 0) return null;

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm text-gray-400 tracking-wide mb-2">
            {t("whatsInside")}
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {t("glowIngredients")}
          </h2>
        </div>

        {/* Mobile — stacked */}
        <div className="flex flex-col gap-3 md:hidden">
          {ingredients.map((item, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden h-48">
              <Image
                src={getImageUrl(item.image)}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="bg-[#1f473e] text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  {item.tag}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white/70 text-xs mb-0.5">{item.subtitle}</p>
                <h3 className="text-white text-base font-bold mb-1">
                  {item.title}
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop — flex expand */}
        <div className="hidden md:flex gap-4" style={{ height: "420px" }}>
          {ingredients.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              className="relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
              style={{ flex: active === i ? "2 1 0%" : "1 1 0%" }}
            >
              <Image
                src={getImageUrl(item.image)}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div
                className={`absolute inset-0 transition-all duration-500 ${active === i ? "bg-linear-to-t from-black/70 via-black/20 to-transparent" : "bg-black/10"}`}
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#1f473e] text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
                  {item.tag}
                </span>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <p className="text-white/70 text-xs mb-1">{item.subtitle}</p>
                <h3 className="text-white text-xl font-bold mb-1.5">
                  {item.title}
                </h3>
                <p className="text-white/80 text-xs leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div
                className={`absolute bottom-4 left-5 transition-all duration-300 ${active === i ? "opacity-0" : "opacity-100"}`}
              >
                <h3 className="text-white text-sm font-bold drop-shadow">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
