import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // All supported languages
  locales: ["en", "az", "ru"],

  // Default language (English)
  defaultLocale: "en",

  // Always show locale in URL (recommended for SEO)
  localePrefix: "always",

  // Optional: Customize locale detection
  localeDetection: true,
});

// Navigation APIs with i18n support
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
