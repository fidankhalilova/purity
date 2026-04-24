"use client";
import { useTranslations } from "next-intl";

const marqueeImages = [
  "https://purity.nextsky.co/cdn/shop/files/scrolling-text-1.png?v=1761991952&width=200",
  "https://purity.nextsky.co/cdn/shop/files/scrolling-text-2.png?v=1761991952&width=200",
  "https://purity.nextsky.co/cdn/shop/files/scrolling-text-3.png?v=1761991952&width=200",
  "https://purity.nextsky.co/cdn/shop/files/scrolling-text-4.png?v=1761991952&width=200",
  "https://purity.nextsky.co/cdn/shop/files/scrolling-text-5.png?v=1761991952&width=200",
  "https://purity.nextsky.co/cdn/shop/files/scrolling-text-6.png?v=1761991952&width=200",
];

export default function HomeMarquee() {
  const t = useTranslations("HomePage.marquee");
  const items = t.raw("items") as string[];
  const doubled = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-gray-100 py-5 bg-[#f2efe6]">
      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {doubled.map((text, i) => (
          <div key={i} className="inline-flex items-center gap-4 mx-8">
            <img
              src={marqueeImages[i % marqueeImages.length]}
              alt={text}
              className="h-5 w-auto object-contain"
            />
            <span className="text-sm font-medium text-gray-700 tracking-wide">
              {text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
