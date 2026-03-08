"use client";

import { createContext, useContext } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import en from "@/messages/en.json";
import az from "@/messages/az.json";
import ru from "@/messages/ru.json";

export const locales = { en, az, ru };
export type LocaleKey = keyof typeof locales;

interface LanguageContextType {
  lang: LocaleKey;
  setLang: (lang: LocaleKey) => void;
  t: typeof locales.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as LocaleKey;
  const pathname = usePathname();
  const router = useRouter();

  const setLang = (newLang: LocaleKey) => {
    if (pathname) {
      const segments = pathname.split("/").filter(Boolean);
      if (
        segments.length > 0 &&
        (segments[0] === "en" || segments[0] === "az" || segments[0] === "ru")
      ) {
        segments[0] = newLang;
      } else {
        segments.unshift(newLang);
      }
      router.push("/" + segments.join("/"));
    }
  };

  return (
    <LanguageContext.Provider
      value={{ lang: locale, setLang, t: locales[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
