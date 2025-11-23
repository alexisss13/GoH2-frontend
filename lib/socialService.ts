// lib/socialService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export interface RankingItem {
  usuarioId: string;
  nombre: string;
  totalMl: number;
  esUsuarioActual: boolean;
}

export interface FeedItem {
  id: string;
  cantidadConsumidaMl: number;
  fechaHora: string;
  usuario: { nombre: string };
  bebida: { nombre: string };
  conteoDeLikes: number;
  conteoDeComentarios: number;
  leDiLike: boolean;
}

export interface Comentario {
  id: string;
  texto: string;
  createdAt: string;
  usuario: {
    id: string;
    nombre: string;
  };
}

export interface UsuarioBusqueda {
  id: string;
  nombre: string;
  email: string;
}

export const socialService = {
  // Obtener Ranking (dia, semana, mes)
  getRanking: async (token: string, periodo: 'dia' | 'semana' | 'mes' = 'dia'): Promise<RankingItem[]> => {
    const res = await fetch(`${API_URL}/social/ranking?periodo=${periodo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al obtener ranking');
    return res.json();
  },

  // Obtener Feed
  getFeed: async (token: string, page = 1): Promise<{ data: FeedItem[] }> => {
    const res = await fetch(`${API_URL}/social/feed?page=${page}&limit=20`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al obtener feed');
    return res.json();
  },

  // Buscar Usuarios
  searchUsuarios: async (token: string, query: string): Promise<UsuarioBusqueda[]> => {
    if (!query) return [];
    const res = await fetch(`${API_URL}/social/buscar?q=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error en la búsqueda');
    return res.json();
  },

  // Seguir Usuario
  followUser: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/social/seguir/${id}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al seguir usuario');
    return res.json();
  },

  unfollowUser: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/social/dejar-de-seguir/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al dejar de seguir usuario');
    return res.json();
  },

  // Dar Like
  toggleLike: async (token: string, registroId: string, isLiked: boolean) => {
    const method = isLiked ? 'DELETE' : 'POST';
    const res = await fetch(`${API_URL}/social/registros/${registroId}/like`, {
      method,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al dar like');
    return res.json();
  },

  getComentarios: async (token: string, registroId: string): Promise<Comentario[]> => {
    const res = await fetch(`${API_URL}/social/registros/${registroId}/comentarios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Error al obtener comentarios');
    return res.json();
  },

  addComentario: async (token: string, registroId: string, texto: string): Promise<Comentario> => {
    const res = await fetch(`${API_URL}/social/registros/${registroId}/comentar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ texto }),
    });
    if (!res.ok) throw new Error('Error al comentar');
    return res.json();
  }
};