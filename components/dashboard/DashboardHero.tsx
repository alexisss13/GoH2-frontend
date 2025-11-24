// ====================================
// DashboardHero.tsx - Hero mejorado con Material Symbols
// ====================================
'use client';

import Image from 'next/image';

interface DashboardHeroProps {
  consumed: number;
  goal: number;
}

export default function DashboardHero({ consumed, goal }: DashboardHeroProps) {
  const percentage = goal > 0 ? Math.min((consumed / goal) * 100, 100) : 0;
  
  // Determinar estado del hero basado en el consumo
  const getHeroState = () => {
    if (consumed === 0) return 'danger';
    if (percentage < 50) return 'warning';
    if (percentage >= 100) return 'complete';
    return 'success';
  };
  
  const state = getHeroState();
  
  const heroConfig = {
    danger: {
      gradient: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #B22222 100%)',
      overlay: 'radial-gradient(circle at 20% 50%, rgba(220, 20, 60, 0.3) 0%, transparent 50%)',
      bearImage: '/OsoPreocupadoBanner.gif',
      bearAlt: 'Oso preocupado - Sin consumo de agua',
      particles: 'fire',
      message: '¡Es hora de hidratarse!'
    },
    warning: {
      gradient: 'linear-gradient(135deg, #006B7D 0%, #0097B2 50%, #00B4D8 100%)',
      overlay: 'radial-gradient(circle at 80% 20%, rgba(0, 180, 216, 0.4) 0%, transparent 60%)',
      bearImage: '/OsoNormalBanner.gif',
      bearAlt: 'Oso normal - Progreso moderado',
      particles: 'bubbles',
      message: '¡Vas por buen camino!'
    },
    success: {
      gradient: 'linear-gradient(135deg, #0097B2 0%, #00B4D8 50%, #48CAE4 100%)',
      overlay: 'radial-gradient(circle at 30% 80%, rgba(144, 224, 239, 0.3) 0%, transparent 50%)',
      bearImage: '/OsoFelizBanner.gif',
      bearAlt: 'Oso feliz - Excelente hidratación',
      particles: 'bubbles',
      message: '¡Excelente progreso!'
    },
    complete: {
      gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
      overlay: 'radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.4) 0%, transparent 70%)',
      bearImage: '/OsoFelizBanner.gif',
      bearAlt: 'Oso celebrando - Meta alcanzada',
      particles: 'celebration',
      message: '¡META ALCANZADA!'
    }
  };
  
  const config = heroConfig[state];

  return (
    <div 
      className="relative w-full overflow-hidden transition-all duration-700"
      style={{ background: config.gradient }}
    >
      {/* Overlay decorativo con gradiente radial */}
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{ background: config.overlay }}
      ></div>

      {/* Patrón de ondas sutiles */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="waves" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 Q 25 40, 50 50 T 100 50" fill="none" stroke="white" strokeWidth="1"/>
              <path d="M0 60 Q 25 50, 50 60 T 100 60" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>

      {/* Burbujas decorativas flotantes (estados success y warning) */}
      {config.particles === 'bubbles' && (
        <>
          <div className="absolute top-10 left-[15%] w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm animate-float"></div>
          <div className="absolute top-32 left-[8%] w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm animate-float-delayed"></div>
          <div className="absolute top-20 right-[25%] w-12 h-12 rounded-full bg-white/8 backdrop-blur-sm animate-float-slow"></div>
        </>
      )}

      {/* Partículas de fuego (estado danger) */}
      {config.particles === 'fire' && (
        <>
          <div className="absolute top-16 left-[10%] w-3 h-3 rounded-full bg-orange-400/60 animate-spark"></div>
          <div className="absolute top-28 left-[20%] w-2 h-2 rounded-full bg-yellow-300/50 animate-spark-delayed"></div>
          <div className="absolute top-20 left-[15%] w-4 h-4 rounded-full bg-red-400/40 animate-spark-slow"></div>
        </>
      )}

      {/* Confeti con Material Symbols (estado complete) */}
      {config.particles === 'celebration' && (
        <>
          <span className="material-symbols-outlined absolute top-12 left-[12%] text-4xl text-yellow-200 animate-celebration" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
            star
          </span>
          <span className="material-symbols-outlined absolute top-24 left-[25%] text-3xl text-pink-200 animate-celebration-delayed" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
            celebration
          </span>
          <span className="material-symbols-outlined absolute top-16 right-[20%] text-4xl text-blue-200 animate-celebration-slow" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
            auto_awesome
          </span>
          <span className="material-symbols-outlined absolute top-28 right-[35%] text-3xl text-purple-200 animate-celebration" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
            trophy
          </span>
          <span className="material-symbols-outlined absolute top-20 left-[45%] text-2xl text-orange-200 animate-celebration-delayed" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
            grade
          </span>
          <span className="material-symbols-outlined absolute top-36 left-[60%] text-3xl text-green-200 animate-celebration-slow" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>
            emoji_events
          </span>
        </>
      )}

      <div className="relative px-6 pt-6 pb-12 z-10">
        {/* Mensaje motivacional */}
        {state === 'complete' && (
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white drop-shadow-2xl animate-pulse-scale">
              {config.message}
            </h2>
          </div>
        )}

        {/* Main consumption display */}
        <div className="relative z-10 mb-6">
          <div className="flex items-baseline mb-2">
            <h1 className={`text-7xl font-black leading-none tracking-tight text-white transition-all drop-shadow-2xl ${state === 'complete' ? 'animate-bounce-subtle' : ''}`}>
              {consumed}
            </h1>
            <span className="text-2xl font-medium ml-2 text-white/95 drop-shadow-lg">ml</span>
          </div>
          <p className="text-sm font-medium text-white/90 drop-shadow-md">
            de {goal} ml establecidos
          </p>
        </div>

        {/* Progress bar con efecto glass y animaciones mejoradas */}
        <div className="relative z-10 mb-2 w-[75%]">
          <div className="bg-white/20 backdrop-blur-md rounded-full h-3 overflow-hidden shadow-lg border border-white/30 relative">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out shadow-inner relative overflow-hidden ${
                state === 'complete' 
                  ? 'bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300' 
                  : 'bg-gradient-to-r from-white via-white/95 to-white/90'
              }`}
              style={{ width: `${percentage}%` }}
            >
              {/* Efecto de brillo animado cuando está completo */}
              {state === 'complete' && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-fast"></div>
                  <div className="absolute inset-0 animate-pulse-glow"></div>
                </>
              )}
            </div>
            
            {/* Partículas que salen de la barra cuando está completa */}
            {state === 'complete' && (
              <>
                <span className="material-symbols-outlined absolute -top-6 left-[10%] text-lg text-yellow-300 animate-sparkle-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                <span className="material-symbols-outlined absolute -top-8 left-[30%] text-sm text-yellow-200 animate-sparkle-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                <span className="material-symbols-outlined absolute -top-7 left-[50%] text-base text-yellow-400 animate-sparkle-3" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                <span className="material-symbols-outlined absolute -top-9 left-[70%] text-lg text-yellow-300 animate-sparkle-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
                <span className="material-symbols-outlined absolute -top-6 left-[90%] text-sm text-yellow-200 animate-sparkle-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                  stars
                </span>
              </>
            )}
          </div>
          <p className={`text-sm font-semibold mt-3 text-white/90 drop-shadow-md ${state === 'complete' ? 'animate-pulse-scale' : ''}`}>
            {percentage.toFixed(0)}% completado
          </p>
        </div>

        {/* Mensaje de estado */}
        {state !== 'complete' && (
          <p className="text-xs font-medium text-white/80 drop-shadow-md mt-2">
            {config.message}
          </p>
        )}

      </div>

      {/* Bear character - GIF animado (debajo del rounded corner) */}
      <div className={`absolute -bottom-4 -right-4 sm:-right-8 w-56 h-56 sm:w-64 sm:h-64 pointer-events-none transition-all duration-700 z-10 ${state === 'complete' ? 'animate-wiggle' : ''}`}>
        <Image
          src={config.bearImage}
          alt={config.bearAlt}
          width={280}
          height={280}
          className="object-contain drop-shadow-2xl"
          priority
          unoptimized
        />
      </div>

      {/* Rounded bottom corner (encima del oso) */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-black rounded-t-[32px] z-20"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes spark {
          0% { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(-40px); opacity: 0; }
        }

        @keyframes spark-delayed {
          0% { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(-35px); opacity: 0; }
        }

        @keyframes spark-slow {
          0% { transform: translateY(0px); opacity: 1; }
          100% { transform: translateY(-30px); opacity: 0; }
        }

        @keyframes celebration {
          0% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(60px) rotate(360deg) scale(0.5); opacity: 0; }
        }

        @keyframes celebration-delayed {
          0% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(70px) rotate(-360deg) scale(0.5); opacity: 0; }
        }

        @keyframes celebration-slow {
          0% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 1; }
          100% { transform: translateY(55px) rotate(180deg) scale(0.5); opacity: 0; }
        }

        @keyframes shimmer-fast {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.6); }
        }

        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }

        @keyframes sparkle-1 {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(-25px) scale(1.2); opacity: 0; }
        }

        @keyframes sparkle-2 {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(-30px) scale(1); opacity: 0; }
        }

        @keyframes sparkle-3 {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(-28px) scale(1.3); opacity: 0; }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 1s;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite 2s;
        }

        .animate-spark {
          animation: spark 3s ease-out infinite;
        }

        .animate-spark-delayed {
          animation: spark-delayed 3.5s ease-out infinite 0.5s;
        }

        .animate-spark-slow {
          animation: spark-slow 4s ease-out infinite 1s;
        }

        .animate-celebration {
          animation: celebration 2.5s ease-out infinite;
        }

        .animate-celebration-delayed {
          animation: celebration-delayed 3s ease-out infinite 0.5s;
        }

        .animate-celebration-slow {
          animation: celebration-slow 3.5s ease-out infinite 1s;
        }

        .animate-shimmer-fast {
          animation: shimmer-fast 1.5s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }

        .animate-sparkle-1 {
          animation: sparkle-1 2s ease-out infinite;
        }

        .animate-sparkle-2 {
          animation: sparkle-2 2.3s ease-out infinite 0.3s;
        }

        .animate-sparkle-3 {
          animation: sparkle-3 2.6s ease-out infinite 0.6s;
        }
      `}</style>
    </div>
  );
}