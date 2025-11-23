// lib/configService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export const configService = {
  changePassword: async (currentPassword: string, newPassword: string, token: string) => {
    const res = await fetch(`${API_URL}/configuracion/cambiar-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        passwordActual: currentPassword, 
        passwordNueva: newPassword 
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cambiar contraseña');
    return data;
  }
};