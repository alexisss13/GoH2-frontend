import { MetadataRoute } from 'next';

// USA TU DOMINIO DE VERCEL (Frontend)
const DOMAIN = 'https://goh2.vercel.app'; 

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/onboarding/',
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}