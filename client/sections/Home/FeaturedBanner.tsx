import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedBanner() {
  const t = useTranslations("HomePage.featuredBanner");
  const locale = useLocale();

  return (
    <section className="py-16 md:py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden h-72 sm:h-96 md:h-125">
          <Image
            src="https://purity.nextsky.co/cdn/shop/files/about_banner-2.jpg?v=1756182631&width=1920"
            alt="Featured"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 gap-4 md:gap-6">
            <span className="text-white/70 text-xs md:text-sm tracking-widest uppercase">
              {t("tag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white max-w-md leading-tight">
              {t("title")}
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-sm">
              {t("desc")}
            </p>
            <Link
              href={`/${locale}/shop`}
              className="self-start px-7 py-3.5 bg-white text-gray-900 text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors duration-300"
            >
              {t("btnText")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
