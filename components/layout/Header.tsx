import Link from 'next/link';

/**
 * Header principal de la landing page.
 * Posicionado de forma absoluta en la parte superior.
 */
export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full py-6 px-8 md:px-12 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Logo/Marca */}
        <Link href="/" className="text-3xl font-bold text-white transition-opacity hover:opacity-80">
          GoH2
        </Link>
      </div>
    </header>
  );
}