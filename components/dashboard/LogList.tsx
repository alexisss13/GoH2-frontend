// components/dashboard/LogList.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Registro } from '@/lib/dashboardService';
import { socialService, Comentario } from '@/lib/socialService';
import { useAuthStore } from '@/store/authStore';
import { GlassIcon, CoffeeIcon, ChevronDownIcon } from '../layout/Icons';

interface LogListProps {
  registros: Registro[];
  showHistoryLink?: boolean;
}

const getBeverageIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('caf') || n.includes('té')) return <CoffeeIcon className="w-6 h-6 text-white" />;
  return <GlassIcon className="w-6 h-6 text-white" />;
};

const getBeverageColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('agua')) return '#0097B2';
  if (n.includes('café')) return '#6B4423';
  if (n.includes('té')) return '#4A7C59';
  if (n.includes('jugo')) return '#FF6B35';
  if (n.includes('yogur')) return '#E84A5F';
  if (n.includes('refresco')) return '#9B59B6';
  if (n.includes('cerveza') && !n.includes('sin')) return '#8B4513';
  if (n.includes('cerveza') && n.includes('sin')) return '#A0826D';
  if (n.includes('alcohol')) return '#4A4A4A';
  return '#0097B2';
};

// --- Subcomponente LogItem ---
const LogItem = ({ registro }: { registro: Registro }) => {
    const token = useAuthStore(state => state.token);
    const [isExpanded, setIsExpanded] = useState(false);
    const [comments, setComments] = useState<Comentario[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Nuevo comentario estado
    const [newComment, setNewComment] = useState('');
    const [isSending, setIsSending] = useState(false);

    const color = getBeverageColor(registro.bebida.nombre);

    const toggleExpand = async () => {
        const nextState = !isExpanded;
        setIsExpanded(nextState);

        if (nextState && !hasLoaded && token) {
            setLoadingComments(true);
            try {
                const data = await socialService.getComentarios(token, registro.id);
                setComments(data);
                setHasLoaded(true);
            } catch (error) {
                console.error("Error cargando comentarios", error);
            } finally {
                setLoadingComments(false);
            }
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !token) return;
        
        setIsSending(true);
        try {
            const comentario = await socialService.addComentario(token, registro.id, newComment);
            setComments([...comments, comentario]);
            setNewComment('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-[#1A1A1A] rounded-3xl border border-gray-800/50 overflow-hidden transition-all duration-300">
            
            {/* Header de la Tarjeta (Clicable) */}
            <div 
                onClick={toggleExpand}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#222] transition-colors group"
            >
                {/* Izquierda: Icono + Nombre + Hora */}
                <div className="flex items-center gap-4">
                    <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg"
                        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}40` }}
                    >
                        {getBeverageIcon(registro.bebida.nombre)}
                    </div>

                    <div className="flex flex-col">
                        {/* Nombre de la bebida restaurado */}
                        <span className="text-white font-bold text-lg leading-tight">
                            {registro.bebida.nombre}
                        </span>
                        
                        <span className="text-gray-400 text-sm flex items-center gap-2 mt-0.5">
                            {new Date(registro.fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            
                            {/* Indicador si tiene comentarios */}
                            {hasLoaded && comments.length > 0 && (
                                <span className="flex items-center text-xs text-primary bg-primary/10 px-1.5 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-0.5">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                    {comments.length}
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                
                {/* Derecha: Cantidad + Tipo + Chevron */}
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className="block text-white font-bold text-lg">{registro.cantidadConsumidaMl}ml</span>
                        {/* Tipo de registro restaurado */}
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">
                            {registro.tipoRegistro === 'MANUAL' ? 'Manual' : 'Digital'}
                        </span>
                    </div>
                    
                    <div className={`text-gray-500 group-hover:text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <ChevronDownIcon className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Sección Desplegable de Comentarios */}
            {isExpanded && (
                <div className="bg-black/20 border-t border-gray-800/50 p-4 animate-fade-in">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Comentarios
                    </h4>

                    {loadingComments ? (
                        <div className="flex items-center justify-center py-2 gap-2 text-sm text-gray-500">
                            <div className="w-4 h-4 border-2 border-primary/50 border-t-primary rounded-full animate-spin" />
                            Cargando...
                        </div>
                    ) : (
                        <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                            {comments.length > 0 ? (
                                comments.map((comentario) => (
                                    <div key={comentario.id} className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                            {comentario.usuario.nombre.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="bg-gray-800/50 rounded-r-xl rounded-bl-xl p-2.5 text-sm flex-1">
                                            <span className="font-bold text-white text-xs block mb-0.5">
                                                {comentario.usuario.nombre}
                                            </span>
                                            <p className="text-gray-300 leading-snug">
                                                {comentario.texto}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-600 italic text-center py-2">
                                    No hay comentarios aún.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Input para comentar (Opcional, si quieres que uno mismo pueda comentar sus logs) */}
                    <form onSubmit={handleSubmitComment} className="flex gap-2">
                        <input 
                            type="text" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe una nota..."
                            className="flex-1 bg-gray-900 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary border border-gray-800 placeholder:text-gray-600"
                        />
                        <button 
                            type="submit" 
                            disabled={!newComment.trim() || isSending}
                            className="bg-primary text-black rounded-xl p-2 disabled:opacity-50 hover:bg-primary-light transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

// --- Componente Principal ---
export default function LogList({ registros, showHistoryLink = true }: LogListProps) {
  return (
    <div className="w-full">
      
      {/* Header de la Sección */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <h3 className="text-lg font-bold text-white">Registro de bebidas</h3>
        
        {showHistoryLink && (
          <Link 
            href="/dashboard/history" 
            className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            aria-label="Ver historial completo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        )}
      </div>

      {/* Estado Vacío */}
      {registros.length === 0 && (
        <div className="text-center py-12 bg-[#1A1A1A] rounded-3xl border border-gray-800/50">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0F0F0F] flex items-center justify-center">
             <GlassIcon className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-white text-base font-semibold mb-1">¡Bebe agua ya mismo!</p>
          <p className="text-gray-500 text-sm">Sin registro de bebidas hoy</p>
        </div>
      )}

      {/* Lista */}
      <div className="space-y-3">
        {registros.map((registro, index) => (
           <div key={registro.id} style={{ animation: `slideIn 0.3s ease-out ${index * 0.05}s both` }}>
              <LogItem registro={registro} />
           </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}