// store/onboardingStore.ts
import { create } from 'zustand';

// Definiciones de tipos del backend
type NivelActividad = 'Sedentario' | 'Ligero' | 'Moderado' | 'Activo' | 'MuyActivo';
type Genero = 'Masculino' | 'Femenino' | 'Otro';

// Separar datos de acciones
interface OnboardingData {
  // Datos del Paso 1 (Cuentas)
  nombre: string;
  email: string;
  password: string;
  
  // Datos del Paso 2 (Biometría) - Ahora dividido en 4 pasos
  fechaNacimiento: string; // Usamos string para el ISO 8601
  genero: Genero | null;
  alturaCm: number | null;
  pesoKg: number | null;
  nivelActividad: NivelActividad | null;
}

interface OnboardingActions {
  setAccountData: (data: { nombre: string; email: string; password: string }) => void;
  setBiometricData: (data: Partial<OnboardingData>) => void;
  reset: () => void;
}

type OnboardingState = OnboardingData & OnboardingActions;

const initialState: OnboardingData = {
  nombre: '',
  email: '',
  password: '',
  fechaNacimiento: '', 
  genero: 'Masculino', // Default sugerido
  alturaCm: null,
  pesoKg: null,
  nivelActividad: 'Moderado', // Default sugerido
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setAccountData: (data) => set((state) => ({ 
    ...state, 
    ...data,
  })),

  // Este método ahora se usa en cada paso para actualizar parcialmente los datos
  setBiometricData: (data) => set((state) => ({ 
    ...state, 
    ...data,
  })),

  reset: () => set(initialState),
}));