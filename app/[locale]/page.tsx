import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Oso from '@/components/layout/Oso';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function LandingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Usa setRequestLocale en lugar de unstable_setRequestLocale
  setRequestLocale(locale);
  const t = useTranslations('Landing');

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      
      <Header />

      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-8 pt-24 pb-24">
        
        {/* === Columna Izquierda (Logo) === */}
        <div className="flex-1 flex items-center justify-center w-full md:w-1/2 p-10">
          <div className="flex-1 flex items-center justify-center w-full md:w-1/2 p-10">
            <Oso />
          </div>
        </div>

        {/* === Columna Derecha (Acciones) === */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full md:w-1/2 p-10">
          
          {/* Slogan con rich text */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-10 text-center md:text-left max-w-lg">
            {t.rich('slogan', {
              primary: (chunks) => <span className="text-primary">{chunks}</span>,
            })}
          </h1>
          
          <div className="w-full max-w-xs space-y-4">
            <Link 
              href="/registro" 
              className="block w-full text-center bg-primary text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all transform hover:scale-105 hover:bg-primary-light active:scale-100"
            >
              {t('ctaPrimary')}
            </Link>
            
            <Link 
              href="/login"
              className="block w-full text-center bg-gray-medium text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all transform hover:scale-105 hover:bg-opacity-80 active:scale-100"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}