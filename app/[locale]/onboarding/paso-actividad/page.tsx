// app/[locale]/onboarding/paso-actividad/page.tsx
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

// Esquema para actividad
const activitySchema = z.object({
  nivelActividad: z.enum(['Sedentario', 'Ligero', 'Moderado', 'Activo', 'MuyActivo'], {
    message: 'Auth.errors.invalidOption'
  }),
});

type ActivityFormData = z.infer<typeof activitySchema>;

export default function OnboardingActivityPage() {
  const t = useTranslations('Auth');
  const tOnboarding = useTranslations('Auth.onboarding');
  const router = useRouter();
  const { nivelActividad, setBiometricData } = useOnboardingStore();

  const { register, handleSubmit, formState: { errors } } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      nivelActividad: nivelActividad || 'Moderado',
    }
  });

  const onSubmit = (data: ActivityFormData) => {
    // Guardamos en el store usando setBiometricData
    setBiometricData(data);
    router.push('/onboarding/paso-objetivos');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-start p-8 pt-24 pb-24">
        
        {/* Oso y Burbuja */}
        <div className="w-full max-w-md flex flex-col items-center pt-8 mb-8">
          <div className="relative bg-white text-black text-center rounded-xl p-6 mb-6 w-full max-w-sm">
            <p className="text-lg font-semibold">{tOnboarding('activityPrompt')}</p>
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
            {tOnboarding('activityTitle')}
          </h1>
          <p className="text-gray-light text-base">
            Paso 3 de 4
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Nivel de Actividad */}
            <div className="flex flex-col">
              <label htmlFor="nivelActividad" className="text-gray-light mb-2 text-sm">
                {tOnboarding('activityLevel')}
              </label>
              <select 
                id="nivelActividad"
                className={`w-full bg-gray-medium/20 text-white border rounded-xl py-4 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.nivelActividad ? 'border-red-500' : 'border-gray-medium'
                }`}
                {...register('nivelActividad')}
              >
                {Object.entries(tOnboarding.raw('activityOptions') as Record<string, string>).map(([value, label]) => (
                  <option key={value} value={value} className="bg-black text-white">
                    {label}
                  </option>
                ))}
              </select>
              <FormError message={errors.nivelActividad?.message} />
            </div>

            {/* Descripción de ayuda */}
            <div className="bg-gray-medium/10 rounded-xl p-4 text-sm text-gray-light">
              <p className="mb-2 font-semibold text-white">{tOnboarding('activityHelp') || 'Guía de niveles:'}</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Sedentario:</strong> Poco o ningún ejercicio</li>
                <li><strong>Ligero:</strong> Ejercicio 1-3 días/semana</li>
                <li><strong>Moderado:</strong> Ejercicio 3-5 días/semana</li>
                <li><strong>Activo:</strong> Ejercicio 6-7 días/semana</li>
                <li><strong>Muy Activo:</strong> Ejercicio intenso diario</li>
              </ul>
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