import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header'; // Importamos el Header
import Footer from '@/components/layout/Footer'; // Importamos el Footer

/**
 * Página de Bienvenida (Landing Page)
 * Adaptada al estilo "Duolingo":
 * - Header y Footer absolutos y limpios.
 * - Contenido principal centrado en 2 columnas (responsive).
 */
export default function LandingPage() {
  return (
    // Contenedor relativo para posicionar Header y Footer
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
      <Header />

      {/* Contenido Principal (Dos Columnas)
        - 'min-h-screen' para centrado vertical.
        - 'pt-24' y 'pb-24' para dejar espacio (padding) para el Header y Footer.
      */}
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-8 pt-24 pb-24">
        
        {/* === Columna Izquierda (Tu Logo/Ilustración) === */}
        <div className="flex-1 flex items-center justify-center w-full md:w-1/2 p-10">
          {/* Asegúrate de poner tu imagen en /public/goh2-logo.png
            Ajusta width/height si es necesario.
          */}
          <Image
            src="/goh2-logo.jpg" 
            alt="Ilustración de GoH2"
            width={500} 
            height={500}
            priority
            className="max-w-sm md:max-w-md lg:max-w-lg"
          />
        </div>

        {/* === Columna Derecha (Acciones) === */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full md:w-1/2 p-10">
          
          {/* Slogan (estilo Duolingo) */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-10 text-center md:text-left max-w-lg">
            La forma inteligente y social de <span className="text-primary">monitorear tu hidratación</span>.
          </h1>
          
          <div className="w-full max-w-xs space-y-4">
            {/* Botón Primario (Color) */}
            <Link 
              href="/registro" 
              className="block w-full text-center bg-primary text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all transform hover:scale-105 hover:bg-primary-light active:scale-100"
            >
              EMPIEZA AHORA
            </Link>
            
            {/* Botón Secundario (Estilo Blanco) */}
            <Link 
              href="/login"
              className="block w-full text-center bg-white text-black font-bold py-4 px-6 rounded-2xl text-lg transition-all transform hover:scale-105 hover:bg-gray-200 active:scale-100"
            >
              YA TENGO UNA CUENTA
            </Link>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}