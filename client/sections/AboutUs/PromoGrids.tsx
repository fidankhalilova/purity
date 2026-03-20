import { useTranslations } from "next-intl";

export default function PromoGrids() {
  const t = useTranslations("AboutUs.PromoGrids");

  const btnClass =
    "relative inline-flex items-center justify-start px-7 py-4 overflow-hidden font-medium transition-all bg-[#1f473e] rounded-xl hover:bg-white group border-2 border-[#1f473e]";

  return (
    <div>
      {/* Mobile — single column stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Video */}
        <div className="h-64 sm:h-80 md:h-112.5 rounded-2xl overflow-hidden">
          <video
            src="https://purity.nextsky.co/cdn/shop/videos/c/vp/f491a8af069041bcb3e402b16f3d636f/f491a8af069041bcb3e402b16f3d636f.HD-1080p-2.5Mbps-60766758.mp4?v=0"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left text */}
        <div className="min-h-64 md:h-112.5 bg-[#f2efe6] rounded-2xl flex flex-col justify-center items-start p-6 md:p-8 gap-4 md:gap-6">
          <h2 className="text-2xl md:text-4xl font-medium whitespace-pre-line leading-snug">
            {t("leftTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {t("leftDesc")}
          </p>
          <a href="#_" className={btnClass}>
            <span className="absolute inset-0 border-0 group-hover:border-25 ease-linear duration-500 transition-all border-white rounded-xl" />
            <span className="relative text-white transition-colors duration-500 group-hover:text-[#1f473e] whitespace-nowrap text-sm">
              {t("leftBtn")}
            </span>
          </a>
        </div>

        {/* Right text */}
        <div className="min-h-64 md:h-112.5 bg-[#f2efe6] rounded-2xl flex flex-col justify-center items-start p-6 md:p-8 gap-4 md:gap-6">
          <h2 className="text-2xl md:text-4xl font-medium whitespace-pre-line leading-snug">
            {t("rightTitle")}
          </h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {t("rightDesc")}
          </p>
          <a href="#_" className={btnClass}>
            <span className="absolute inset-0 border-0 group-hover:border-25 ease-linear duration-500 transition-all border-white rounded-xl" />
            <span className="relative text-white transition-colors duration-500 group-hover:text-[#1f473e] whitespace-nowrap text-sm">
              {t("rightBtn")}
            </span>
          </a>
        </div>

        {/* Banner image */}
        <div className="h-64 sm:h-80 md:h-112.5 rounded-2xl overflow-hidden">
          <img
            src="https://purity.nextsky.co/cdn/shop/files/banner-about-us-0.jpg?v=1761290722&width=720"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
