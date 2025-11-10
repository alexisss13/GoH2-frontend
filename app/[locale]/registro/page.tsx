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
import Oso from '@/components/layout/OsoInicioSesion'; 

// UI
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

// Logic
import { useAuth } from '@/hooks/useAuth';
import { useOnboardingStore } from '@/store/onboardingStore'; // Importamos el store

// Esquema de validación para Zod (Pág. 5)
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

// Iconos (asumo que se importan o están definidos localmente)
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


export default function RegisterPage() {
  const t = useTranslations('Auth');
  const { handleRegister, isLoading, error } = useAuth();
  
  // Usamos el store para guardar los datos antes de la llamada API
  const setAccountData = useOnboardingStore(state => state.setAccountData); 

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // Guardamos los datos en el store (para posible uso futuro)
    setAccountData({ nombre: data.nombre, email: data.email, password: data.password });
    
    // handleRegister hace: Register -> Auto-Login -> Redirect a /onboarding/paso-bienvenida
    const { confirmPassword, ...dataToRegister } = data;
    handleRegister(dataToRegister);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />
      
      {/* Contenido Centrado (Pág. 5) */}
      <div className="flex flex-col min-h-screen items-center justify-start p-8 pt-24 pb-24">
        
        {/* Usamos el layout de Auth, pero con el Oso de Registro (Pág. 5) */}
        <div className="w-full max-w-md flex flex-col items-center pt-12 pb-8">
            {/* Burbuja de Texto (Pág. 5) */}
            <div className="relative bg-white text-black text-center rounded-xl p-4 mb-4 w-full max-w-xs md:max-w-sm">
                <p className="text-lg font-semibold">{t('safeInfo')}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
                    border-l-[15px] border-l-transparent
                    border-r-[15px] border-r-transparent
                    border-t-[15px] border-t-white"
                />
            </div>
            <div className="w-48 h-48 mt-4">
              <Oso /> 
            </div>
        </div>


        {/* Sección Inferior: Formulario */}
        <div className="w-full max-w-sm">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-10 text-center">
            {t('registerTitle')}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Nombre */}
            <div>
              <Input 
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
                placeholder={t('password')}
                {...register('password')}
                isInvalid={!!errors.password}
              />
              <FormError message={errors.password?.message} />
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <PasswordInput 
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

            <Button type="submit" variant="primary" isLoading={isLoading} className="mt-4">
              {t('registerButton')}
            </Button>

            <div className="text-center pt-4">
              <Link href="/login" className="text-gray-light hover:text-white transition-colors">
                {t('loginPrompt')}
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}