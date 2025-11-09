import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}

/**
 * Store de Zustand para manejar el estado de autenticación.
 * Persiste el token en localStorage.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      setToken: (token) => {
        set({ token, isAuthenticated: true });
      },
      logout: () => {
        set({ token: null, isAuthenticated: false });
        // Podríamos también limpiar el localStorage de next-intl si quisiéramos
        // localStorage.removeItem('goh2-locale');
      },
    }),
    {
      name: 'goh2-auth-storage', // nombre de la clave en localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage
    }
  )
);