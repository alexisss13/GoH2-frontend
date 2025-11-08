import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher'; // Importamos el switcher

/**
 * Header principal de la landing page.
 * Ahora incluye el selector de idioma.
 */
export default function Header() {
  const t = useTranslations('Landing');

  return (
    <header className="absolute top-0 left-0 w-full py-6 px-8 md:px-12 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Marca */}
        <Link href="/" className="text-3xl font-bold text-white transition-opacity hover:opacity-80">
          {t('brand')}
        </Link>
        
        {/* Selector de Idioma */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}