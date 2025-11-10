'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

type LocaleInfo = {
  code: 'es' | 'en' | 'fr';
  nameKey: 'es' | 'en' | 'fr';
  emoji: string;
};

const localesInfo: LocaleInfo[] = [
  { code: 'es', nameKey: 'es', emoji: '🇪🇸' },
  { code: 'en', nameKey: 'en', emoji: '🇺🇸' },
  { code: 'fr', nameKey: 'fr', emoji: '🇫🇷' },
];

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const currentLocale = useLocale() as 'es' | 'en' | 'fr';
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = localesInfo.find(l => l.code === currentLocale) || localesInfo[0];

  const handleLocaleChange = (newLocale: string) => {
    // Guardar en localStorage (para cliente)
    localStorage.setItem('goh2-locale', newLocale);
    
    // CRÍTICO: Guardar en cookie (para middleware)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    const currentPath = window.location.pathname;
    const searchParams = window.location.search;
    const hash = window.location.hash;
    
    // Remover locale del path
    const localePattern = /^\/(es|en|fr)(\/|$)/;
    let cleanPath = currentPath.replace(localePattern, '/');
    
    if (!cleanPath || cleanPath === '') {
      cleanPath = '/';
    }
    
    // Construir nueva URL
    let newPath;
    if (newLocale === 'es') {
      newPath = `${cleanPath}${searchParams}${hash}`;
    } else {
      newPath = `/${newLocale}${cleanPath}${searchParams}${hash}`;
    }
    
    window.location.href = newPath;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between text-sm text-gray-light font-medium py-2 px-3 rounded-lg hover:bg-gray-medium/50 transition-colors"
        aria-label={t('label')}
      >
        <GlobeIcon />
        <span className="mx-2">{currentLang.emoji} {t(currentLang.nameKey)}</span>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div 
          className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-lg overflow-hidden z-20 p-2"
          style={{
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="p-2">
            <span className="block px-3 py-1 text-xs font-semibold text-gray-medium uppercase">
              {t('label')}
            </span>
          </div>
          
          <ul className="grid grid-cols-2 gap-1">
            {localesInfo.map((locale) => (
              <li key={locale.code}>
                <button
                  onClick={() => handleLocaleChange(locale.code)}
                  className={`w-full flex items-center p-3 rounded-xl text-black transition-colors text-sm font-medium
                    ${currentLocale === locale.code 
                      ? 'bg-primary/20 text-primary-dark font-bold' 
                      : 'hover:bg-primary/10'
                    }
                  `}
                >
                  <span className="mr-3 text-xl">{locale.emoji}</span>
                  <span>{t(locale.nameKey)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}