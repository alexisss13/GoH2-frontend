'use client';

import { useState } from 'react';
// Eliminamos useRouter de aquí para no forzar redirecciones
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/authStore';
import { authService, LoginData, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/lib/authService';
import { useOnboardingStore } from '@/store/onboardingStore';

export const useAuth = () => {
  const t = useTranslations('Auth');
  const { setToken } = useAuthStore();
  const resetOnboarding = useOnboardingStore(state => state.reset);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LOGIN MODIFICADO ---
  // Devuelve boolean (true si éxito, false si error) y NO redirige
  const handleLogin = async (data: LoginData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await authService.login(data);
      setToken(res.token);
      // router.push('/dashboard'); // <--- ¡ESTA LÍNEA SE ELIMINÓ!
      return true; // Éxito
    } catch (err: any) {
      setError(t('loginError'));
      console.error(err);
      return false; // Fallo
    } finally {
      setIsLoading(false);
    }
  };

  // --- REGISTRO MODIFICADO ---
  const handleRegister = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(data);
      
      // Login Automático
      const loginData: LoginData = { email: data.email, password: data.password };
      const res = await authService.login(loginData);

      setToken(res.token);

      // router.push('/onboarding/paso-datos-basicos'); // <--- ¡ESTA LÍNEA SE ELIMINÓ!
      return true; 
      
    } catch (err: any) {
      if (err.message && err.message.includes('correo ya ha sido registrado')) {
        setError(t('registerError'));
      } else {
        setError(t('unknownError'));
      }
      console.error(err);
      return false;
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
      window.location.href = `${localePrefix}/restablecer-password-enviado?email=${encodedEmail}`;
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