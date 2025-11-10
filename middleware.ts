import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['es', 'en', 'fr'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: false
});

export default function middleware(request: NextRequest) {
  // Leer la preferencia de idioma desde cookies
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // Si hay una cookie y no estamos ya en esa ruta con locale
  if (localeCookie && localeCookie !== 'es') {
    const pathname = request.nextUrl.pathname;
    
    // Si estamos en una ruta sin locale (español por defecto)
    if (!pathname.startsWith('/en') && !pathname.startsWith('/fr')) {
      // Redirigir a la versión con locale
      const url = request.nextUrl.clone();
      url.pathname = `/${localeCookie}${pathname}`;
      return Response.redirect(url);
    }
  }
  
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\..*).*)', '/']
};