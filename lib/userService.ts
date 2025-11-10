// lib/userService.ts
// Definimos los tipos del backend para el PUT /perfil
type NivelActividad = 'Sedentario' | 'Ligero' | 'Moderado' | 'Activo' | 'MuyActivo';
type Genero = 'Masculino' | 'Femenino' | 'Otro';
type UnidadMedida = 'ML' | 'OZ'; // Enum del backend

export interface ProfileUpdateData {
  fechaNacimiento?: string; // ISO 8601 string
  genero?: Genero;
  alturaCm?: number;
  pesoKg?: number;
  nivelActividad?: NivelActividad;
  unidadMedida?: UnidadMedida;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

/**
 * Servicio para actualizar datos del perfil.
 * PUT /api/perfil
 */
export const userService = {
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
};