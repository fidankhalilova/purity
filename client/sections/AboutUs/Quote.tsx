"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

const marqueeImages = [
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_1_01fffa50-699f-41cd-9014-5870f3f57c86.jpg?v=1753071357&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_1.jpg?v=1746803408&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_7_1_52d5c36d-437a-49dd-a2b5-97e49beb7490.jpg?v=1753074132&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_2_1.jpg?v=1746415075&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_5_2_09908fab-998c-4cfc-a8cc-d06b38bad6b5.jpg?v=1753071357&width=720",
  "https://purity.nextsky.co/cdn/shop/files/cosmetic_products_33_2.jpg?v=1746803408&width=720",
];

export default function Quote() {
  const t = useTranslations("AboutUs.Quote");
  const marqueeItems = (t.raw("marquee") as { text: string }[]).map(
    (item, i) => ({
      text: item.text,
      img: marqueeImages[i % marqueeImages.length],
    }),
  );
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <section className="py-12 md:py-20 overflow-hidden">
      {/* Quote */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center mb-12 md:mb-20">
        <div className="flex justify-center mb-4 md:mb-6">
          <svg
            width="40"
            height="32"
            viewBox="0 0 52 40"
            fill="none"
            className="md:w-13 md:h-10"
          >
            <path
              d="M0 40V24.8C0 18.4 1.6 13.2 4.8 9.2C8 5.07 12.8 2.13 19.2 0.4L21.6 4.4C18.4 5.6 15.87 7.47 14 10C12.27 12.4 11.33 15.2 11.2 18.4H20V40H0ZM32 40V24.8C32 18.4 33.6 13.2 36.8 9.2C40 5.07 44.8 2.13 51.2 0.4L53.6 4.4C50.4 5.6 47.87 7.47 46 10C44.27 12.4 43.33 15.2 43.2 18.4H52V40H32Z"
              fill="#e5e5e5"
            />
          </svg>
        </div>
        <blockquote className="text-xl md:text-3xl lg:text-4xl font-bold italic text-gray-900 leading-snug">
          {t("text")}
        </blockquote>
        <p className="mt-6 md:mt-8 text-sm text-gray-400 tracking-wide">
          — {t("author")}
        </p>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-hidden border-t border-b border-gray-100 py-4 md:py-5">
        <div className="flex animate-marquee whitespace-nowrap will-change-transform">
          {doubled.map((item, i) => (
            <MarqueeItem key={i} text={item.text} img={item.img} />
          ))}
        </div>
        <div
          className="flex animate-marquee whitespace-nowrap will-change-transform absolute top-4 md:top-5"
          aria-hidden
        >
          {doubled.map((item, i) => (
            <MarqueeItem key={i} text={item.text} img={item.img} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeItem({ text, img }: { text: string; img: string }) {
  return (
    <div className="inline-flex items-center gap-3 md:gap-4 mx-6 md:mx-10">
      <span className="text-base md:text-2xl font-bold text-gray-900 tracking-tight">
        {text}
      </span>
      <div className="relative w-10 h-7 md:w-14 md:h-10 rounded-full overflow-hidden shrink-0">
        <Image src={img} alt={text} fill className="object-cover" />
      </div>
    </div>
  );
}
