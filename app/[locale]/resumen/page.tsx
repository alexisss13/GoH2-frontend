// app/[locale]/resumen/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { dashboardService } from '@/lib/dashboardService';
import WeeklyChart from '@/components/summary/WeeklyChart';
import StatsGrid from '@/components/summary/StatsGrid';

// Tipos para el gráfico
interface DayData {
  day: string;
  amount: number;
  goal: number;
  date: string;
}

export default function ResumePage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  
  const [weeklyData, setWeeklyData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estadísticas agregadas
  const [avgDaily, setAvgDaily] = useState(0);
  const [totalWeekly, setTotalWeekly] = useState(0);
  const [completionRate, setCompletionRate] = useState(0);

  // Función auxiliar para obtener los últimos 7 días
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d);
    }
    return dates;
  };

  useEffect(() => {
    if (!token) {
      router.replace('/login');
      return;
    }

    const fetchWeeklyData = async () => {
      setLoading(true);
      try {
        const last7Days = getLast7Days();
        
        // 1. Fetch de los 7 días en paralelo
        const promises = last7Days.map(date => {
            const dateStr = date.toISOString().split('T')[0];
            return dashboardService.getRegistros(token, dateStr)
                .then(res => ({
                    date: dateStr,
                    amount: res.totalAporteDia,
                    // Por ahora usamos 2000 como meta base si no la tenemos, 
                    // idealmente vendría del backend histórico pero esto funciona para la demo.
                    goal: 2000, 
                    dayName: date.toLocaleDateString('es-ES', { weekday: 'short' })
                }));
        });

        const results = await Promise.all(promises);

        // 2. Procesar datos para el gráfico
        const chartData: DayData[] = results.map(r => ({
            day: r.dayName.charAt(0).toUpperCase() + r.dayName.slice(1), // Capitalizar "lun" -> "Lun"
            amount: r.amount,
            goal: r.goal,
            date: r.date
        }));
        
        setWeeklyData(chartData);

        // 3. Calcular estadísticas
        const total = results.reduce((acc, curr) => acc + curr.amount, 0);
        setTotalWeekly(total);
        setAvgDaily(total / 7);
        
        const daysMet = results.filter(r => r.amount >= r.goal).length;
        setCompletionRate((daysMet / 7) * 100);

      } catch (error) {
        console.error("Error fetching weekly stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, [token, router]);

  return (
    <DashboardLayout onAddClick={() => router.push('/dashboard')}>
        
        <div className="min-h-screen lg:min-h-0 text-white font-sans space-y-8 pb-24 lg:pb-0">
            
             {/* Header solo para desktop, en móvil el bottom nav orienta */}
             <div className="hidden lg:block mb-6">
                <h1 className="text-3xl font-bold">Resumen de Actividad</h1>
                <p className="text-gray-400">Tu progreso de hidratación esta semana</p>
            </div>

            {/* Mobile Title */}
            <div className="lg:hidden flex items-center gap-4 pt-4 mb-6">
                <button onClick={() => router.back()} className="p-2 -ml-2 text-gray-400 hover:text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
                </button>
                <h1 className="text-2xl font-bold">Resumen</h1>
            </div>

            {/* 1. Tarjetas de Estadísticas */}
            <section>
                <StatsGrid 
                    avgDaily={avgDaily} 
                    completionRate={completionRate} 
                    totalWeekly={totalWeekly} 
                    isLoading={loading} 
                />
            </section>

            {/* 2. Gráfico Principal */}
            <section>
                <WeeklyChart data={weeklyData} isLoading={loading} />
            </section>
            
            {/* 3. Insights / Tip (Opcional para rellenar espacio y dar valor) */}
            {!loading && (
                <div className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-full text-blue-400 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-100 text-sm mb-1">Insight de la semana</h4>
                        <p className="text-blue-200/70 text-xs leading-relaxed">
                            {avgDaily >= 1500 
                                ? "¡Vas muy bien! Tu promedio de hidratación es estable. Mantén este ritmo para mejorar tu energía diaria."
                                : "Parece que esta semana ha sido baja en hidratación. Intenta tener una botella de agua cerca mientras trabajas."
                            }
                        </p>
                    </div>
                </div>
            )}

        </div>
    </DashboardLayout>
  );
}