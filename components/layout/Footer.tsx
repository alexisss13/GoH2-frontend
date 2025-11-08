import { useTranslations } from 'next-intl';

/**
 * Footer principal de la landing page.
 * Ahora usa traducciones.
 */
export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="absolute bottom-0 left-0 w-full py-6 px-8 md:px-12 z-10">
      <div className="max-w-7xl mx-auto text-center md:text-left border-t border-gray-medium/30 pt-4">
        <p className="text-gray-light text-sm">
          {/* Usamos el placeholder {year} del JSON */}
          {t('copyright', { year: currentYear })}
        </p>
      </div>
    </footer>
  );
}