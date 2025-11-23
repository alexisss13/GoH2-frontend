// ====================================
// DashboardHero.tsx - Hero mejorado con GIFs del oso
// ====================================
'use client';

import Image from 'next/image';

interface DashboardHeroProps {
  consumed: number;
  goal: number;
}

export default function DashboardHero({ consumed, goal }: DashboardHeroProps) {
  const percentage = goal > 0 ? (consumed / goal) * 100 : 0;
  
  // Determinar estado del hero basado en el consumo
  const getHeroState = () => {
    if (consumed === 0) return 'danger';
    if (percentage < 50) return 'warning';
    return 'success';
  };
  
  const state = getHeroState();
  
  const heroConfig = {
    danger: {
      bg: '#8B0000',
      icon: '🔥',
      bearImage: '/OsoPreocupadoBanner.gif',
      bearAlt: 'Oso preocupado - Sin consumo de agua'
    },
    warning: {
      bg: '#0097B2',
      icon: '☁️',
      bearImage: '/OsoNormalBanner.gif',
      bearAlt: 'Oso normal - Progreso moderado'
    },
    success: {
      bg: '#0097B2',
      icon: '☁️',
      bearImage: '/OsoFelizBanner.gif',
      bearAlt: 'Oso feliz - Excelente hidratación'
    }
  };
  
  const config = heroConfig[state];

  return (
    <div 
      className="relative w-full overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: config.bg }}
    >
      <div className="relative px-6 pt-6 pb-12">
        {/* Top Bar */}
        <div className="flex justify-between items-start mb-8">
          {/* Weather indicator */}
          <div className="flex items-center gap-2">
            <span className="text-4xl">{config.icon}</span>
            <div className="flex gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white/70 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </div>
          </div>

          {/* Connect Button */}
          <button className="bg-white hover:bg-white/95 text-[#0097B2] font-bold py-2 px-4 rounded-full flex items-center gap-2 text-sm shadow-lg transition-all active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.914-.143z" clipRule="evenodd" />
            </svg>
            <span>Conectar</span>
          </button>
        </div>

        {/* Main consumption display */}
        <div className="relative z-10 mb-4">
          <div className="flex items-baseline mb-1">
            <h1 className="text-7xl font-black leading-none tracking-tight text-white transition-all">
              {consumed}
            </h1>
            <span className="text-2xl font-medium ml-2 text-white opacity-90">ml</span>
          </div>
          <p className="text-sm font-medium text-white opacity-90">
            de {goal} ml establecidos
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mb-2 w-[75%]">

          <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <p className="text-sm font-semibold mt-2 text-white opacity-80">
            {percentage.toFixed(0)}% completado
          </p>
        </div>

        {/* Bear character - GIF animado */}
        <div className="absolute -bottom-4 -right-4 sm:-right-8 w-56 h-56 sm:w-64 sm:h-64 pointer-events-none transition-all duration-700">
          <Image
            src={config.bearImage}
            alt={config.bearAlt}
            width={280}
            height={280}
            className="object-contain drop-shadow-2xl"
            priority
            unoptimized // Importante para que los GIFs se animen correctamente
          />
        </div>
      </div>

      {/* Rounded bottom corner */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-black rounded-t-[32px]"></div>
    </div>
  );
}