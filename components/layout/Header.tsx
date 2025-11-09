import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Header principal de la landing page.
 * Actualizado para usar un logo en lugar de texto.
 */
export default function Header() {
  // Ya no usamos useTranslations aquí

  return (
    <header className="absolute top-0 left-0 w-full py-6 px-8 md:px-12 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Marca (Ahora es una imagen) */}
        <Link 
          href="/" 
          className="transition-opacity hover:opacity-80"
          aria-label="Ir al inicio" // Buena práctica de accesibilidad
        >

          <Image
            src="/goh2-logo-horizontal.webp" 
            alt="Logo GoH2"
            width={105} // Ancho de ejemplo (ajústalo)
            height={35} // Altura de ejemplo (ajústalo)
            priority // Carga esta imagen primero
            className="h-auto" // Mantiene la proporción
          />
        </Link>
        
        {/* Selector de Idioma (Tu componente) */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}