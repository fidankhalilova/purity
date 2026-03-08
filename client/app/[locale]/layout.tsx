import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";
import "../globals.css";
import RootLayout from "@/layout/RootLayout";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Purity",
  description: "By Fidan Khalilova",
};

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const { children } = props;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr" className="bg-white">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider>
            <RootLayout>{children}</RootLayout>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
