// app/[locale]/onboarding/paso-objetivos/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { userService } from '@/lib/userService';

// Layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/Oso';

// UI
import { Button } from '@/components/ui/Button';

// Iconos
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
  
  // Obtenemos todos los datos del store
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

  // Redirigir si no hay token
  useEffect(() => {
    if (!token) {
      logout();
      router.replace('/login');
    }
  }, [token, logout, router]);

  const handleFinish = async () => {
    if (!token) return;

    // Validar que tengamos todos los datos necesarios
    if (!fechaNacimiento || !genero || !alturaCm || !pesoKg || !nivelActividad) {
      setApiError('Datos incompletos. Por favor, completa todos los pasos anteriores.');
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      // Enviamos todos los datos biométricos al API
      const payload = {
        fechaNacimiento: new Date(fechaNacimiento).toISOString(),
        genero,
        alturaCm,
        pesoKg,
        nivelActividad,
        unidadMedida: 'ML' as const,
      };

      await userService.updateProfile(payload, token);
      
      // Limpiamos el store después del éxito
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
        
        {/* Oso y Burbuja */}
        <div className="w-full max-w-md flex flex-col items-center pt-8 mb-8">
          <div className="relative bg-white text-black text-center rounded-xl p-6 mb-6 w-full max-w-sm">
            <p className="text-lg font-semibold">{tOnboarding('finalPrompt')}</p>
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
            {tOnboarding('finalTitle')}
          </h1>
          <p className="text-gray-light text-base">
            Paso 4 de 4
          </p>
        </div>

        {/* Resumen de datos */}
        <div className="w-full max-w-md mb-8">
          <div className="bg-gray-medium/10 rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-lg text-white mb-4">
              {tOnboarding('summaryTitle') || 'Resumen de tus datos:'}
            </h3>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-light">{tOnboarding('gender')}:</span>
              <span className="text-white font-medium">{genero}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-light">{tOnboarding('dob')}:</span>
              <span className="text-white font-medium">
                {fechaNacimiento ? new Date(fechaNacimiento).toLocaleDateString('es-ES') : '-'}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-light">{tOnboarding('height')}:</span>
              <span className="text-white font-medium">{alturaCm} cm</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-light">{tOnboarding('weight')}:</span>
              <span className="text-white font-medium">{pesoKg} kg</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-light">{tOnboarding('activityLevel')}:</span>
              <span className="text-white font-medium">{nivelActividad}</span>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="w-full max-w-md mb-6">
          <div className="bg-primary/10 rounded-xl p-4 text-sm text-gray-light border border-primary/20">
            <p className="mb-2 font-semibold text-white">💡 {tOnboarding('tip') || 'Consejo'}</p>
            <p>
              Basándonos en estos datos, personalizaremos tu experiencia con recomendaciones 
              de hidratación y hábitos saludables adaptados a tu perfil.
            </p>
          </div>
        </div>

        {apiError && (
          <p role="alert" className="flex items-center justify-center text-red-500 text-sm text-center py-2 mb-4">
            <ErrorIcon /> {apiError}
          </p>
        )}

        {/* Botones */}
        <div className="w-full max-w-md">
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => router.back()}
              className="flex-1"
              disabled={isLoading}
            >
              {t('backButton') || 'Atrás'}
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              className="flex-1" 
              isLoading={isLoading}
              onClick={handleFinish}
            >
              {t('finishButton') || 'Finalizar'}
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}