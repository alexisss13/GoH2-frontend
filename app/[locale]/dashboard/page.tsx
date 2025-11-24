// ====================================
// 1. app/[locale]/dashboard/page.tsx
// ====================================
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

      <div className="flex flex-col">
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

  .animate-slide-up {
    animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }
`}</style>
    </DashboardLayout>
  );
}