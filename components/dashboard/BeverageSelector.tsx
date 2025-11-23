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
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
      </svg>
    );
  }
  
  if (n.includes('café')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M8.25 3v1.5L7.5 6v12a3 3 0 003 3h3a3 3 0 003-3V6l-.75-1.5V3h-7.5z" />
        <path d="M17.25 6h1.5a3 3 0 013 3v3a3 3 0 01-3 3h-1.5V6z" />
      </svg>
    );
  }
  
  if (n.includes('té')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
        <path d="M3.75 10.5a.75.75 0 000 1.5h6a.75.75 0 00.75-.75V3a.75.75 0 00-1.5 0v7.5h-5.25z" />
      </svg>
    );
  }
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
      <path d="M1.5 13.5a.75.75 0 01.75-.75h19.5a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75v-6.75z" clipRule="evenodd" />
    </svg>
  );
};

const getBeverageColor = (nombre: string): string => {
  const n = nombre.toLowerCase();
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
            className="aspect-square rounded-3xl flex flex-col items-center justify-center gap-2.5 p-4 text-white transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: color }}
          >
            {getBeverageIcon(bebida.nombre)}
            <span className="text-xs font-bold text-center leading-tight">
              {bebida.nombre}
            </span>
          </button>
        );
      })}
    </div>
  );
}