"use client";

import { useState } from "react";
import { Instagram, Youtube, Facebook, ChevronDown } from "lucide-react";
import { useLanguage, LocaleKey } from "@/context/LanguageContext";
import { useTranslations } from "next-intl";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.76a4.85 4.85 0 0 1-1.02-.07z" />
  </svg>
);

const SnapchatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12.166.006C9.944-.036 7.69.855 6.13 2.4 4.662 3.85 3.894 5.896 3.98 7.9v.84c-.638.18-1.29.34-1.95.4-.466.04-.9.33-.9.83 0 .45.3.78.73.9.5.14 1 .24 1.5.34-.05.18-.12.36-.2.53-.4.86-1.1 1.54-1.97 1.96-.45.22-.7.68-.55 1.16.1.33.37.6.7.7.96.3 1.94.47 2.94.52.36.8.78 1.55 1.27 2.26.7 1 1.56 1.86 2.56 2.54.54.37 1.12.66 1.74.84.48.14.97.2 1.47.2.5 0 1-.07 1.47-.2.62-.18 1.2-.47 1.74-.84 1-.68 1.86-1.54 2.56-2.54.49-.71.91-1.46 1.27-2.26 1-.05 1.98-.22 2.94-.52.33-.1.6-.37.7-.7.15-.48-.1-.94-.55-1.16-.87-.42-1.57-1.1-1.97-1.96-.08-.17-.15-.35-.2-.53.5-.1 1-.2 1.5-.34.43-.12.73-.45.73-.9 0-.5-.44-.79-.9-.83-.66-.06-1.31-.2-1.95-.4v-.84c.08-2-.68-4.06-2.15-5.5A7.78 7.78 0 0 0 12.166.006z" />
  </svg>
);

const AchIcon = () => (
  <span className="text-[10px] font-bold text-gray-700 border border-gray-300 rounded px-1 py-0.5 bg-white">
    ACH
  </span>
);

const AmexIcon = () => (
  <div className="w-9 h-6 bg-[#2E77BC] rounded flex items-center justify-center">
    <span className="text-white text-[8px] font-bold">AMEX</span>
  </div>
);

const DinersIcon = () => (
  <div className="w-9 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
    <svg viewBox="0 0 38 24" className="w-8 h-5">
      <circle cx="15" cy="12" r="9" fill="#CC0000" opacity="0.9" />
      <circle cx="23" cy="12" r="9" fill="#FF6600" opacity="0.9" />
    </svg>
  </div>
);

const DiscoverIcon = () => (
  <div className="w-9 h-6 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden">
    <span className="text-[7px] font-bold text-gray-700 leading-none">
      DISCOVER
    </span>
  </div>
);

const MastercardIcon = () => (
  <div className="w-9 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
    <svg viewBox="0 0 38 24" className="w-8 h-5">
      <circle cx="14" cy="12" r="8" fill="#EB001B" />
      <circle cx="24" cy="12" r="8" fill="#F79E1B" />
      <path d="M19 6.8a8 8 0 0 1 0 10.4A8 8 0 0 1 19 6.8z" fill="#FF5F00" />
    </svg>
  </div>
);

const PaypalIcon = () => (
  <div className="w-9 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
    <span className="text-[8px] font-bold text-[#003087]">
      Pay<span className="text-[#009cde]">Pal</span>
    </span>
  </div>
);

const VisaIcon = () => (
  <div className="w-9 h-6 bg-white border border-gray-200 rounded flex items-center justify-center">
    <span className="text-[11px] font-black text-[#1A1F71] italic">VISA</span>
  </div>
);

