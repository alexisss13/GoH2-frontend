// app/[locale]/onboarding/paso-datos-basicos/page.tsx
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

// Esquema para datos básicos
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

  const { register, handleSubmit, formState: { errors } } = useForm<BasicDataFormData>({
    resolver: zodResolver(basicDataSchema),
    defaultValues: {
      genero: genero || 'Masculino',
      fechaNacimiento: fechaNacimiento || new Date().toISOString().split('T')[0],
    }
  });

  const onSubmit = (data: BasicDataFormData) => {
    // Guardamos en el store usando setBiometricData
    setBiometricData(data);
    // Vamos al siguiente paso
    router.push('/onboarding/paso-medidas');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-start p-8 pt-24 pb-24">
        
        {/* Oso y Burbuja */}
        <div className="w-full max-w-md flex flex-col items-center pt-8 mb-8">
          <div className="relative bg-white text-black text-center rounded-xl p-6 mb-6 w-full max-w-sm">
            <p className="text-lg font-semibold">{tOnboarding('basicDataPrompt')}</p>
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
            {tOnboarding('basicDataTitle')}
          </h1>
          <p className="text-gray-light text-base">
            Paso 1 de 4
          </p>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Fecha de Nacimiento */}
            <div className="flex flex-col">
              <label htmlFor="fechaNacimiento" className="text-gray-light mb-2 text-sm">
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

            {/* Género */}
            <div className="flex flex-col">
              <label htmlFor="genero" className="text-gray-light mb-2 text-sm">
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