// components/social/RankingList.tsx
'use client';

import { RankingItem } from '@/lib/socialService';
import { UserIcon } from '../layout/Icons';

interface RankingListProps {
  items: RankingItem[];
  isLoading: boolean;
}

export default function RankingList({ items, isLoading }: RankingListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-[#1A1A1A] rounded-2xl animate-pulse border border-gray-800" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Aún no hay datos en el ranking.</p>
        <p className="text-sm">¡Invita a amigos para competir!</p>
      </div>
    );
  }

  // Encontramos el valor máximo para escalar las barras (el líder es el 100%)
  const maxVal = Math.max(...items.map(i => i.totalMl), 1); // Evitar división por 0

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const percentage = Math.round((item.totalMl / maxVal) * 100);
        const isTop3 = index < 3;

        return (
          <div 
            key={item.usuarioId}
            className={`relative p-4 rounded-2xl border transition-all ${
              item.esUsuarioActual 
                ? 'bg-[#1A1A1A] border-primary/50 shadow-[0_0_15px_rgba(0,151,178,0.15)]' 
                : 'bg-[#1A1A1A] border-gray-800 hover:border-gray-700'
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              {/* Posición / Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-inner ${
                index === 0 ? 'bg-yellow-500 text-black' :
                index === 1 ? 'bg-gray-300 text-black' :
                index === 2 ? 'bg-amber-700 text-white' :
                'bg-gray-800 text-gray-400'
              }`}>
                {index + 1}
              </div>

              {/* Info */}
              <div className="flex-1">
                 <div className="flex justify-between items-baseline">
                    <span className={`font-semibold text-lg ${item.esUsuarioActual ? 'text-primary' : 'text-white'}`}>
                        {item.esUsuarioActual ? 'Yo' : item.nombre}
                    </span>
                    <span className="text-white font-bold">{item.totalMl} ml</span>
                 </div>
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        item.esUsuarioActual ? 'bg-primary' : isTop3 ? 'bg-primary/80' : 'bg-gray-600'
                    }`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
          </div>
        );
      })}
    </div>
  );
}