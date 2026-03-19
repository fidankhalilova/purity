import { useTranslations } from "next-intl";

export default function PromoGrids() {
  const t = useTranslations("AboutUs.PromoGrids");

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="h-112.5 rounded-2xl overflow-hidden">
          <video
            src="https://purity.nextsky.co/cdn/shop/videos/c/vp/f491a8af069041bcb3e402b16f3d636f/f491a8af069041bcb3e402b16f3d636f.HD-1080p-2.5Mbps-60766758.mp4?v=0"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-112.5 bg-[#f2efe6] rounded-2xl overflow-hidden flex flex-col justify-center items-center p-6">
          <div className="flex flex-col items-start w-full max-w-md gap-6">
            <h1 className="text-4xl font-medium whitespace-pre-line">
              {t("leftTitle")}
            </h1>
            <p>{t("leftDesc")}</p>
            <a
              href="#_"
              className="relative inline-flex items-center justify-start px-7 py-4 overflow-hidden font-medium transition-all bg-[#1f473e] rounded-xl hover:bg-white group border-2 border-[#1f473e]"
            >
              <span className="absolute inset-0 border-0 group-hover:border-25 ease-linear duration-500 transition-all border-white rounded-xl" />
              <span className="relative w-full text-left text-white transition-colors duration-500 ease-in-out group-hover:text-[#1f473e] whitespace-nowrap">
                {t("leftBtn")}
              </span>
            </a>
          </div>
        </div>
        <div className="h-112.5 bg-[#f2efe6] rounded-2xl overflow-hidden flex flex-col justify-center items-center p-6">
          <div className="flex flex-col items-start w-full max-w-md gap-6">
            <h1 className="text-4xl font-medium whitespace-pre-line">
              {t("rightTitle")}
            </h1>
            <p>{t("rightDesc")}</p>
            <a
              href="#_"
              className="relative inline-flex items-center justify-start px-7 py-4 overflow-hidden font-medium transition-all bg-[#1f473e] rounded-xl hover:bg-white group border-2 border-[#1f473e]"
            >
              <span className="absolute inset-0 border-0 group-hover:border-25 ease-linear duration-500 transition-all border-white rounded-xl" />
              <span className="relative w-full text-left text-white transition-colors duration-500 ease-in-out group-hover:text-[#1f473e] whitespace-nowrap">
                {t("rightBtn")}
              </span>
            </a>
          </div>
        </div>
        <div className="h-112.5 rounded-2xl overflow-hidden">
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
