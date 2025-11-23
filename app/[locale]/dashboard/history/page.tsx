// app/[locale]/dashboard/history/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { dashboardService, Registro, Bebida } from '@/lib/dashboardService';
import LogList from '@/components/dashboard/LogList';
import DashboardLayout from '@/components/layout/DashboardLayout';
import BeverageSelector from '@/components/dashboard/BeverageSelector';
import { Button } from '@/components/ui/Button';

// --- Iconos ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);
const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);
const BackArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
);
const WaterDropIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
        <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
    </svg>
);

export default function HistoryPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  
  // Datos
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [totalDia, setTotalDia] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);

  // Modal States
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBebidaId, setSelectedBebidaId] = useState<string | null>(null);
  const [amount, setAmount] = useState(250);
  const [isAdding, setIsAdding] = useState(false);

  // Helpers
  const formatDateForApi = (date: Date) => date.toISOString().split('T')[0];
  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();

  const getDisplayDate = (date: Date) => {
    if (isToday(date)) return 'Hoy';
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // Fetch de datos
  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const dateStr = formatDateForApi(currentDate);
        
        // Cargamos registros Y bebidas (para el modal)
        const [data, bebidasData] = await Promise.all([
             dashboardService.getRegistros(token, dateStr),
             dashboardService.getBebidas(token)
        ]);

        setRegistros(data.registros);
        setTotalDia(data.totalAporteDia);
        setBebidas(bebidasData);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setIsAnimating(false);
      }
    };

    fetchData();
  }, [token, currentDate, router]);

  // Cambio de fecha
  const changeDate = (days: number) => {
    setIsAnimating(true);
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Apertura de modal
  const handleAddClick = () => {
    setIsModalOpen(true);
    setSelectedBebidaId(null);
    setAmount(250);
  };

  // Guardar registro
  const handleConfirmAdd = async () => {
    if (!selectedBebidaId || !token) return;
    setIsAdding(true);
    try {
       // Usamos la fecha actual del historial (currentDate) pero con la hora actual
       const targetDate = new Date(currentDate);
       const now = new Date();
       targetDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

       await dashboardService.createRegistro({
        bebidaId: selectedBebidaId,
        cantidadConsumidaMl: amount,
        tipoRegistro: 'MANUAL',
        fechaHora: targetDate.toISOString(), // Importante para que aparezca en este día
       }, token);
       
       // Recargar datos del día
       const dateStr = formatDateForApi(currentDate);
       const data = await dashboardService.getRegistros(token, dateStr);
       setRegistros(data.registros);
       setTotalDia(data.totalAporteDia);
       
       setIsModalOpen(false);
    } catch(e) {
        alert('Error al guardar');
    } finally {
        setIsAdding(false);
    }
  };


  const isFuture = isToday(currentDate);

  return (
    // Pasamos nuestro handler local al Layout
    <DashboardLayout onAddClick={handleAddClick}>
      <div className="min-h-screen lg:min-h-0 text-white font-sans pb-24 lg:pb-0">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-20 -mx-4 px-4 border-b border-gray-800">
            <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-800 text-gray-300">
                <BackArrow />
            </button>
            <span className="font-bold text-lg">Historial</span>
            <div className="w-10" />
        </div>

        {/* Desktop Title */}
        <div className="hidden lg:block mb-8">
             
             <h1 className="text-3xl font-bold">Historial de Hidratación</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            {/* COLUMNA IZQUIERDA */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-8">
                
                <div className="flex items-center justify-between bg-[#1A1A1A] rounded-full p-1.5 border border-gray-800 shadow-sm">
                    <button onClick={() => changeDate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-all active:scale-90">
                        <ChevronLeft />
                    </button>
                    
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-200 capitalize">
                        <CalendarIcon />
                        {getDisplayDate(currentDate)}
                    </div>

                    <button onClick={() => changeDate(1)} disabled={isFuture} className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-90 ${isFuture ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}>
                        <ChevronRight />
                    </button>
                </div>

                <div className={`relative overflow-hidden rounded-[32px] bg-gradient-to-b from-gray-900 to-black border border-gray-800 transition-all duration-300 ${isAnimating ? 'opacity-70 scale-[0.98]' : 'opacity-100 scale-100'}`}>
                    <div className="absolute inset-0 bg-primary/10 opacity-50 blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10 p-8 flex flex-col items-center text-center py-12">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,151,178,0.4)] mb-4">
                            <WaterDropIcon />
                        </div>
                        
                        <div className="space-y-1">
                            <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tight">
                                {loading ? '...' : totalDia}
                                <span className="text-2xl lg:text-3xl font-medium text-primary ml-1">ml</span>
                            </h2>
                            <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">
                                Total consumido
                            </p>
                        </div>

                        {totalDia >= 2000 && !loading && (
                             <div className="mt-6 px-4 py-1.5 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30 animate-pulse">
                                ¡Objetivo cumplido! 🎉
                             </div>
                        )}
                    </div>
                </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="lg:col-span-7 xl:col-span-8">
                 <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-60">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                            <p className="text-sm text-gray-400">Cargando registros...</p>
                        </div>
                    ) : (
                        <LogList registros={registros} showHistoryLink={false} />
                    )}
                 </div>
            </div>

        </div>
      </div>

      {/* === MODAL DE REGISTRO (Reutilizado) === */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center animate-fade-in p-0 sm:p-4">
          <div className="bg-[#1A1A1A] w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 border-t sm:border border-gray-800 shadow-2xl relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="mb-6 mt-2 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-white">
                    {!selectedBebidaId ? 'Elige una bebida' : '¿Cuánto bebiste?'}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                    {/* Mensaje contextual de fecha */}
                    Para el día: <span className="text-primary font-bold">{getDisplayDate(currentDate)}</span>
                </p>
            </div>

            {!selectedBebidaId && (
                <div className="py-2">
                    <BeverageSelector bebidas={bebidas} onSelect={setSelectedBebidaId} isLoading={false} />
                </div>
            )}

            {selectedBebidaId && (
                <div className="space-y-8 animate-slide-up py-4">
                    <div className="flex items-center justify-center gap-8">
                        <button onClick={() => setAmount(Math.max(50, amount - 50))} className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-700 text-white text-2xl font-bold transition-colors">-</button>
                        <div className="text-center w-32">
                            <span className="text-5xl font-black text-primary tracking-tighter">{amount}</span>
                            <div className="text-sm text-gray-400 font-medium mt-1">ml</div>
                        </div>
                        <button onClick={() => setAmount(amount + 50)} className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-700 text-white text-2xl font-bold transition-colors">+</button>
                    </div>
                    
                    <div className="flex justify-center gap-3">
                        {[250, 350, 500].map(val => (
                            <button key={val} onClick={() => setAmount(val)} className={`px-3 py-1 rounded-full text-xs font-medium border ${amount === val ? 'bg-primary border-primary text-black' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>{val}ml</button>
                        ))}
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                         <Button variant="secondary" onClick={() => setSelectedBebidaId(null)}>Cambiar</Button>
                         <Button variant="primary" onClick={handleConfirmAdd} isLoading={isAdding}>CONFIRMAR</Button>
                    </div>
                </div>
            )}
          </div>
        </div>
      )}

    </DashboardLayout>
  );
}