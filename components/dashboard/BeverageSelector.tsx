// ====================================
// ACTUALIZACIÓN COMPLETA DEL COMPONENTE BeverageSelector
// components/dashboard/BeverageSelector.tsx
// ====================================

'use client';

import { Bebida } from '@/lib/dashboardService';

interface BeverageSelectorProps {
  bebidas: Bebida[];
  onSelect: (bebidaId: string) => void;
  isLoading: boolean;
}

const getBeverageIcon = (nombre: string) => {
  const n = nombre.toLowerCase();
  
  if (n.includes('agua')) {
    return <span className="material-symbols-outlined text-[32px]">water_full</span>;
  }
  
  if (n.includes('café')) {
    return <span className="material-symbols-outlined text-[32px]">coffee_maker</span>;
  }
  
  if (n.includes('té')) {
    return <span className="material-symbols-outlined text-[32px]">emoji_food_beverage</span>;
  }
  
  if (n.includes('jugo')) {
    return <span className="material-symbols-outlined text-[32px]">blender</span>;
  }
  
  if (n.includes('yogur')) {
    return <span className="material-symbols-outlined text-[32px]">local_drink</span>;
  }
  
  if (n.includes('cerveza') || n.includes('alcohol')) {
    return <span className="material-symbols-outlined text-[32px]">sports_bar</span>;
  }
  
  if (n.includes('refresco')) {
    return <span className="material-symbols-outlined text-[32px]">local_drink</span>;
  }
  
  // Icono por defecto para otras bebidas
  return <span className="material-symbols-outlined text-[32px]">local_drink</span>;
};

const getBeverageColor = (nombre: string): string => {
  const n = nombre.toLowerCase();
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

export default function BeverageSelector({ bebidas, onSelect, isLoading }: BeverageSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {bebidas.map((bebida) => {
        const color = getBeverageColor(bebida.nombre);
        
        return (
          <button
            key={bebida.id}
            onClick={() => onSelect(bebida.id)}
            disabled={isLoading}
            className="aspect-square rounded-2xl bg-[#1A1A1A] flex flex-col items-center justify-center gap-3 p-4 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color }}
            >
              {getBeverageIcon(bebida.nombre)}
            </div>
            <span className="text-sm font-semibold text-center leading-tight">
              {bebida.nombre}
            </span>
          </button>
        );
      })}
    </div>
  );
}