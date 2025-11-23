// ====================================
// 6. app/[locale]/onboarding/paso-objetivos/page.tsx
// ====================================
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { userService } from '@/lib/userService';
import Image from 'next/image';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export default function OnboardingFinalPage() {
  const t = useTranslations('Auth');
  const tOnboarding = useTranslations('Auth.onboarding');
  const router = useRouter();
  const token = useAuthStore(state => state.token);
  const { logout } = useAuthStore();
  
  const { 
    fechaNacimiento, 
    genero, 
    alturaCm, 
    pesoKg, 
    nivelActividad,
    reset: resetOnboarding 
  } = useOnboardingStore();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [percentage, setPercentage] = useState(75);
  const targetPercentage = 87.5;
  const [displayedText, setDisplayedText] = useState('');
  const fullText = tOnboarding('finalPrompt');

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = (targetPercentage - 75) / steps;
    const stepDuration = duration / steps;

    let current = 75;
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

  useEffect(() => {
    if (!token) {
      logout();
      router.replace('/login');
    }
  }, [token, logout, router]);

  const handleFinish = async () => {
    if (!token) return;

    if (!fechaNacimiento || !genero || !alturaCm || !pesoKg || !nivelActividad) {
      setApiError('Datos incompletos. Por favor, completa todos los pasos anteriores.');
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const payload = {
        fechaNacimiento: new Date(fechaNacimiento).toISOString(),
        genero,
        alturaCm,
        pesoKg,
        nivelActividad,
        unidadMedida: 'ML' as const,
      };

      await userService.updateProfile(payload, token);
      
      resetOnboarding();
      router.push('/onboarding/paso-exito');

    } catch (err: any) {
      setApiError(err.message || t('unknownError'));
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-8 pt-24 pb-24 gap-8 md:gap-12 max-w-7xl mx-auto">
        
        <div className="absolute top-20 left-0 right-0 px-8 z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-light">
                {tOnboarding('step', { current: 7, total: 8 })}
              </span>
              <span className="text-xs text-primary font-semibold">
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-progress-step-7" style={{ width: '87.5%' }} />
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full mt-8 md:mt-0">
          
          <div className="relative mb-8">
            <div className="bg-white text-black rounded-2xl px-6 py-4 shadow-2xl max-w-sm min-h-[80px] flex items-center">
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
              src="/OsoEscribiendo.gif"
              alt="Goh - Mascota"
              width={256}
              height={256}
              priority
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full">
          <div className="w-full max-w-md space-y-5">
            
            <div className="bg-gray-medium/10 rounded-xl p-5 space-y-3 border border-gray-800">
              <h3 className="font-semibold text-base text-white mb-3 flex items-center gap-2">
                <span className="text-lg">📋</span>
                {tOnboarding('summaryTitle')}
              </h3>
              
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-light">{tOnboarding('gender')}:</span>
                  <span className="text-white font-medium">{genero}</span>
                </div>
                
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-light">{tOnboarding('dob')}:</span>
                  <span className="text-white font-medium">
                    {fechaNacimiento ? new Date(fechaNacimiento).toLocaleDateString('es-ES') : '-'}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-light">{tOnboarding('height')}:</span>
                  <span className="text-white font-medium">{alturaCm} cm</span>
                </div>
                
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-light">{tOnboarding('weight')}:</span>
                  <span className="text-white font-medium">{pesoKg} kg</span>
                </div>
                
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-light">{tOnboarding('activityLevel')}:</span>
                  <span className="text-white font-medium">{nivelActividad}</span>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 rounded-xl p-4 text-sm text-gray-light border border-primary/20">
              <p className="mb-2 font-semibold text-white text-sm flex items-center gap-2">
                <span>💡</span>
                {tOnboarding('tip')}
              </p>
              <p className="text-xs leading-relaxed">
                {tOnboarding('summaryDescription')}
              </p>
            </div>

            {apiError && (
              <p role="alert" className="flex items-center justify-center text-red-500 text-sm text-center py-2">
                <ErrorIcon /> {apiError}
              </p>
            )}

            <Button 
              type="button" 
              variant="primary" 
              className="w-full" 
              isLoading={isLoading}
              onClick={handleFinish}
            >
              {t('finishButton')}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />

      <style jsx>{`
        @keyframes progress-step-7 {
          from {
            width: 75%;
          }
          to {
            width: 87.5%;
          }
        }

        .animate-progress-step-7 {
          animation: progress-step-7 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}