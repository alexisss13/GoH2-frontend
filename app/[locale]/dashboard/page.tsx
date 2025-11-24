// app/[locale]/dashboard/page.tsx - Con gradiente dinámico mejorado
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from '@/navigation';
import { dashboardService, ResumenDiario, Bebida, Registro } from '@/lib/dashboardService';
import DashboardHero from '@/components/dashboard/DashboardHero';
import LogList from '@/components/dashboard/LogList';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BeverageSelector from '@/components/dashboard/BeverageSelector';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const [resumen, setResumen] = useState<ResumenDiario>({ consumidoMl: 0, objetivoMl: 2000 });
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBebidaId, setSelectedBebidaId] = useState<string | null>(null);
  const [amount, setAmount] = useState(250);
  const [isAdding, setIsAdding] = useState(false);

  // Determinar el estado basado en el consumo (igual que en DashboardHero)
  const getBackgroundGradient = () => {
    const percentage = resumen.objetivoMl > 0 ? Math.min((resumen.consumidoMl / resumen.objetivoMl) * 100, 100) : 0;
    
    if (resumen.consumidoMl === 0) {
      // Danger - Rojo intenso con efecto calor
      return 'linear-gradient(to bottom, #8B0000 0%, #DC143C 15%, #B22222 30%, #000000 70%, #000000 100%)';
    }
    if (percentage < 50) {
      // Warning - Azul oscuro profundo
      return 'linear-gradient(to bottom, #004A5E 0%, #006B7D 15%, #008099 30%, #000000 70%, #000000 100%)';
    }
    if (percentage >= 100) {
      // Complete - Dorado radiante
      return 'linear-gradient(to bottom, #D4AF37 0%, #FFD700 15%, #FFA500 30%, #000000 70%, #000000 100%)';
    }
    // Success - Azul vibrante
    return 'linear-gradient(to bottom, #007C91 0%, #0097B2 15%, #00B4D8 30%, #000000 70%, #000000 100%)';
  };

  // Efecto de partículas dinámicas basado en el estado
  const getParticleEffect = () => {
    const percentage = resumen.objetivoMl > 0 ? Math.min((resumen.consumidoMl / resumen.objetivoMl) * 100, 100) : 0;
    
    if (resumen.consumidoMl === 0) {
      return (
        <>
          {/* Partículas de calor/fuego */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-orange-400/60 animate-float-slow"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-red-400/50 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-yellow-300/40 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-orange-500/60 animate-float-slow"></div>
        </>
      );
    }
    if (percentage < 50) {
      return (
        <>
          {/* Burbujas azules */}
          <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-cyan-400/30 animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-blue-300/20 animate-float-delayed"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 rounded-full bg-teal-400/25 animate-float-slow"></div>
        </>
      );
    }
    if (percentage >= 100) {
      return (
        <>
          {/* Partículas doradas de celebración */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-yellow-300/60 animate-sparkle-1"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-amber-400/50 animate-sparkle-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-orange-300/70 animate-sparkle-3"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 rounded-full bg-yellow-200/60 animate-sparkle-1"></div>
        </>
      );
    }
    // Success - Más burbujas
    return (
      <>
        <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-cyan-300/40 animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-blue-200/30 animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-5 h-5 rounded-full bg-teal-300/25 animate-float-slow"></div>
      </>
    );
  };

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const [resData, regsData, bebsData] = await Promise.all([
          dashboardService.getResumenHoy(token),
          dashboardService.getRegistros(token),
          dashboardService.getBebidas(token)
        ]);
        setResumen(resData);
        setRegistros(regsData.registros);
        setBebidas(bebsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, router]);

  const handleAddClick = () => {
    setIsModalOpen(true);
    setSelectedBebidaId(null);
    setAmount(250);
  };

  const handleConfirmAdd = async () => {
    if (!selectedBebidaId || !token) return;
    setIsAdding(true);
    try {
      await dashboardService.createRegistro({
        bebidaId: selectedBebidaId,
        cantidadConsumidaMl: amount,
        tipoRegistro: 'MANUAL'
      }, token);

      const [newRes, newRegs] = await Promise.all([
        dashboardService.getResumenHoy(token),
        dashboardService.getRegistros(token)
      ]);
      setResumen(newRes);
      setRegistros(newRegs.registros);
      setIsModalOpen(false);
      setSelectedBebidaId(null);
    } catch (e) {
      alert('Error al guardar');
    } finally {
      setIsAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-primary text-lg font-semibold animate-pulse">Cargando...</div>
      </div>
    );
  }

  return (
    <DashboardLayout onAddClick={handleAddClick}>
      {/* Fondo con gradiente dinámico mejorado - ocupa toda la pantalla */}
      <div 
        className="fixed inset-0 -z-10 transition-all duration-1000"
        style={{ background: getBackgroundGradient() }}
      >
        {/* Efectos de partículas dinámicas */}
        {getParticleEffect()}
        
        {/* Overlay sutil para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/20"></div>
      </div>

      <div className="flex flex-col relative z-10">
        {/* Hero Section */}
        <DashboardHero
          consumed={resumen.consumidoMl}
          goal={resumen.objetivoMl}
        />

        {/* Lista de Registros */}
        <LogList registros={registros} />
      </div>

      {/* Modal de Añadir */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-[#0F0F0F] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-[#333] shadow-2xl relative overflow-hidden animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Divider superior móvil */}
            <div className="w-12 h-1 bg-[#333] rounded-full mx-auto mb-6 sm:hidden"></div>

            {/* Close Button - Solo desktop */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="hidden sm:block absolute top-5 right-5 p-2.5 bg-[#1A1A1A] hover:bg-[#222] rounded-2xl text-[#999] hover:text-white transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-6 mt-2">
              <h2 className="text-2xl font-bold text-white mb-1">
                {!selectedBebidaId ? 'Selecciona una bebida' : '¿Cuánto bebiste?'}
              </h2>
              <p className="text-[#999] text-sm">
                {!selectedBebidaId
                  ? 'Elige tu bebida favorita'
                  : `${amount} ml de hidratación`
                }
              </p>
            </div>

            {/* Paso 1: Seleccionar Bebida */}
            {!selectedBebidaId && (
              <div className="py-2">
                <BeverageSelector
                  bebidas={bebidas}
                  onSelect={setSelectedBebidaId}
                  isLoading={false}
                />
              </div>
            )}

            {/* Paso 2: Seleccionar Cantidad */}
            {selectedBebidaId && (
              <div className="space-y-6 py-4">
                {/* Controles de cantidad */}
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setAmount(Math.max(50, amount - 50))}
                    className="w-14 h-14 rounded-2xl bg-[#1A1A1A] hover:bg-[#222] text-white text-3xl font-bold transition-all active:scale-95 flex items-center justify-center border border-[#333]"
                  >
                    −
                  </button>

                  <div className="text-center min-w-[120px]">
                    <div className="text-6xl font-black text-[#0097B2] tracking-tight">{amount}</div>
                    <div className="text-sm text-[#999] font-medium mt-1">mililitros</div>
                  </div>

                  <button
                    onClick={() => setAmount(amount + 50)}
                    className="w-14 h-14 rounded-2xl bg-[#1A1A1A] hover:bg-[#222] text-white text-3xl font-bold transition-all active:scale-95 flex items-center justify-center border border-[#333]"
                  >
                    +
                  </button>
                </div>

                {/* Presets rápidos */}
                <div className="flex justify-center gap-3">
                  {[250, 350, 500].map(val => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`px-5 py-2.5 rounded-2xl text-sm font-bold border-2 transition-all ${amount === val
                          ? 'bg-[#0097B2] border-[#0097B2] text-white'
                          : 'border-[#333] text-[#999] hover:border-[#666] hover:text-white'
                        }`}
                    >
                      {val}ml
                    </button>
                  ))}
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedBebidaId(null)}
                    className="flex-1 bg-[#1A1A1A] hover:bg-[#222] text-white font-bold py-4 rounded-2xl transition-all active:scale-95 border border-[#333]"
                  >
                    Cambiar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleConfirmAdd}
                    isLoading={isAdding}
                    className="flex-1 bg-[#0097B2] hover:bg-[#00B8D4] text-white font-bold py-4 rounded-2xl transition-all active:scale-95"
                  >
                    AÑADIR
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-15px) rotate(90deg); opacity: 0.9; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.5; }
          50% { transform: translateY(-25px) scale(1.1); opacity: 0.8; }
        }

        @keyframes sparkle-1 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-40px) scale(1.5); opacity: 0; }
        }

        @keyframes sparkle-2 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 0.7; }
          100% { transform: translateY(-35px) scale(1.3); opacity: 0; }
        }

        @keyframes sparkle-3 {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
          40% { opacity: 1; }
          60% { opacity: 0.8; }
          100% { transform: translateY(-45px) scale(1.4); opacity: 0; }
        }

        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite 2s;
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite 1s;
        }

        .animate-sparkle-1 {
          animation: sparkle-1 4s ease-out infinite;
        }

        .animate-sparkle-2 {
          animation: sparkle-2 5s ease-out infinite 1s;
        }

        .animate-sparkle-3 {
          animation: sparkle-3 6s ease-out infinite 2s;
        }
      `}</style>
    </DashboardLayout>
  );
}