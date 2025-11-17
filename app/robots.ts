import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

const DOMAIN = 'https://goh2.vercel.app';

export default function robots(): MetadataRoute.Robots {
  const disallowPaths = [
    '/onboarding',           // Sin idioma
    ...locales.map(locale => `/${locale}/onboarding`)
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: disallowPaths,
      }
    ],
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
