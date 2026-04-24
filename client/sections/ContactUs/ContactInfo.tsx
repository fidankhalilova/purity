import { useTranslations } from "next-intl";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

function TikTok() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  );
}

function Snapchat() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12.017 2C9.603 2 7.388 3.166 6.018 5.055c-.78 1.088-1.17 2.4-1.055 3.76-.36.19-.74.29-1.13.29-.31 0-.57.25-.57.56 0 .27.19.5.46.55.9.18 1.63.82 2.1 1.57-.44.61-1.18 1.06-2.22 1.33-.28.07-.46.35-.39.63.05.22.25.37.47.37.04 0 .08 0 .12-.01.16-.04.32-.06.49-.06.42 0 .79.13 1.07.38-.18.87-.62 1.56-1.3 2.06-.22.16-.27.47-.11.69.1.14.26.22.42.22.1 0 .19-.03.28-.08 1.05-.62 2.12-.93 3.18-.93.47 0 .93.06 1.38.18.58.16 1.09.48 1.72.48.63 0 1.14-.32 1.72-.48.45-.12.91-.18 1.38-.18 1.06 0 2.13.31 3.18.93.09.05.18.08.28.08.16 0 .32-.08.42-.22.16-.22.11-.53-.11-.69-.68-.5-1.12-1.19-1.3-2.06.28-.25.65-.38 1.07-.38.17 0 .33.02.49.06.04.01.08.01.12.01.22 0 .42-.15.47-.37.07-.28-.11-.56-.39-.63-1.04-.27-1.78-.72-2.22-1.33.47-.75 1.2-1.39 2.1-1.57.27-.05.46-.28.46-.55 0-.31-.26-.56-.57-.56-.39 0-.77-.1-1.13-.29.115-1.36-.275-2.672-1.055-3.76C16.629 3.166 14.414 2 12 2h.017z" />
    </svg>
  );
}

const socials = [
  { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "#" },
  { icon: <TikTok />, label: "TikTok", href: "#" },
  { icon: <Youtube className="w-5 h-5" />, label: "YouTube", href: "#" },
  { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "#" },
  { icon: <Snapchat />, label: "Snapchat", href: "#" },
];

export default function ContactInfo() {
  const t = useTranslations("ContactUsPage.Info");

  return (
    <div>
      {/* Header */}
      <div className="text-center my-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t("title")}
        </h1>
        <p className="text-gray-500 text-base leading-relaxed max-w-xl mx-auto">
          {t("description")}
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image */}
        <div className="hidden md:block relative w-full min-h-112.5 rounded-2xl overflow-hidden">
          <Image
            src="https://purity.nextsky.co/cdn/shop/files/contact-1.jpg?v=1745915834&width=720"
            alt="Contact Us"
            fill
            className="object-cover"
          />
        </div>

        {/* Info box */}
        <div className="bg-[#f2efe6] rounded-2xl flex flex-col justify-center py-10 px-8">
          <div className="flex flex-col gap-4 max-w-md">
            <h2 className="text-xl font-semibold text-gray-900">
              {t("boxTitle")}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t("boxDesc")}
            </p>

            <h3 className="font-semibold text-gray-900 mt-2">
              {t("supportTitle")}
            </h3>
            <ul className="flex flex-col gap-1 text-sm text-gray-600">
              <li>{t("phone")}</li>
              <li>{t("email")}</li>
              <li>{t("hours")}</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mt-2">
              {t("followTitle")}
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              {socials.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