function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 md:border-none">
      <button
        className="w-full flex items-center justify-between py-4 md:hidden"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-[15px] font-bold text-gray-900">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <h3 className="hidden md:block text-[15px] font-bold text-gray-900 mb-5">
        {title}
      </h3>

      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out md:overflow-visible md:max-h-none ${
          open ? "max-h-125" : "max-h-0"
        } md:max-h-none pb-0 md:pb-0`}
      >
        <div className="pb-4 md:pb-0">{children}</div>
      </div>
    </div>
  );
}

const LANGUAGES = [
  { code: "en" as LocaleKey, label: "EN" },
  { code: "az" as LocaleKey, label: "AZ" },
  { code: "ru" as LocaleKey, label: "RU" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const { lang, setLang } = useLanguage();
  const t = useTranslations("Footer");

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-x-8 md:gap-y-10 lg:gap-8">
          <AccordionSection title={t("helpCustomers")}>
            <div className="space-y-1 mb-5">
              <p className="text-[14px] text-gray-700">+1 (973) 3333-5555</p>
              <p className="text-[14px] text-gray-700">
                email@puritycosmetics.com
              </p>
            </div>

            <div className="flex items-center gap-2 mb-5">
              {[
                { Icon: Instagram, label: "Instagram" },
                { Icon: TikTokIcon, label: "TikTok" },
                { Icon: Youtube, label: "YouTube" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: SnapchatIcon, label: "Snapchat" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:border-gray-700 hover:text-gray-900 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <p className="text-[14px] text-gray-700">
              {t("viewOffers")}{" "}
              <a
                href="#"
                className="font-semibold text-gray-900 underline underline-offset-2 hover:text-gray-600 transition-colors"
              >
                {t("claimOffers")}
              </a>
            </p>
          </AccordionSection>

          <AccordionSection title={t("shopCategories")}>
            <ul className="space-y-3">
              {(t.raw("categories") as string[]).map((item: string) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection title={t("explorePurity")}>
            <ul className="space-y-3">
              {(t.raw("explore") as string[]).map((item: string) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionSection>

          <AccordionSection title={t("subscribeTitle")}>
            <p className="text-[14px] text-gray-700 mb-5 leading-relaxed">
              {t("subscribeDesc")}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 bg-white text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-gray-500 transition-colors"
              />
              <button className="px-5 py-3 bg-[#2d4a3e] text-white text-[13px] font-semibold rounded-full hover:bg-[#1e3329] transition-colors whitespace-nowrap">
                {t("subscribeBtn")}
              </button>
            </div>

            <p className="text-[12px] text-gray-500 italic leading-relaxed">
              {t("finePrint")}{" "}
              <a href="#" className="underline font-medium text-gray-700">
                {t("termsOfUse")}
              </a>{" "}
              {t("and")}{" "}
              <a href="#" className="underline font-medium text-gray-700">
                {t("privacyPolicy")}
              </a>
            </p>
          </AccordionSection>
        </div>
      </div>

      <div className="border-t border-gray-300" />

      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
          <div className="flex items-center justify-between md:justify-start gap-3">
            <button className="flex items-center gap-1.5 text-[13px] text-gray-700 hover:text-gray-900 transition-colors">
              <span className="text-base">{t("countryFlag")}</span>
              <span>{t("country")}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1 border border-gray-300 rounded-full p-0.5 bg-white">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-0.5 rounded-full text-[12px] font-semibold transition-all ${
                    lang === l.code
                      ? "bg-[#2d4a3e] text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-[13px] text-gray-600 text-center md:text-left">
            © 2026,{" "}
            <a href="#" className="font-semibold text-gray-800 hover:underline">
              Purity Theme
            </a>
            .{" "}
            <a href="#" className="text-gray-600 hover:underline">
              {t("poweredBy")}
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-[13px] text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t("termsOfService")}
              </a>
              <a
                href="#"
                className="text-[13px] text-gray-600 hover:text-gray-900 transition-colors"
              >
                {t("shippingPolicy")}
              </a>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
              <AchIcon />
              <AmexIcon />
              <DinersIcon />
              <DiscoverIcon />
              <MastercardIcon />
              <PaypalIcon />
              <VisaIcon />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
