/**
 * Footer principal de la landing page.
 * Posicionado de forma absoluta en la parte inferior.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="absolute bottom-0 left-0 w-full py-6 px-8 md:px-12 z-10">
      <div className="max-w-7xl mx-auto text-center md:text-left border-t border-gray-medium/30 pt-4">
        <p className="text-gray-light text-sm">
          &copy; {currentYear} GoH2. Tecsup Projects.
        </p>
      </div>
    </footer>
  );
}