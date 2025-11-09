// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { locales } from "@/i18n";
import "../globals.css";
import { setRequestLocale } from "next-intl/server";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
