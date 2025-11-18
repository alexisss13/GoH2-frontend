// app/sitemap.ts
import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const DOMAIN = 'https://goh2.vercel.app';

const staticPaths = [
  '',  // Cambiado de '/' a '' para evitar dobles barras
  '/login',
  '/registro',
  '/restablecer-password',
  '/onboarding/paso-bienvenida',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticPaths.forEach((path) => {
      const isDefault = locale === 'es';
      
      let url: string;
      
      if (isDefault) {
        // Para español: https://goh2.vercel.app o https://goh2.vercel.app/login
        url = path === '' ? DOMAIN : `${DOMAIN}${path}`;
      } else {
        // Para otros: https://goh2.vercel.app/en o https://goh2.vercel.app/en/login
        url = path === '' ? `${DOMAIN}/${locale}` : `${DOMAIN}/${locale}${path}`;
      }

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
      });
    });
  });

  return entries;
}