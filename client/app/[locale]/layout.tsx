import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import RootLayout from "@/layout/RootLayout";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument-sans",
});

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
      <body className={`${instrumentSans.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <LanguageProvider>
            <AuthProvider>
              <RootLayout>{children}</RootLayout>
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: { background: "#363636", color: "#fff" },
                  success: { duration: 3000, style: { background: "#1f473e" } },
                  error: { duration: 4000, style: { background: "#e8392a" } },
                }}
              />
            </AuthProvider>
          </LanguageProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
