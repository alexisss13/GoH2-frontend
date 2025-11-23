// ====================================
// 7. app/[locale]/onboarding/paso-exito/page.tsx
// ====================================
'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function RegistrationSuccessPage() {
  const t = useTranslations('Auth');
  const tOnboarding = useTranslations('Auth.onboarding');
  const router = useRouter();
  const [percentage, setPercentage] = useState(87.5);
  const targetPercentage = 100;
  const [displayedText, setDisplayedText] = useState('');
  const fullText = t('registerSuccess');

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = (targetPercentage - 87.5) / steps;
    const stepDuration = duration / steps;

    let current = 87.5;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPercentage) {
        setPercentage(targetPercentage);
        clearInterval(timer);
      } else {
        setPercentage(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 50;
    
    const typingTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingTimer);
      }
    }, typingSpeed);

    return () => clearInterval(typingTimer);
  }, [fullText]);

  const handleGoToApp = () => {
    router.replace('/dashboard');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-between px-8 pt-24 pb-24">
        
        <div className="absolute top-20 left-0 right-0 px-8 z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-light">
                {tOnboarding('step', { current: 8, total: 8 })}
              </span>
              <span className="text-xs text-primary font-semibold">
                {percentage === 100 ? '100% ✓' : `${percentage.toFixed(1)}%`}
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-progress-complete" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center max-w-md w-full space-y-12 flex-1">
          
          <div className="relative">
            <div className="bg-white text-black rounded-2xl px-6 py-4 shadow-2xl min-h-[80px] flex items-center">
              <p className="text-lg md:text-xl font-bold text-center w-full">
                {displayedText}
              </p>
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
              border-l-[12px] border-l-transparent
              border-r-[12px] border-r-transparent
              border-t-[12px] border-t-white"
            />
          </div>
          
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <Image
              src="/OsoEnergico.gif"
              alt="Goh - Celebrando"
              width={256}
              height={256}
              priority
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          
          <div className="w-full max-w-sm">
            <div className="bg-primary/10 rounded-xl p-4 text-center border border-primary/20 mb-6">
              <p className="text-sm text-gray-light">
                {tOnboarding('successMotivation')}
              </p>
            </div>
          </div>
          
          <div className="w-full max-w-sm">
            <Button 
              type="button" 
              variant="primary" 
              onClick={handleGoToApp}
              className="w-full"
            >
              {tOnboarding('goToDashboard')}
            </Button>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes progress-complete {
          from {
            width: 87.5%;
          }
          to {
            width: 100%;
          }
        }

        .animate-progress-complete {
          animation: progress-complete 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}