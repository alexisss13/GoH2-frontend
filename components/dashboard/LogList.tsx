// components/dashboard/LogList.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LogListProps {
  registros: any[];
  showHistoryLink?: boolean;
}

const getBeverageIcon = (nombre: string) => {
  const n = nombre.toLowerCase();
  
  if (n.includes('agua')) {
    return <span className="material-symbols-outlined text-[28px]">water_full</span>;
  }
  
  if (n.includes('café')) {
    return <span className="material-symbols-outlined text-[28px]">coffee_maker</span>;
  }
  
  if (n.includes('té')) {
    return <span className="material-symbols-outlined text-[28px]">emoji_food_beverage</span>;
  }
  
  if (n.includes('jugo')) {
    return <span className="material-symbols-outlined text-[28px]">blender</span>;
  }
  
  if (n.includes('yogur')) {
    return <span className="material-symbols-outlined text-[28px]">local_drink</span>;
  }
  
  if (n.includes('cerveza') || n.includes('alcohol')) {
    return <span className="material-symbols-outlined text-[28px]">sports_bar</span>;
  }
  
  if (n.includes('refresco')) {
    return <span className="material-symbols-outlined text-[28px]">local_drink</span>;
  }
  
  return <span className="material-symbols-outlined text-[28px]">local_drink</span>;
};

const getBeverageColor = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('agua')) return '#0097B2';
  if (n.includes('café')) return '#4B3022';
  if (n.includes('té')) return '#528B34';
  if (n.includes('jugo')) return '#D46839';
  if (n.includes('yogur')) return '#A84066';
  if (n.includes('refresco')) return '#7A348B';
  if (n.includes('cerveza') && !n.includes('sin')) return '#823514';
  if (n.includes('cerveza') && n.includes('sin')) return '#823514';
  if (n.includes('alcohol')) return '#4E1800';
  return '#0097B2';
};

const LogItem = ({ registro }: { registro: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const color = getBeverageColor(registro.bebida.nombre);

    return (
        <div className="bg-[#1A1A1A] rounded-3xl border border-gray-800/50 overflow-hidden transition-all duration-300">
            
            <div 
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-4 lg:p-6 flex items-center justify-between cursor-pointer hover:bg-[#222] transition-colors group"
            >
                <div className="flex items-center gap-4">
                    <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg"
                        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}40` }}
                    >
                        {getBeverageIcon(registro.bebida.nombre)}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-white font-bold text-lg leading-tight">
                            {registro.bebida.nombre}
                        </span>
                        
                        <span className="text-gray-400 text-sm flex items-center gap-2 mt-0.5">
                            {new Date(registro.fechaHora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <span className="block text-white font-bold text-lg">{registro.cantidadConsumidaMl}ml</span>
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">
                            {registro.tipoRegistro === 'MANUAL' ? 'Manual' : 'Digital'}
                        </span>
                    </div>
                    
                    <div className={`text-gray-500 group-hover:text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="bg-black/20 border-t border-gray-800/50 p-4 lg:p-6 animate-fade-in">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Comentarios
                    </h4>
                    <p className="text-xs text-gray-600 italic text-center py-2">
                        No hay comentarios aún.
                    </p>
                </div>
            )}
        </div>
    );
};

export default function LogList({ registros, showHistoryLink = true }: LogListProps) {
  const [maxItems, setMaxItems] = useState(3);

  // Detectar el tamaño de pantalla y ajustar el límite
  useEffect(() => {
    const updateMaxItems = () => {
      if (window.innerWidth >= 1024) {
        setMaxItems(4); // Desktop: 4 items
      } else {
        setMaxItems(3); // Mobile: 3 items
      }
    };

    updateMaxItems();
    window.addEventListener('resize', updateMaxItems);
    return () => window.removeEventListener('resize', updateMaxItems);
  }, []);

  // Limitar los registros a mostrar
  const registrosLimitados = registros.slice(0, maxItems);
  const hayMasRegistros = registros.length > maxItems;

  return (
    <div className="w-full px-0 lg:px-6">
      
      <div className="flex items-center justify-between mb-4 mt-2">
        <h3 className="text-lg font-bold text-white">Últimos registros de bebidas</h3>
        
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

      {registros.length === 0 && (
        <div className="text-center py-12 bg-[#1A1A1A] rounded-3xl border border-gray-800/50">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0F0F0F] flex items-center justify-center">
             <span className="material-symbols-outlined text-gray-600 text-[32px]">water_full</span>
          </div>
          <p className="text-white text-base font-semibold mb-1">¡Bebe agua ya mismo!</p>
          <p className="text-gray-500 text-sm">Sin registro de bebidas hoy</p>
        </div>
      )}

      <div className="space-y-3">
        {registrosLimitados.map((registro, index) => (
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