// app/[locale]/onboarding/paso-medidas/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useOnboardingStore } from '@/store/onboardingStore';

// Layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/Oso';

// UI
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Iconos y FormError
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

// Esquema para medidas
const measurementsSchema = z.object({
  alturaCm: z.number().int().positive('Auth.errors.positiveNumber'),
  pesoKg: z.number().positive('Auth.errors.positiveNumber'),
});

type MeasurementsFormData = z.infer<typeof measurementsSchema>;

export default function OnboardingMeasurementsPage() {
  const t = useTranslations('Auth');
  const tOnboarding = useTranslations('Auth.onboarding');
  const router = useRouter();
  const { alturaCm, pesoKg, setBiometricData } = useOnboardingStore();

  const { register, handleSubmit, formState: { errors } } = useForm<MeasurementsFormData>({
    resolver: zodResolver(measurementsSchema),
    defaultValues: {
      alturaCm: alturaCm || 170,
      pesoKg: pesoKg || 70,
    }
  });

  const onSubmit = (data: MeasurementsFormData) => {
    // Guardamos en el store usando setBiometricData
    setBiometricData(data);
    router.push('/onboarding/paso-actividad');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-start p-8 pt-24 pb-24">
        
        {/* Oso y Burbuja */}
        <div className="w-full max-w-md flex flex-col items-center pt-8 mb-8">
          <div className="relative bg-white text-black text-center rounded-xl p-6 mb-6 w-full max-w-sm">
            <p className="text-lg font-semibold">{tOnboarding('measurementsPrompt')}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
              border-l-[15px] border-l-transparent
              border-r-[15px] border-r-transparent
              border-t-[15px] border-t-white"
            />
          </div>
          
          <div className="w-48 h-48">
            <Oso />
          </div>
        </div>

        {/* Título */}
        <div className="text-center mb-8 w-full max-w-md">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
            {tOnboarding('measurementsTitle')}
          </h1>
          <p className="text-gray-light text-base">
            Paso 2 de 4
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Altura */}
            <div className="flex flex-col relative">
              <label htmlFor="alturaCm" className="text-gray-light mb-2 text-sm">
                {tOnboarding('height')}
              </label>
              <Input 
                id="alturaCm"
                type="number"
                placeholder="Ej: 175"
                {...register('alturaCm', { valueAsNumber: true })}
                isInvalid={!!errors.alturaCm}
                className="pr-12"
              />
              <span className="absolute right-4 top-[60%] text-gray-light text-sm">
                {tOnboarding('cm') || 'cm'}
              </span>
              <FormError message={errors.alturaCm?.message} />
            </div>

            {/* Peso */}
            <div className="flex flex-col relative">
              <label htmlFor="pesoKg" className="text-gray-light mb-2 text-sm">
                {tOnboarding('weight')}
              </label>
              <Input 
                id="pesoKg"
                type="number"
                step="0.1"
                placeholder="Ej: 75"
                {...register('pesoKg', { valueAsNumber: true })}
                isInvalid={!!errors.pesoKg}
                className="pr-12"
              />
              <span className="absolute right-4 top-[60%] text-gray-light text-sm">
                {tOnboarding('kg') || 'kg'}
              </span>
              <FormError message={errors.pesoKg?.message} />
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => router.back()}
                className="flex-1"
              >
                {t('backButton') || 'Atrás'}
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                {t('continueButton') || 'Continuar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}