import { useTranslations } from "next-intl";

export default function AboutBanner() {
  const t = useTranslations("AboutUs.AboutBanner");

  return (
    <div className="w-full  md:h-150 rounded-2xl overflow-hidden relative">
      <img
        src="https://purity.nextsky.co/cdn/shop/files/about-us-banner-mb.jpg?v=1758361518&width=720"
        alt=""
        className="w-full h-full object-cover object-[center_30%]"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 md:bottom-10 md:left-10">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold text-white leading-tight">
          {t("title")}
        </h1>
        <p className="text-white text-xs sm:text-sm mt-3 md:mt-4 max-w-70 sm:max-w-sm md:max-w-120 leading-relaxed">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
