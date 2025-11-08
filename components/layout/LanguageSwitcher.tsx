'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent } from 'react';

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1 text-gray-light">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.083 14.135 7.5 15 7.5c.865 0 1.72-.417 2.416-1.036M15 7.5V3m3.375 4.5c.891 0 1.756.24 2.548.662M18.375 7.5V3m0 3.75c.609.328 1.125.79 1.5 1.337M19.875 10.5c.375.547.675 1.138.9 1.762" />
  </svg>
);

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const [currentLocale, setCurrentLocale] = useState(locale);

  // Función para remover el locale del pathname
  const getPathnameWithoutLocale = (path: string, currentLocale: string): string => {
    const locales = ['es', 'en', 'fr'];
    
    // Si el path empieza con /locale/, lo removemos
    for (const loc of locales) {
      if (path.startsWith(`/${loc}/`) || path === `/${loc}`) {
        return path.slice(loc.length + 1) || '/';
      }
    }
    
    return path;
  };

  useEffect(() => {
    const savedLocale = localStorage.getItem('goh2-locale');
    if (savedLocale && savedLocale !== locale) {
      const pathWithoutLocale = getPathnameWithoutLocale(pathname, locale);
      router.replace(`/${savedLocale}${pathWithoutLocale}`);
    } else if (savedLocale) {
      setCurrentLocale(savedLocale);
    }
  }, [locale, pathname, router]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setCurrentLocale(newLocale);
    
    localStorage.setItem('goh2-locale', newLocale);
    
    // Obtener el path sin el locale actual
    const pathWithoutLocale = getPathnameWithoutLocale(pathname, locale);
    
    // Navegar al nuevo locale
    router.replace(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative flex items-center">
      <GlobeIcon />
      <select
        value={currentLocale}
        onChange={handleChange}
        className="bg-transparent text-white appearance-none cursor-pointer pr-6 focus:outline-none text-sm"
        aria-label={t('label')}
      >
        <option key="es" value="es" className="bg-black text-white">
          {t('es')}
        </option>
        <option key="en" value="en" className="bg-black text-white">
          {t('en')}
        </option>
        <option key="fr" value="fr" className="bg-black text-white">
          {t('fr')}
        </option>
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
        <svg className="w-4 h-4 fill-current text-gray-light" viewBox="0 0 20 20"><path d="M5.516 7.548c.436-.446 1.043-.481 1.576 0L10 10.405l2.908-2.857c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.642l-3.417 3.356c-.27.267-.62.401-.971.401s-.701-.134-.971-.401L5.516 9.19c-.408-.445-.436-1.197 0-1.642z"></path></svg>
      </div>
    </div>
  );
}