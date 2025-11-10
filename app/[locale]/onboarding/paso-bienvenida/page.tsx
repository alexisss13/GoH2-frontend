// app/[locale]/onboarding/paso-bienvenida/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/Oso'; // Usamos el Oso de la landing (respirando)
import { Button } from '@/components/ui/Button';

export default function OnboardingWelcomePage() {
  const t = useTranslations('Auth');
  const router = useRouter();

  const handleContinue = () => {
    router.push('/onboarding/paso-instrucciones');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-start p-8 pt-24 pb-24">
        
        {/* Burbuja de Texto (Pág. 3) */}
        <div className="relative bg-white text-black text-center rounded-xl p-4 mb-4 mt-12 w-full max-w-sm">
          <p className="text-xl font-semibold">{t('onboarding.welcomeText')}</p>
          {/* Triángulo de la burbuja */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
            border-l-[15px] border-l-transparent
            border-r-[15px] border-r-transparent
            border-t-[15px] border-t-white"
          />
        </div>
        
        {/* Mascota */}
        <div className="w-64 h-64 my-8">
          <Oso />
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