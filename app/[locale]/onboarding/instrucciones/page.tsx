'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

export default function OnboardingInstructionsPage() {
  const t = useTranslations('Auth');
  const tOnboarding = useTranslations('Auth.onboarding');
  const router = useRouter();
  const [percentage, setPercentage] = useState(12.5);
  const targetPercentage = 25;
  const [displayedText, setDisplayedText] = useState('');
  const fullText = t('onboarding.instructionsText');

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = (targetPercentage - 12.5) / steps;
    const stepDuration = duration / steps;

    let current = 12.5;
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

  const handleContinue = () => {
    router.push('/registro');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-between px-8 pt-24 pb-24">
        
        <div className="absolute top-20 left-0 right-0 px-8 z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-light">
                {tOnboarding('step', { current: 2, total: 8 })}
              </span>
              <span className="text-xs text-primary font-semibold">
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-progress-step-2" style={{ width: '25%' }} />
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
              src="/OsoFeliz.gif"
              alt="Goh - Mascota de instrucciones"
              width={256}
              height={256}
              priority
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          
          <div className="w-full max-w-sm pt-8">
            <Button 
              type="button" 
              variant="primary" 
              onClick={handleContinue}
              className="w-full"
            >
              {t('continueButton')}
            </Button>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes progress-step-2 {
          from {
            width: 12.5%;
          }
          to {
            width: 25%;
          }
        }

        .animate-progress-step-2 {
          animation: progress-step-2 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}