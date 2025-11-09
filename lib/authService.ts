// Definimos los tipos de datos que esperamos del backend
// (Basado en el openapi.yaml)

// Para POST /api/auth/registro
export interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  message: string;
}

// Para POST /api/auth/login
export interface LoginData {
  email: string;
  password: string;
}
export interface LoginResponse {
  message: string;
  token: string;
}

// URL base de la API desde variables de entorno
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Servicio de Autenticación
 * Encapsula las llamadas fetch al backend.
 */
export const authService = {

  login: async (data: LoginData): Promise<LoginResponse> => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (!res.ok) {
      // resData.error viene del backend (ej: "Credenciales inválidas.")
      throw new Error(resData.error || 'Error al iniciar sesión');
    }
    return resData;
  },

  register: async (data: RegisterData): Promise<RegisterResponse> => {
    const res = await fetch(`${API_URL}/auth/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (!res.ok) {
      // resData.error viene del backend (ej: "Lo sentimos, este correo...")
      throw new Error(resData.error || 'Error al registrar usuario');
    }
    return resData;
  },
};