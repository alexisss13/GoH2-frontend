// app/[locale]/social/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { socialService, RankingItem, FeedItem, UsuarioBusqueda } from '@/lib/socialService';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FeedList from '@/components/social/FeedList';
import { UserIcon } from '@/components/layout/Icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

// Componente Ranking Local (para incluir el botón de Unfollow)
const RankingList = ({ items, isLoading, onUnfollow }: { items: RankingItem[], isLoading: boolean, onUnfollow: (id: string) => void }) => {
    if (isLoading) return <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-[#1A1A1A] rounded-2xl animate-pulse border border-gray-800" />)}</div>;
    if (items.length === 0) return <div className="text-center py-10 text-gray-500"><p>Aún no hay datos en el ranking.</p></div>;
  
    const maxVal = Math.max(...items.map(i => i.totalMl), 1);
  
    return (
      <div className="space-y-3">
        {items.map((item, index) => {
          const percentage = Math.round((item.totalMl / maxVal) * 100);
          const isTop3 = index < 3;
  
          return (
            <div key={item.usuarioId} className={`relative p-4 rounded-2xl border transition-all group ${item.esUsuarioActual ? 'bg-[#1A1A1A] border-primary/50 shadow-[0_0_15px_rgba(0,151,178,0.15)]' : 'bg-[#1A1A1A] border-gray-800 hover:border-gray-700'}`}>
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${index === 0 ? 'bg-yellow-500 text-black' : index === 1 ? 'bg-gray-300 text-black' : index === 2 ? 'bg-amber-700 text-white' : 'bg-gray-800 text-gray-400'}`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                   <div className="flex justify-between items-baseline">
                      <span className={`font-semibold text-lg ${item.esUsuarioActual ? 'text-primary' : 'text-white'}`}>
                          {item.esUsuarioActual ? 'Yo' : item.nombre}
                      </span>
                      
                      <div className="flex items-center gap-3">
                          <span className="text-white font-bold">{item.totalMl} ml</span>
                          {/* Botón de Dejar de Seguir (Solo para otros usuarios) */}
                          {!item.esUsuarioActual && (
                              <button 
                                onClick={(e) => { e.stopPropagation(); onUnfollow(item.usuarioId); }}
                                className="text-gray-600 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                                title="Dejar de seguir"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                  </svg>
                              </button>
                          )}
                      </div>
                   </div>
                </div>
              </div>
              <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ease-out ${item.esUsuarioActual ? 'bg-primary' : isTop3 ? 'bg-primary/80' : 'bg-gray-600'}`} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

export default function SocialPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  
  const [activeTab, setActiveTab] = useState<'ranking' | 'feed'>('ranking');
  const [rankingPeriod, setRankingPeriod] = useState<'dia' | 'semana' | 'mes'>('dia');
  
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UsuarioBusqueda[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!token) { router.replace('/login'); return; }
    
    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'ranking') {
                const data = await socialService.getRanking(token, rankingPeriod);
                setRanking(data);
            } else {
                const res = await socialService.getFeed(token);
                setFeed(res.data);
            }
        } catch (e) { console.error(e); } 
        finally { setLoading(false); }
    };
    loadData();
  }, [token, activeTab, rankingPeriod, router]);

  const handleSearch = async () => {
      if(!token || !searchQuery.trim()) return;
      setIsSearching(true);
      try {
          const res = await socialService.searchUsuarios(token, searchQuery);
          setSearchResults(res);
      } catch(e) { console.error(e); }
      finally { setIsSearching(false); }
  };

  const handleFollow = async (id: string) => {
      if(!token) return;
      try {
          await socialService.followUser(token, id);
          alert('¡Usuario seguido! Aparecerá en tu ranking.');
          setSearchResults(prev => prev.filter(u => u.id !== id));
          // Opcional: recargar ranking
          if(activeTab === 'ranking') {
              const data = await socialService.getRanking(token, rankingPeriod);
              setRanking(data);
          }
      } catch(e) { alert('Ya sigues a este usuario o hubo un error.'); }
  };

  const handleUnfollow = async (id: string) => {
    if(!token) return;
    if(!confirm("¿Dejar de seguir a este usuario?")) return;
    
    try {
        await socialService.unfollowUser(token, id);
        // Actualizar UI del ranking eliminando al usuario
        setRanking(prev => prev.filter(u => u.usuarioId !== id));
    } catch(e) {
        console.error(e);
        alert('Error al dejar de seguir.');
    }
  };

  const handleLike = async (id: string, isLiked: boolean) => {
      if(!token) return;
      setFeed(prev => prev.map(item => {
          if(item.id === id) {
              return { 
                  ...item, 
                  leDiLike: !isLiked, 
                  conteoDeLikes: isLiked ? item.conteoDeLikes - 1 : item.conteoDeLikes + 1 
              };
          }
          return item;
      }));
      try { await socialService.toggleLike(token, id, isLiked); } catch(e) { console.error(e); }
  };

  return (
    <DashboardLayout onAddClick={() => router.push('/dashboard')}>
        <div className="min-h-screen lg:min-h-0 text-white font-sans pb-24 lg:pb-0 space-y-6">
            
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold hidden lg:block">Social</h1>
                <div className="flex p-1 bg-[#1A1A1A] rounded-xl border border-gray-800">
                    <button onClick={() => setActiveTab('ranking')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'ranking' ? 'bg-primary text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>Ranking</button>
                    <button onClick={() => setActiveTab('feed')} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'feed' ? 'bg-primary text-black shadow-md' : 'text-gray-400 hover:text-white'}`}>Actividad</button>
                </div>
            </div>

            {activeTab === 'ranking' && (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex justify-center gap-2">
                        {['dia', 'semana', 'mes'].map((p) => (
                            <button key={p} onClick={() => setRankingPeriod(p as any)} className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${rankingPeriod === p ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500'}`}>
                                {p === 'dia' ? 'Hoy' : p === 'semana' ? 'Semana' : 'Mes'}
                            </button>
                        ))}
                    </div>

                    {/* Lista de Ranking con opción de Unfollow */}
                    <RankingList items={ranking} isLoading={loading} onUnfollow={handleUnfollow} />

                    <div className="mt-8 pt-6 border-t border-gray-800">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5 text-primary"/> Añadir amigos</h3>
                        <div className="flex gap-2">
                            <Input placeholder="Buscar por nombre..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-[#1A1A1A] border-gray-800" />
                            <Button className="w-auto px-6" onClick={handleSearch} isLoading={isSearching}>Buscar</Button>
                        </div>
                        {searchResults.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {searchResults.map(user => (
                                    <div key={user.id} className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-xl border border-gray-800">
                                        <span className="text-white">{user.nombre}</span>
                                        <button onClick={() => handleFollow(user.id)} className="text-xs bg-primary/20 text-primary px-3 py-1.5 rounded-lg hover:bg-primary/30 font-bold">Seguir</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'feed' && (
                <div className="animate-fade-in">
                     <FeedList items={feed} isLoading={loading} onLike={handleLike} />
                </div>
            )}
            
        </div>
    </DashboardLayout>
  );
}