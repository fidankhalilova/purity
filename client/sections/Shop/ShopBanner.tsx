import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function ShopBanner() {
  const t = useTranslations("ShopPage.banner");

  return (
    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
      <Image
        src="https://purity.nextsky.co/cdn/shop/files/collection-banner-lv-1.jpg?v=1761985090&width=1440"
        alt={t("title")}
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            {t("breadcrumbHome")}
          </Link>
          <span className="text-white/50">›</span>
          <span className="text-white">{t("title")}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          {t("title")}
        </h1>

        <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
