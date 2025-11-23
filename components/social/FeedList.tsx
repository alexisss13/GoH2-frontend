// components/social/FeedList.tsx
'use client';

import { useState } from 'react';
import { FeedItem, Comentario, socialService } from '@/lib/socialService';
import { useAuthStore } from '@/store/authStore';
import { GlassIcon, CoffeeIcon } from '../layout/Icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const getIcon = (name: string) => {
    if (name.toLowerCase().includes('caf') || name.toLowerCase().includes('té')) 
        return <CoffeeIcon className="w-5 h-5 text-white" />;
    return <GlassIcon className="w-5 h-5 text-white" />;
};

// Subcomponente para manejar la lógica individual de cada post (likes/comentarios)
const FeedPost = ({ item, onLike }: { item: FeedItem, onLike: (id: string, current: boolean) => void }) => {
    const token = useAuthStore(state => state.token);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<Comentario[]>([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isSending, setIsSending] = useState(false);
    // Estado local para actualizar conteo visualmente de inmediato
    const [commentCount, setCommentCount] = useState(item.conteoDeComentarios);

    const handleToggleComments = async () => {
        if (!showComments && comments.length === 0 && token) {
            setLoadingComments(true);
            try {
                const data = await socialService.getComentarios(token, item.id);
                setComments(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingComments(false);
            }
        }
        setShowComments(!showComments);
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !token) return;
        
        setIsSending(true);
        try {
            const comentario = await socialService.addComentario(token, item.id, newComment);
            setComments([...comments, comentario]);
            setCommentCount(prev => prev + 1);
            setNewComment('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-[#1A1A1A] p-4 rounded-2xl border border-gray-800 flex flex-col gap-4">
            {/* Header del Post */}
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
                        {item.usuario.nombre.charAt(0).toUpperCase()}
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-white font-semibold text-sm">{item.usuario.nombre}</p>
                            <p className="text-gray-500 text-xs">
                                {new Date(item.fechaHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-lg">
                            {getIcon(item.bebida.nombre)}
                            <span className="text-primary font-bold text-sm">{item.cantidadConsumidaMl}ml</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-6 border-t border-gray-800 pt-3 pl-14">
                <button 
                    onClick={() => onLike(item.id, item.leDiLike)}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${item.leDiLike ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={item.leDiLike ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    {item.conteoDeLikes}
                </button>

                <button 
                    onClick={handleToggleComments}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${showComments ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                    {commentCount}
                </button>
            </div>

            {/* Sección de Comentarios (Expandible) */}
            {showComments && (
                <div className="pl-14 mt-2 space-y-4 animate-fade-in">
                    {/* Lista */}
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {loadingComments ? (
                            <p className="text-xs text-gray-500">Cargando comentarios...</p>
                        ) : comments.length > 0 ? (
                            comments.map(c => (
                                <div key={c.id} className="bg-gray-900/50 p-2.5 rounded-xl text-xs">
                                    <span className="font-bold text-white mr-2">{c.usuario.nombre}</span>
                                    <span className="text-gray-300">{c.texto}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-xs text-gray-600 italic">Sé el primero en comentar.</p>
                        )}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmitComment} className="flex gap-2">
                        <input 
                            type="text" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Escribe un comentario..."
                            className="flex-1 bg-gray-900 text-white text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary border border-gray-800"
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

export default function FeedList({ items, isLoading, onLike }: { items: FeedItem[], isLoading: boolean, onLike: (id: string, current: boolean) => void }) {
  if (isLoading) return <div className="text-center py-10 text-gray-500 animate-pulse">Cargando actividad...</div>;

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-[#1A1A1A] rounded-3xl border border-gray-800">
        <p className="text-gray-400 font-medium">No hay actividad reciente.</p>
        <p className="text-sm text-gray-600 mt-1">¡Sigue a más amigos para ver su progreso!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-32 lg:pb-0">
      {items.map((item) => (
          <FeedPost key={item.id} item={item} onLike={onLike} />
      ))}
    </div>
  );
}