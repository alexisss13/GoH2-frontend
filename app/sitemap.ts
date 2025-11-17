// app/sitemap.ts
import { MetadataRoute } from 'next';
import { locales } from '@/i18n'; // Importamos tus idiomas

const DOMAIN = 'https://goh2.vercel.app';

const staticPaths = [
    '/',
    '/login',
    '/registro',
    '/restablecer-password',
    '/onboarding/paso-bienvenida',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allEntries: MetadataRoute.Sitemap = [];

  // Generar entradas para cada idioma y cada ruta estática
  locales.forEach((locale) => {
    staticPaths.forEach((path) => {
      // Evitar prefijo doble: si el path es '/' y el locale es 'es' (default), usamos DOMAIN.
      const urlPath = (locale === 'es' && path === '/') 
        ? DOMAIN 
        : (locale === 'es' && path !== '/')
            ? `${DOMAIN}${path}`
            : `${DOMAIN}/${locale}${path}`;

      allEntries.push({
        url: urlPath.replace('//', '/'), // Limpia dobles barras (ej: https://goh2.com/)
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '/' ? 1.0 : 0.8,
      });
    });
  });

  return allEntries;
}