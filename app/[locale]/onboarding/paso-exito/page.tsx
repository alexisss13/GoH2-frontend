// app/[locale]/onboarding/paso-exito/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/OsoInicioSesion'; 

// UI
import { Button } from '@/components/ui/Button';

export default function RegistrationSuccessPage() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [seconds, setSeconds] = useState(5); // Contador de 5 segundos

  // Maneja la redirección automática al Dashboard
  useEffect(() => {
    const countdown = setInterval(() => {
      setSeconds(prev => {
        if (prev === 1) {
          clearInterval(countdown);
          // Redirige al dashboard
          router.replace('/dashboard'); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [router]);

  const handleGoToApp = () => {
    router.replace('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-center p-8 pt-24 pb-24">
        
        {/* Mascota */}
        <div className="w-64 h-64 mb-8">
          <Oso /> 
        </div>

        {/* Burbuja de Éxito (Pág. 13) */}
        <div className="relative bg-white text-black text-center rounded-xl p-4 mb-4 w-full max-w-sm">
          <p className="text-xl font-semibold">
            {t('registerSuccess')}
          </p>
          {/* Triángulo de la burbuja */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
            border-l-[15px] border-l-transparent
            border-r-[15px] border-r-transparent
            border-t-[15px] border-t-white"
          />
        </div>
        
        <p className="text-gray-light text-sm mt-4 mb-8">
            Redirigiendo al Dashboard en {seconds} segundos...
        </p>

        <div className="w-full max-w-xs space-y-4">
          <Button type="button" variant="primary" onClick={handleGoToApp}>
            IR AL DASHBOARD
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}