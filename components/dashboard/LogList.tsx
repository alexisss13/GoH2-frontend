// ====================================
// LogList.tsx - Lista mejorada
// ====================================
'use client';

import { Registro } from '@/lib/dashboardService';

interface LogListProps {
  registros: Registro[];
}

const getBeverageIcon = (name: string) => {
  const n = name.toLowerCase();
  
  if (n.includes('agua')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
      </svg>
    );
  }
  
  if (n.includes('café')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M8.25 3v1.5L7.5 6v12a3 3 0 003 3h3a3 3 0 003-3V6l-.75-1.5V3h-7.5z" />
        <path d="M17.25 6h1.5a3 3 0 013 3v3a3 3 0 01-3 3h-1.5V6z" />
      </svg>
    );
  }
  
  if (n.includes('té')) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
        <path d="M3.75 10.5a.75.75 0 000 1.5h6a.75.75 0 00.75-.75V3a.75.75 0 00-1.5 0v7.5h-5.25z" />
      </svg>
    );
  }
  
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
      <path d="M1.5 13.5a.75.75 0 01.75-.75h19.5a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75v-6.75z" clipRule="evenodd" />
    </svg>
  );
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

export default function LogList({ registros }: LogListProps) {
  return (
    <div className="w-full px-6 pb-32 lg:pb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 mt-8">
        <h3 className="text-xl font-bold text-white">Registro de bebidas</h3>
        <button className="text-white/70 hover:text-white transition-colors p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>

      {/* Empty State */}
      {registros.length === 0 && (
        <div className="text-center py-12 bg-[#1A1A1A] rounded-3xl border border-[#333]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0F0F0F] flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#666]">
              <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-white text-base font-semibold mb-1">¡Bebe agua ya mismo!</p>
          <p className="text-[#666] text-sm">Sin registro de bebidas</p>
        </div>
      )}

      {/* List of Records */}
      <div className="space-y-3">
        {registros.map((registro, index) => {
          const color = getBeverageColor(registro.bebida.nombre);
          
          return (
            <div 
              key={registro.id}
              className="bg-[#1A1A1A] rounded-3xl p-4 flex items-center justify-between hover:bg-[#222] transition-all border border-[#333] group"
              style={{ 
                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
              }}
            >
              {/* Left: Icon + Info */}
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  {getBeverageIcon(registro.bebida.nombre)}
                </div>

                <div>
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-white font-bold text-lg">{registro.cantidadConsumidaMl}ml</span>
                  </div>
                  <span className="text-[#999] text-sm">
                    {new Date(registro.fechaHora).toLocaleTimeString('es-ES', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
              
              {/* Right: Type Indicator */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#999] font-medium hidden sm:block">
                  {registro.tipoRegistro === 'MANUAL' ? 'Manual' : 'Digital'}
                </span>
                
                {/* Visual Indicator */}
                {registro.tipoRegistro === 'MANUAL' ? (
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="relative w-10 h-10 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle className="text-[#333]" cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" />
                      <circle 
                        className="transition-all duration-500"
                        cx="18" 
                        cy="18" 
                        r="15" 
                        fill="none" 
                        stroke={color}
                        strokeWidth="3" 
                        strokeDasharray="75, 100"
                        strokeLinecap="round"
                      />
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
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
