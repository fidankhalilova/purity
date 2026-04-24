"use client";
import { useTranslations } from "next-intl";

export default function PromoMarquee() {
  const t = useTranslations("ProductDetail");
  const items = t.raw("promoItems") as string[];
  const doubled = [...items, ...items, ...items];

  return (
    <div className="bg-[#f0ebe2] border-y border-[#e5ddd4] py-3 md:py-3.5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {doubled.map((text: any, i: any) => (
          <div
            key={i}
            className="inline-flex items-center gap-4 md:gap-6 mx-4 md:mx-6"
          >
            <span className="text-sm font-semibold text-[#1f473e] tracking-wide">
              {text}
            </span>
            <span className="text-[#1f473e] text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
