// app/robots.ts
import { MetadataRoute } from 'next';

const DOMAIN = 'https://goh2.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/onboarding/*',
          '/es/onboarding/*',
          '/en/onboarding/*',
          '/fr/onboarding/*',
        ],
      },
    ],
    sitemap: [`${DOMAIN}/sitemap.xml`], // Array de sitemaps
  };
}
