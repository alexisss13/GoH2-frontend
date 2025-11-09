'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import AuthLayout from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

// Esquema de validación para Zod (Pág. 5)
const registerSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string()
})
.refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Dónde mostrar el error
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
const ReloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export default function RegisterPage() {
  const t = useTranslations('Auth');
  const { handleRegister, isLoading, error, setError } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    // El 'refine' de Zod ya comprueba esto, pero es una doble seguridad.
    if (data.password !== data.confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }
    // Quitamos confirmPassword antes de enviar al hook
    const { confirmPassword, ...registerData } = data;
    handleRegister(registerData);
  };

  return (
    // Usamos el AuthLayout con el texto de la Pág. 5
    <AuthLayout bubbleText={t('safeInfo')}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <Input 
          icon={<UserIcon />}
          placeholder={t('name')}
          type="text"
          {...register('nombre')}
          aria-invalid={errors.nombre ? "true" : "false"}
        />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}

        <Input 
          icon={<EmailIcon />}
          placeholder={t('email')}
          type="email"
          {...register('email')}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        
        <PasswordInput 
          placeholder={t('password')}
          {...register('password')}
          aria-invalid={errors.password ? "true" : "false"}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <Input 
          icon={<ReloadIcon />}
          placeholder={t('confirmPassword')}
          type="password"
          {...register('confirmPassword')}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" variant="primary" isLoading={isLoading}>
          {t('register')}
        </Button>

        <div className="text-center mt-4">
          <Link href="/login" className="text-gray-light hover:text-white transition-colors">
            {t('loginPrompt')}
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}