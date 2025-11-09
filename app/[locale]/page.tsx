'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Oso from '@/components/layout/Oso';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  // Usa setRequestLocale en lugar de unstable_setRequestLocale
  const t = useTranslations('Landing');
  const router = useRouter();

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
            <Button 
              type="button"
              variant="primary"
              onClick={() => router.push('/registro')}
            >{t('ctaPrimary')}
             </Button>
            
            <Button 
              type="button"
              variant="secondary" // <-- Ahora usará 'bg-gray-medium'
              onClick={() => router.push('/login')}
            >
             {t('ctaSecondary')}
             </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}