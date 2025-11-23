// components/dashboard/LogList.tsx
'use client';

import Link from 'next/link';
import { Registro } from '@/lib/dashboardService';
import { GlassIcon, CoffeeIcon } from '../layout/Icons';

interface LogListProps {
  registros: Registro[];
  showHistoryLink?: boolean; // Nueva prop para controlar la flecha
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

export default function LogList({ registros, showHistoryLink = true }: LogListProps) {
  return (
    <div className="w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 mt-2">
        <h3 className="text-lg font-bold text-white">Registro de bebidas</h3>
        
        {/* Solo mostramos el link si showHistoryLink es true */}
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

      {/* Empty State */}
      {registros.length === 0 && (
        <div className="text-center py-12 bg-[#1A1A1A] rounded-3xl border border-gray-800/50">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0F0F0F] flex items-center justify-center">
             <GlassIcon className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-white text-base font-semibold mb-1">¡Bebe agua ya mismo!</p>
          <p className="text-gray-500 text-sm">Sin registro de bebidas</p>
        </div>
      )}

      {/* List of Records */}
      <div className="space-y-3">
        {registros.map((registro, index) => {
          const color = getBeverageColor(registro.bebida.nombre);
          
          return (
            <div 
              key={registro.id}
              className="bg-[#1A1A1A] rounded-3xl p-4 flex items-center justify-between hover:bg-[#222] transition-all border border-gray-800/50 group"
              style={{ 
                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Left: Icon + Info */}
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg"
                  style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}40` }}
                >
                  {getBeverageIcon(registro.bebida.nombre)}
                </div>

                <div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-white font-bold text-lg">{registro.cantidadConsumidaMl}ml</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(registro.fechaHora).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })} • {registro.bebida.nombre}
                  </span>
                </div>
              </div>
              
              {/* Right: Type Indicator */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 font-medium hidden sm:block uppercase tracking-wider">
                  {registro.tipoRegistro}
                </span>
                
                {registro.tipoRegistro === 'MANUAL' ? (
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md transition-transform group-hover:rotate-12">
                    <span className="text-black font-bold text-lg">^_^</span>
                  </div>
                ) : (
                   <div className="relative w-9 h-9 flex items-center justify-center">
                     {/* Icono de digital/app */}
                     <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        <path className="text-primary" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                     </svg>
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}