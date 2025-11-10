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

// Icono de Alerta para errores
const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

// 1. Creamos el componente que lee la URL
function ConfirmationContent() {
  const t = useTranslations('Auth');
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 2. ARREGLO: Leemos el email de la URL
  // Si no hay email, mostramos '...' o redirigimos (por seguridad, lo mostramos)
  const emailFromUrl = decodeURIComponent(searchParams.get('email') || '...');


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
            
            <p className="text-gray-light text-lg mb-2">
            {t.rich("checkEmailDescription1", {
                strong: (chunks) => <b className="text-white font-bold">{chunks}</b>, 
                email: emailFromUrl // variable
            })}
            </p>

            <p className="text-gray-light text-lg mb-6">
              {t('checkEmailDescription2')}
            </p>
            {/* Tip de Spam */}
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

// Envolvemos la página en Suspense
export default function ForgotPasswordSentPage() {
  return (
    // Esto asegura que la página espere a que los parámetros de búsqueda estén disponibles
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}