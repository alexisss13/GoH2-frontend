'use client';

import { useState } from 'react';
// Eliminamos useRouter de aquí para no forzar redirecciones
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { authService, LoginData, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/lib/authService';
import { useOnboardingStore } from '@/store/onboardingStore';

/**
 * Hook para manejar la lógica de Login y Registro
 * MODIFICADO: Ahora devuelve boolean y NO redirige automáticamente.
 */
export const useAuth = () => {
  const t = useTranslations('Auth');
  const { setToken } = useAuthStore();
  // const router = useRouter(); // <--- ELIMINADO
  const resetOnboarding = useOnboardingStore(state => state.reset);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(data);
      setToken(res.token);
      // router.push('/dashboard'); // <--- ELIMINADO: Dejamos que el componente decida
      return true; // Éxito
    } catch (err: any) {
      setError(t('loginError'));
      console.error(err);
      return false; // Fallo
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Registro
      await authService.register(data);
      
      // 2. Login Automático
      const loginData: LoginData = { email: data.email, password: data.password };
      const res = await authService.login(loginData);

      // 3. Guardar Token
      setToken(res.token);

      // router.push('/onboarding/paso-datos-basicos'); // <--- ELIMINADO
      return true; // Éxito
      
    } catch (err: any) {
      if (err.message && err.message.includes('correo ya ha sido registrado')) {
        setError(t('registerError'));
      } else {
        setError(t('unknownError'));
      }
      console.error(err);
      return false; // Fallo
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authService.forgotPassword(data);
      
      const currentLocale = document.documentElement.lang;
      const localePrefix = currentLocale === 'es' ? '' : `/${currentLocale}`;
      
      const encodedEmail = encodeURIComponent(data.email);
      const url = `${localePrefix}/restablecer-password-enviado?email=${encodedEmail}`;
      
      window.location.href = url;
      
    } catch (err: any) {
      setError(t('unknownError'));
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.resetPassword(data);
      // Aquí sí podemos dejar una redirección o manejarla fuera, 
      // pero como es un caso específico usamos window.location o dejamos que el componente maneje
      // Para consistencia, retornamos true y que el componente redirija si quieres, 
      // pero dejaremos esto tal cual si no te da problemas. 
      // Si te da problemas, devuelve true y redirige en el componente.
      window.location.href = '/login?messageKey=passwordUpdateSuccess';
    } catch (err: any) {
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