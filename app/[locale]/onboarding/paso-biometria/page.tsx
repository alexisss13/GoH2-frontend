// app/[locale]/onboarding/paso-biometria/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { userService } from '@/lib/userService';

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

// Tipos y Esquema de Biometría
const biometricSchema = z.object({
  fechaNacimiento: z.string().min(1, 'Auth.errors.invalidDate'), 
  genero: z.enum(['Masculino', 'Femenino', 'Otro'], {
    message: 'Auth.errors.invalidOption'
  }),
  alturaCm: z.number().int().positive('Auth.errors.positiveNumber'),
  pesoKg: z.number().positive('Auth.errors.positiveNumber'),
  nivelActividad: z.enum(['Sedentario', 'Ligero', 'Moderado', 'Activo', 'MuyActivo'], {
    message: 'Auth.errors.invalidOption'
  }),
});

type BiometricFormData = z.infer<typeof biometricSchema>;

export default function OnboardingBiometricPage() {
  const t = useTranslations('Auth');
  const tOnboarding = useTranslations('Auth.onboarding');
  const router = useRouter();
  const token = useAuthStore(state => state.token);
  const { reset: resetOnboarding } = useOnboardingStore();
  const { logout } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<BiometricFormData>({
    resolver: zodResolver(biometricSchema),
    defaultValues: {
      genero: 'Masculino', 
      nivelActividad: 'Moderado', 
      alturaCm: 170, 
      pesoKg: 70,
      fechaNacimiento: new Date().toISOString().split('T')[0],
    }
  });

  // Redirigir si no hay token
  useEffect(() => {
    if (!token) {
      logout();
      router.replace('/login');
    }
  }, [token, logout, router]);

  const onSubmit = async (data: BiometricFormData) => {
    if (!token) return;

    setIsLoading(true);
    setApiError(null);

    try {
      const payload = {
        ...data,
        fechaNacimiento: new Date(data.fechaNacimiento).toISOString(), 
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
    return <div className="text-center text-xl font-bold text-red-500 min-h-screen pt-24">Redirigiendo...</div>;
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      <div className="flex flex-col min-h-screen items-center justify-start p-8 pt-24 pb-24">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
            {tOnboarding('biometricTitle')}
          </h1>
          <p className="text-gray-light text-lg max-w-sm mx-auto">
            {tOnboarding('biometricSubtitle')}
          </p>
        </div>

        {/* Contenido (Doble Columna para Web) */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-start md:space-x-12">
          
          {/* Columna Izquierda: Formulario */}
          <div className="flex-1 w-full max-w-lg mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Fila 1: Fecha Nacimiento */}
              <div className="flex flex-col">
                <label htmlFor="fechaNacimiento" className="text-gray-light mb-1">{tOnboarding('dob')}</label>
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

              {/* Fila 2: Género */}
              <div className="flex flex-col">
                <label htmlFor="genero" className="text-gray-light mb-1">{tOnboarding('gender')}</label>
                <select 
                  id="genero"
                  className={`w-full bg-gray-medium/20 text-white border rounded-xl py-4 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-4 ${
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

              {/* Fila 3: Altura y Peso (2 columnas) */}
              <div className="flex space-x-4">
                {/* Altura */}
                <div className="flex flex-col flex-1 relative">
                  <label htmlFor="alturaCm" className="text-gray-light mb-1">{tOnboarding('height')}</label>
                  <Input 
                    id="alturaCm"
                    type="number"
                    placeholder="Ej: 175"
                    {...register('alturaCm', { valueAsNumber: true })}
                    isInvalid={!!errors.alturaCm}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-light text-sm">{tOnboarding('cm')}</span>
                  <FormError message={errors.alturaCm?.message} />
                </div>
                {/* Peso */}
                <div className="flex flex-col flex-1 relative">
                  <label htmlFor="pesoKg" className="text-gray-light mb-1">{tOnboarding('weight')}</label>
                  <Input 
                    id="pesoKg"
                    type="number"
                    step="0.1"
                    placeholder="Ej: 75"
                    {...register('pesoKg', { valueAsNumber: true })}
                    isInvalid={!!errors.pesoKg}
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-[50%] transform -translate-y-1/2 text-gray-light text-sm">{tOnboarding('kg')}</span>
                  <FormError message={errors.pesoKg?.message} />
                </div>
              </div>
              
              {/* Fila 4: Nivel de Actividad */}
              <div className="flex flex-col">
                <label htmlFor="nivelActividad" className="text-gray-light mb-1">{tOnboarding('activityLevel')}</label>
                <select 
                  id="nivelActividad"
                  className={`w-full bg-gray-medium/20 text-white border rounded-xl py-4 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pl-4 ${
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

              {apiError && (
                <p role="alert" className="flex items-center justify-center text-red-500 text-sm text-center py-2">
                  <ErrorIcon /> {apiError}
                </p>
              )}

              <div className="w-full max-w-xs mx-auto pt-4">
                <Button type="submit" variant="primary" isLoading={isLoading}>
                  {t('registerButton')}
                </Button>
              </div>

            </form>
          </div>
          
          {/* Columna Derecha: Mascota (Web) */}
          <div className="hidden md:flex flex-1 items-center justify-center w-full mt-10 md:mt-0">
            <Oso /> 
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}