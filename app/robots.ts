import { MetadataRoute } from 'next';

const DOMAIN = 'https://goh2.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Bloquear onboarding sin importar idioma ni subrutas
      {
        userAgent: '*',
        disallow: ['/onboarding', '/onboarding/', '*/onboarding', '*/onboarding/'],
      }
    ],
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
