'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Usamos el router de i18n
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { authService, LoginData, RegisterData } from '@/lib/authService';

/**
 * Hook para manejar la lógica de Login y Registro
 */
export const useAuth = () => {
  const t = useTranslations('Auth');
  const router = useRouter();
  const { setToken } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(data);
      setToken(res.token);
      // Redirigir al dashboard (que crearemos luego)
      router.push('/dashboard'); 
    } catch (err: any) {
      setError(t('loginError'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(data);
      // Redirigir a la página de "Éxito" (Pág. 13) o directo a Login
      // Por ahora, redirigimos a Login.
      router.push('/login');
    } catch (err: any) {
      // Mapeamos los errores del backend a las traducciones
      if (err.message.includes('correo ya ha sido registrado')) {
        setError(t('registerError'));
      } else {
        setError(t('unknownError'));
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleLogin,
    handleRegister,
    setError, // Para validaciones del lado del cliente (ej. mismatch password)
  };
};