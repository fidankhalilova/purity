import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const cardImages = [
  "https://purity.nextsky.co/cdn/shop/files/about-us-multi-3.jpg?v=1745911038&width=1100",
  "https://purity.nextsky.co/cdn/shop/files/about-us-multi-3.jpg?v=1745911038&width=1100",
  "https://purity.nextsky.co/cdn/shop/files/about-us-multi-3.jpg?v=1745911038&width=1100",
];

export default function BlogLine() {
  const t = useTranslations("AboutUs.BlogLine");
  const cards = t.raw("cards") as { title: string; description: string }[];

  return (
    <div className="mb-12 md:mb-20">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-sm text-gray-400 tracking-wide mb-2">{t("tag")}</p>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
          {t("title")}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card, i) => (
          <Link key={i} href="#" className="group flex flex-col gap-4">
            <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={cardImages[i]}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base md:text-lg font-bold text-gray-900">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
