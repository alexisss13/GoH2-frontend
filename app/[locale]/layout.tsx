// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from "next/font/google";
import { locales } from '@/i18n';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={`${inter.className} bg-black text-white min-h-screen`}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
