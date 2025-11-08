// i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['es', 'en', 'fr'] as const;
export const defaultLocale = 'es';

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the requestLocale promise
  let locale = await requestLocale;
  
  // Validar que el locale existe
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale, // ← Importante: retornar el locale
    messages: (await import(`./messages/${locale}.json`)).default
  };
});