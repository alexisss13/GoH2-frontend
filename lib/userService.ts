// lib/userService.ts
// Definiciones de tipos
export type NivelActividad = 'Sedentario' | 'Ligero' | 'Moderado' | 'Activo' | 'MuyActivo';
export type Genero = 'Masculino' | 'Femenino' | 'Otro';
export type UnidadMedida = 'ML' | 'OZ';

export interface UserProfile {
  id: string;
  email: string;
  nombre: string;
  fechaNacimiento: string;
  genero: Genero;
  alturaCm: number;
  pesoKg: number;
  nivelActividad: NivelActividad;
  unidadMedida: UnidadMedida;
}

export interface ProfileUpdateData {
  fechaNacimiento?: string;
  genero?: Genero;
  alturaCm?: number;
  pesoKg?: number;
  nivelActividad?: NivelActividad;
  unidadMedida?: UnidadMedida;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const userService = {
  // Obtener perfil actual
  getProfile: async (token: string): Promise<UserProfile> => {
    const res = await fetch(`${API_URL}/perfil`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al cargar perfil');
    return res.json();
  },

  // Actualizar perfil
  updateProfile: async (data: ProfileUpdateData, token: string) => {
    const res = await fetch(`${API_URL}/perfil`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (!res.ok) {
      throw new Error(resData.error || 'Error al actualizar perfil.');
    }
    return resData;
  },

  // Borrar cuenta (Requiere password actual por seguridad)
  deleteAccount: async (password: string, token: string) => {
    const res = await fetch(`${API_URL}/perfil`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });
    
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Error al eliminar cuenta');
    }
    return res.json();
  }
};