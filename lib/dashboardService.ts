// lib/dashboardService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export interface ResumenDiario {
  consumidoMl: number;
  objetivoMl: number;
}

export interface Bebida {
  id: string;
  nombre: string;
  factorHidratacion: number;
}

export interface Registro {
  id: string;
  cantidadConsumidaMl: number;
  aporteHidricoMl: number;
  fechaHora: string;
  bebida: {
    nombre: string;
  };
  tipoRegistro: 'MANUAL' | 'DIGITAL';
}

// Actualizado: Añadimos fechaHora opcional
export interface CreateRegistroData {
  bebidaId: string;
  cantidadConsumidaMl: number;
  tipoRegistro: 'MANUAL' | 'DIGITAL';
  fechaHora?: string; // ISO Date string
}

export const dashboardService = {
  getResumenHoy: async (token: string): Promise<ResumenDiario> => {
    const res = await fetch(`${API_URL}/resumen/hoy`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al obtener resumen');
    return res.json();
  },

  getBebidas: async (token: string): Promise<Bebida[]> => {
    const res = await fetch(`${API_URL}/bebidas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al obtener bebidas');
    return res.json();
  },

  getRegistros: async (token: string, fecha?: string): Promise<{ totalAporteDia: number; registros: Registro[] }> => {
    const url = fecha 
      ? `${API_URL}/registros?fecha=${fecha}` 
      : `${API_URL}/registros`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al obtener registros');
    return res.json();
  },

  createRegistro: async (data: CreateRegistroData, token: string) => {
    const res = await fetch(`${API_URL}/registros`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error al crear registro');
    return res.json();
  },
};