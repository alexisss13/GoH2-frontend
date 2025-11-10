'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Usamos el router de i18n
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { authService, LoginData, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/lib/authService';

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

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    // Reiniciamos el error del formulario, pero mantenemos el error global de API
    setError(null); 
    
    try {
      await authService.forgotPassword(data);
      
      // === ARREGLO CRÍTICO ===
      // 1. Obtenemos el prefijo de idioma actual (ej: '', '/en', '/fr')
      const currentLocale = document.documentElement.lang;
      const localePrefix = currentLocale === 'es' ? '' : `/${currentLocale}`;
      
      // 2. Construimos la URL completa y forzamos la navegación
      const encodedEmail = encodeURIComponent(data.email);
      const url = `${localePrefix}/restablecer-password-enviado?email=${encodedEmail}`;
      
      // Usamos la navegación nativa para garantizar que la URL se lea bien.
      window.location.href = url;
      // Note: No usamos setIsLoading(false) porque la página se recarga.
      
    } catch (err: any) {
      setError(t('unknownError'));
      console.error(err);
      setIsLoading(false); // Si hay un error de API, mostramos el error y terminamos
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword(data);
      // Redirigir a login después de un éxito (con mensaje de éxito)
      router.push(`/login?messageKey=passwordUpdateSuccess`); 
    } catch (err: any) {
      // Mapeamos el error del backend (Token inválido/expirado)
      setError(t('passwordUpdateError')); 
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
    handleForgotPassword,
    handleResetPassword,
    setError,
  };
};