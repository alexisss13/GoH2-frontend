// app/[locale]/onboarding/paso-instrucciones/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/Oso'; // Usamos el Oso de la landing
import { Button } from '@/components/ui/Button';

export default function OnboardingInstructionsPage() {
  const t = useTranslations('Auth');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/onboarding/paso-datos-basicos'); // Siguiente paso: Biometría
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-start p-8 pt-24 pb-24">
        
        {/* Mascota (Móvil) / Columna Izquierda (Web) */}
        <div className="w-full max-w-md flex flex-col items-center justify-center pt-8 md:flex-row md:space-x-10">
            <div className="w-48 h-48 mb-8 md:w-64 md:h-64">
              <Oso /> 
            </div>
            {/* Texto Flotante (Pág. 10) */}
            <div className="relative bg-white text-black text-center rounded-xl p-6 mb-4 w-full max-w-sm md:w-auto md:max-w-md">
                <p className="text-xl font-semibold">{t('onboarding.instructionText')}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                  border-l-[15px] border-l-transparent
                  border-r-[15px] border-r-transparent
                  border-t-[15px] border-t-white"
                />
            </div>
        </div>

        <div className="w-full max-w-xs space-y-4 pt-12">
          <Button type="button" variant="primary" onClick={handleContinue}>
            {t('registerButton')}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}