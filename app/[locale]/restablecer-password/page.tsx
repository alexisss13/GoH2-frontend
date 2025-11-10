'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, Suspense } from 'react';

// Layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/OsoInicioSesion'; 

// UI
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Logic
import { useAuth } from '@/hooks/useAuth';

// Esquema de validación
const forgotPasswordSchema = z.object({
  email: z.string().email('Auth.errors.emailInvalid'),
});
type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Iconos y FormError (los mismos que definiste)
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
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


// Componente que contiene la lógica de redirección y el formulario
function RestablecerPasswordContent() {
  const t = useTranslations('Auth');
  const { handleForgotPassword, isLoading, error } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // 1. CHEQUEAMOS EL TOKEN DE LA URL
  const token = searchParams.get('token');
  
  useEffect(() => {
    if (token) {
      // SI HAY TOKEN, REDIRIGIMOS AL FORMULARIO DE NUEVA CONTRASEÑA
      router.replace(`/restablecer-password/new-password?token=${token}`);
    }
  }, [token, router]);


  // 2. Si hay token, mostramos una pantalla de carga (mientras redirigimos)
  if (token) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-black text-white p-8">
        <div className="text-xl font-bold text-primary">Verificando enlace...</div>
      </div>
    );
  }

  // 3. Si NO hay token, mostramos el formulario de envío de email (Pág. 15)

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    handleForgotPassword(data);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Contenido Centrado - Formulario de Email */}
      <div className="flex flex-col min-h-screen items-center justify-center px-8 pt-24 pb-24">
        
        <div className="w-48 h-48 mb-8">
          <Oso /> 
        </div>

        <div className="w-full max-w-md text-center">
            
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('forgotPasswordTitle')}
            </h1>
            <p className="text-gray-light text-lg mb-8 max-w-xs mx-auto">
              {t('forgotPasswordDescription')}
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              <div>
                <Input 
                  icon={<EmailIcon />}
                  placeholder={t('email')}
                  type="email"
                  {...register('email')}
                  isInvalid={!!errors.email}
                  aria-invalid={!!errors.email}
                />
                <FormError message={errors.email?.message} />
              </div>

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
                {t('forgotPasswordButton')}
              </Button>
              
              {/* Enlace para volver al Login */}
              <div className="text-center pt-4">
                <Link 
                  href="/login" 
                  className="text-gray-light hover:text-white transition-colors"
                >
                  Volver a Iniciar Sesión
                </Link>
              </div>

            </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

// Envolvemos la página principal en Suspense
export default function RestablecerPasswordPage() {
  return (
    <Suspense>
      <RestablecerPasswordContent />
    </Suspense>
  );
}