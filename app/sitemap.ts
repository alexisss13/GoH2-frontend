import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const DOMAIN = 'https://goh2.vercel.app';

const staticPaths = [
  '/',
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
      const isRoot = path === '/';

      const url =
        isDefault && isRoot
          ? DOMAIN
          : isDefault
          ? `${DOMAIN}${path}`
          : `${DOMAIN}/${locale}${path}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: isRoot ? 1.0 : 0.8,
      });
    });
  });

  return entries;
}
