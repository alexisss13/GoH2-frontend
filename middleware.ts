import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // Los idiomas que soportamos
  locales,
  // El idioma por defecto
  defaultLocale,
  // Oculta el prefijo '/es' de la URL, pero muestra '/en' y '/fr'
  localePrefix: 'as-needed' 
});

export const config = {
  // Rutas a las que NO se aplicará el middleware (archivos estáticos, api)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};