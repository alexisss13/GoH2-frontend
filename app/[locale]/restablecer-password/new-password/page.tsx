'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Suspense, useEffect } from 'react';

// Layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/OsoEnergicoV2'; 

// UI
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

// Logic
import { useAuth } from '@/hooks/useAuth';

// Esquema de validación
const newPasswordSchema = z.object({
  password: z.string().min(6, 'Auth.errors.passwordMinLength'),
  confirmPassword: z.string()
})
.refine(data => data.password === data.confirmPassword, {
  message: "Auth.errors.passwordMismatch",
  path: ["confirmPassword"],
});
type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

// Componente de error (reutilizado)
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


// Componente principal que usa searchParams
function NewPasswordContent() {
  const t = useTranslations('Auth');
  const searchParams = useSearchParams();
  const { handleResetPassword, isLoading, error } = useAuth();

  // 1. Obtener el token de la URL
  const token = searchParams.get('token');

  // 2. Redirigir si no hay token (Validación de token no provisto)
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      // Si no hay token, lo mandamos de vuelta al formulario de solicitud de email
      router.replace('/restablecer-password'); 
    }
  }, [token, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
  });

  const onSubmit = (data: NewPasswordFormData) => {
    if (!token) return;
    
    handleResetPassword({
      token, // <-- Enviamos el token de la URL
      password: data.password,
    });
  };
  
  if (!token) {
    // Pantalla de carga mientras el useEffect redirige
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white p-8">
            <div className="text-xl font-bold text-primary">Verificando enlace...</div>
        </div>
    );
  }


  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Contenido Centrado */}
      <div className="flex flex-col min-h-screen items-center justify-center px-8 pt-24 pb-24">
        
        <div className="w-48 h-48 mb-8">
          <Oso /> 
        </div>

        {/* Contenedor del Formulario */}
        <div className="w-full max-w-md text-center">
            
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('newPasswordTitle')}
            </h1>
            <p className="text-gray-light text-lg mb-8 max-w-xs mx-auto">
              {t('newPasswordDescription')}
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Nueva Contraseña */}
              <div>
                <PasswordInput 
                  placeholder={t('password')}
                  {...register('password')}
                  isInvalid={!!errors.password}
                  aria-invalid={!!errors.password}
                />
                <FormError message={errors.password?.message} />
              </div>
              
              {/* Confirmar Contraseña */}
              <div>
                <PasswordInput 
                  placeholder={t('confirmPassword')}
                  {...register('confirmPassword')}
                  isInvalid={!!errors.confirmPassword}
                  aria-invalid={!!errors.confirmPassword}
                />
                <FormError message={errors.confirmPassword?.message} />
              </div>

              {/* Error del API (Token inválido/expirado) */}
              {error && (
                <p role="alert" className="flex items-center justify-center text-red-500 text-sm text-center py-2">
                  <ErrorIcon /> {error}
                </p>
              )}
              
              <Button 
                type="submit" 
                variant="primary" 
                isLoading={isLoading} 
                className="w-full mt-4"
              >
                {t('newPasswordButton')}
              </Button>
        
            </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// 3. Envolvemos la página en Suspense
export default function NewPasswordPage() {
  return (
    <Suspense>
      <NewPasswordContent />
    </Suspense>
  );
}