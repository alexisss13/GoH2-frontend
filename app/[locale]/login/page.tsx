'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link'; // ← Cambiado
import { useRouter } from 'next/navigation'; // ← Cambiado
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

// Esquema de validación para Zod
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});
type LoginFormData = z.infer<typeof loginSchema>;

// Iconos
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

/**
 * Página de Login, adaptada al diseño de Login.jpg (dos columnas)
 * e integrando Header y Footer.
 */
export default function LoginPage() {
  const t = useTranslations('Auth');
  const { handleLogin, isLoading, error } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    handleLogin(data);
  };

return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Header />

      {/* Contenido Principal (Dos Columnas) */}
      <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-8 pt-24 pb-24">
        
        {/* === Columna Izquierda (Oso) === */}
        <div className="flex-1 flex items-center justify-center w-full md:w-1/2 p-10">
          <div className="w-64 h-64 md:w-96 md:h-96">
            <Oso /> 
          </div>
        </div>

        {/* === Columna Derecha (Formulario) === */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center w-full md:w-1/2 p-10">
          <div className="w-full max-w-sm">
            
            {/* Título: "Iniciar Sesión" */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-10 text-center md:text-left">
              {t('loginTitle')}
            </h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              <Input 
                icon={<EmailIcon />}
                placeholder={t('email')}
                type="email"
                {...register('email')}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              
              <PasswordInput 
                placeholder={t('password')}
                {...register('password')}
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}


                  {/* ... Inputs de Email y Password ... */}
                  {/* ... Errores de Email y Password ... */}

                  {/* Enlace de Restablecer Contraseña (como texto simple) */}
                  <div className="w-full text-left -mt-2 mb-4"> {/* Añadido mb-4 para espacio */}
                    <Link 
                      href="/restablecer-password" 
                      className="text-sm text-gray-light hover:text-white transition-colors underline"
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>

                  {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                  
                  {/* Botón de Login (Primario) */}
                  <Button 
                    type="submit" 
                    variant="primary" 
                    isLoading={isLoading} 
                    className="w-full"
                  >
                    {t('loginButton')}
                  </Button>
                  
                  {/* Botón de Registro (Secundario) - AHORA ES UN BOTÓN */}
                  <Button 
                    type="button" // <-- Buena práctica
                    variant="secondary" 
                    className="w-full" 
                    onClick={() => router.push('/registro')}
                  >
                    {t('registerPrompt')}
                  </Button>
                </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}