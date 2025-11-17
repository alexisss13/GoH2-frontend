// app/[locale]/registro/page.tsx

'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Layout
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Oso from '@/components/layout/OsoRegistro'; 

// UI
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

// Logic
import { useAuth } from '@/hooks/useAuth';
import { useOnboardingStore } from '@/store/onboardingStore';

// Esquema de validación para Zod
const registerSchema = z.object({
  nombre: z.string().min(1, 'Auth.errors.nameRequired'),
  email: z.string().email('Auth.errors.emailInvalid'),
  password: z.string().min(6, 'Auth.errors.passwordMinLength'),
  confirmPassword: z.string()
})
.refine(data => data.password === data.confirmPassword, {
  message: "Auth.errors.passwordMismatch",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

// Iconos
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

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

export default function RegisterContent() {
  const t = useTranslations('Auth');
  const { handleRegister, isLoading, error } = useAuth();
  const setAccountData = useOnboardingStore(state => state.setAccountData); 

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    setAccountData({ nombre: data.nombre, email: data.email, password: data.password });
    const { confirmPassword, ...dataToRegister } = data;
    handleRegister(dataToRegister);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />
      
      {/* Contenido Principal (Dos Columnas) */}
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-8 pt-24 pb-24 gap-12">
        
        {/* === Columna Izquierda (Oso y Texto Breve) === */}
        <div className="flex-1 flex flex-col items-center justify-center w-full md:w-1/2 max-w-lg">
          
          {/* Oso */}
          <div className="w-56 h-56 md:w-72 md:h-72 mb-6">
            <Oso /> 
          </div>

          {/* Texto descriptivo compacto */}
          <div className="text-center max-w-md">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              {t('registerWelcome')}
            </h2>
            <p className="text-gray-light text-sm lg:text-base">
              {t('registerDescription')}
            </p>
          </div>
        </div>

        {/* === Columna Derecha (Formulario) === */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full md:w-1/2 max-w-md">
          <div className="w-full">
            
            {/* Título del Formulario */}
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                {t('registerTitle')}
              </h1>
              
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              
              {/* Nombre */}
              <div>
                <Input 
                  id="nombre"
                  icon={<UserIcon />}
                  placeholder={t('name')}
                  type="text"
                  {...register('nombre')}
                  isInvalid={!!errors.nombre}
                />
                <FormError message={errors.nombre?.message} />
              </div>

              {/* Email */}
              <div>
                <Input 
                  id="email"
                  icon={<EmailIcon />}
                  placeholder={t('email')}
                  type="email"
                  {...register('email')}
                  isInvalid={!!errors.email}
                />
                <FormError message={errors.email?.message} />
              </div>
              
              {/* Contraseña */}
              <div>
                <PasswordInput 
                  id="password"
                  placeholder={t('password')}
                  {...register('password')}
                  isInvalid={!!errors.password}
                />
                <FormError message={errors.password?.message} />
              </div>

              {/* Confirmar Contraseña */}
              <div>
                <PasswordInput 
                  id="confirmPassword"
                  placeholder={t('confirmPassword')}
                  {...register('confirmPassword')}
                  isInvalid={!!errors.confirmPassword}
                />
                <FormError message={errors.confirmPassword?.message} />
              </div>

              {error && (
                <p role="alert" className="flex items-center justify-center text-red-500 text-sm text-center py-2">
                  <ErrorIcon /> {error}
                </p>
              )}

              <Button type="submit" variant="primary" isLoading={isLoading} className="mt-5 w-full">
                {t('registerButton')}
              </Button>

              

              {/* Link a login */}
              <div className="text-center pt-4 text-gray-light">
                  {t('alreadyHaveAccount')}{' '}
                  <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
                    {t('loginLink')}
                  </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}