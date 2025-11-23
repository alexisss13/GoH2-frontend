'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useOnboardingStore } from '@/store/onboardingStore';
import Image from 'next/image';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

const FormError = ({ message }: { message?: string }) => {
  if (!message) return null;
  const t = useTranslations();
  return (
    <p role="alert" className="flex items-center text-red-500 text-sm mt-1">
      <ErrorIcon />
      {t(message as any)}
    </p>
  );
};

const basicDataSchema = z.object({
  fechaNacimiento: z.string().min(1, 'Auth.errors.invalidDate'),
  genero: z.enum(['Masculino', 'Femenino', 'Otro'], {
    message: 'Auth.errors.invalidOption'
  }),
});

type BasicDataFormData = z.infer<typeof basicDataSchema>;

export default function OnboardingBasicDataPage() {
  const t = useTranslations('Auth');
  const tOnboarding = useTranslations('Auth.onboarding');
  const router = useRouter();
  const { fechaNacimiento, genero, setBiometricData } = useOnboardingStore();
  const [percentage, setPercentage] = useState(37.5);
  const targetPercentage = 50;
  const [displayedText, setDisplayedText] = useState('');
  const fullText = tOnboarding('basicDataPrompt');

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = (targetPercentage - 37.5) / steps;
    const stepDuration = duration / steps;

    let current = 37.5;
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

  const { register, handleSubmit, formState: { errors } } = useForm<BasicDataFormData>({
    resolver: zodResolver(basicDataSchema),
    defaultValues: {
      genero: genero || 'Masculino',
      fechaNacimiento: fechaNacimiento || new Date().toISOString().split('T')[0],
    }
  });

  const onSubmit = (data: BasicDataFormData) => {
    setBiometricData(data);
    router.push('/onboarding/paso-medidas');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-8 pt-24 pb-24 gap-8 md:gap-12 max-w-7xl mx-auto">
        
        <div className="absolute top-20 left-0 right-0 px-8 z-10">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-light">
                {tOnboarding('step', { current: 4, total: 8 })}
              </span>
              <span className="text-xs text-primary font-semibold">
                {percentage.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-progress-step-4" style={{ width: '50%' }} />
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
          <div className="w-full max-w-md">
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div>
                <label htmlFor="fechaNacimiento" className="text-gray-light mb-2 text-sm block">
                  {tOnboarding('dob')}
                </label>
                <Input 
                  id="fechaNacimiento"
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  className="text-white"
                  {...register('fechaNacimiento')}
                  isInvalid={!!errors.fechaNacimiento}
                />
                <FormError message={errors.fechaNacimiento?.message} />
              </div>

              <div>
                <label htmlFor="genero" className="text-gray-light mb-2 text-sm block">
                  {tOnboarding('gender')}
                </label>
                <select 
                  id="genero"
                  className={`w-full bg-gray-medium/20 text-white border rounded-xl py-4 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.genero ? 'border-red-500' : 'border-gray-medium'
                  }`}
                  {...register('genero')}
                >
                  {Object.entries(tOnboarding.raw('genderOptions') as Record<string, string>).map(([value, label]) => (
                    <option key={value} value={value} className="bg-black text-white">
                      {label}
                    </option>
                  ))}
                </select>
                <FormError message={errors.genero?.message} />
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" className="w-full">
                  {t('continueButton')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />

      <style jsx>{`
        @keyframes progress-step-4 {
          from {
            width: 37.5%;
          }
          to {
            width: 50%;
          }
        }

        .animate-progress-step-4 {
          animation: progress-step-4 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}