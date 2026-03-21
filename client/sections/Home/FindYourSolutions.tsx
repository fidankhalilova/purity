"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

export default function FindYourSolutions() {
  const locale = useLocale();
  const t = useTranslations("HomePage.findYourSolutions");
  const skinTypes = t.raw("skinTypes") as string[];
  const concernsMap = t.raw("concerns") as Record<string, string[]>;

  const [skinType, setSkinType] = useState(skinTypes[0]);
  const [concern, setConcern] = useState(concernsMap[skinTypes[0]][0]);
  const [skinOpen, setSkinOpen] = useState(false);
  const [concernOpen, setConcernOpen] = useState(false);

  const handleSkinChange = (type: string) => {
    setSkinType(type);
    setConcern(concernsMap[type][0]);
    setSkinOpen(false);
  };

  return (
    <section className="relative w-full min-h-105 md:min-h-125 overflow-hidden">
      <Image
        src="https://purity.nextsky.co/cdn/shop/files/recommend_collection_banner.jpg?v=1757140995&width=3840"
        alt="Find Your Solutions"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 min-h-105 md:min-h-125 flex items-center">
        <div className="flex flex-col gap-6 py-16 md:py-20 max-w-xl">
          <div>
            <p className="text-sm text-white/70 mb-2">{t("tag")}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("title")}
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base md:text-lg text-white/90">
              {t("iHave")}
            </span>
            <div className="relative">
              <button
                onClick={() => {
                  setSkinOpen(!skinOpen);
                  setConcernOpen(false);
                }}
                className="flex items-center gap-1 text-base md:text-lg font-bold text-white border-b-2 border-white pb-0.5"
              >
                {skinType}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${skinOpen ? "rotate-180" : ""}`}
                />
              </button>
              {skinOpen && (
                <div className="absolute top-9 left-0 z-30 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 min-w-40">
                  {skinTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => handleSkinChange(type)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${skinType === type ? "font-bold text-gray-900" : "text-gray-600"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-base md:text-lg text-white/90">
              {t("skin")}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base md:text-lg text-white/90">
              {t("topConcernIs")}
            </span>
            <div className="relative">
              <button
                onClick={() => {
                  setConcernOpen(!concernOpen);
                  setSkinOpen(false);
                }}
                className="flex items-center gap-1 text-base md:text-lg font-bold text-white border-b-2 border-white pb-0.5"
              >
                {concern}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${concernOpen ? "rotate-180" : ""}`}
                />
              </button>
              {concernOpen && (
                <div className="absolute top-9 left-0 z-30 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 min-w-48">
                  {concernsMap[skinType]?.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setConcern(c);
                        setConcernOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${concern === c ? "font-bold text-gray-900" : "text-gray-600"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={`/${locale}/shop`}
              className="px-7 py-3.5 bg-[#1f473e] text-white text-sm font-semibold rounded-full hover:bg-[#163830] transition-colors shadow-md"
            >
              {t("seeBtn")}
            </Link>
            <button className="text-sm font-semibold text-white underline underline-offset-2">
              {t("skinTypeBtn")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
