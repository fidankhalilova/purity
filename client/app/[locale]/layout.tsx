import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

// Generate static paths for all locales
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params promise
  const { locale } = await props.params;
  const { children } = props;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
