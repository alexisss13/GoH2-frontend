'use client';

// ¡Importante! Añadir Suspense
import { Suspense } from 'react'; 
import { useTranslations } from 'next-intl';
// ¡Importante! Añadir useSearchParams
import { useRouter, useSearchParams } from 'next/navigation'; // <-- Tus imports

// Layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/OsoInicioSesion'; 
import { Button } from '@/components/ui/Button';

// 1. Creamos el componente que lee la URL
function ConfirmationContent() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 2. ARREGLO: Leemos el email de la URL
  const email = searchParams.get('email') || '...';

  const handleOk = () => {
    router.push('/login');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-center px-8 pt-24 pb-24">
        
        <div className="w-48 h-48 mb-8">
          <Oso /> 
        </div>

        {/* Tu caja gris */}
        <div className="w-full max-w-md text-center bg-gray-medium/20 border border-gray-medium rounded-2xl p-8">
            
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('checkEmailTitle')}
            </h1>
            
            {/* 3. Ahora el email SÍ aparecerá */}
            <p className="text-gray-light text-lg mb-2 break-words">
              {t.rich('checkEmailDescription1', {
                email: () => <b className="text-white">{email}</b>
              })}
            </p>
            <p className="text-gray-light text-lg mb-6">
              {t('checkEmailDescription2')}
            </p>
            <p className="text-sm text-gray-light/70 italic mb-8">
              {t('checkEmailSpamTip')}
            </p>
            
            <Button 
              type="button" 
              variant="primary" 
              onClick={handleOk}
              className="w-full"
            >
              {t('checkEmailButton')}
            </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// 4. Exportamos la página envuelta en Suspense
export default function ForgotPasswordSentPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}