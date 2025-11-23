// components/summary/WeeklyChart.tsx
'use client';

interface DayData {
  day: string;     // "Lun", "Mar", etc.
  amount: number;  // ml consumidos
  goal: number;    // meta del día (usualmente 2000 o calculado)
  date: string;    // YYYY-MM-DD
}

interface WeeklyChartProps {
  data: DayData[];
  isLoading: boolean;
}

export default function WeeklyChart({ data, isLoading }: WeeklyChartProps) {
  // Encontramos el valor máximo para escalar las barras (mínimo 2500ml para que no se vea gigante si bebiste poco)
  const maxVal = Math.max(2500, ...data.map(d => d.amount));

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-[#1A1A1A] rounded-3xl animate-pulse flex items-end justify-around p-6 border border-gray-800">
         {[...Array(7)].map((_, i) => (
           <div key={i} className="w-8 bg-gray-800 rounded-t-lg" style={{ height: `${Math.random() * 40 + 20}%` }}></div>
         ))}
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] rounded-[32px] p-6 sm:p-8 border border-gray-800/50 shadow-xl relative overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="flex justify-between items-end mb-6 relative z-10">
         <div>
           <h3 className="text-white text-lg font-bold">Hidratación Semanal</h3>
           <p className="text-gray-400 text-xs">Últimos 7 días</p>
         </div>
         {/* Leyenda simple */}
         <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span>Consumo</span>
         </div>
      </div>

      {/* Área del Gráfico */}
      <div className="h-52 flex items-end justify-between gap-2 sm:gap-4 relative z-10">
        {/* Líneas de guía de fondo (opcional, para referencia visual) */}
        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-gray-600 pointer-events-none">
             <div className="border-b border-gray-800/50 w-full h-0 flex items-center"></div>
             <div className="border-b border-gray-800/50 w-full h-0 flex items-center"></div>
             <div className="border-b border-gray-800/50 w-full h-0 flex items-center"></div>
             <div className="border-b border-gray-800/0 w-full h-0"></div> 
        </div>

        {data.map((day, index) => {
          // Calculamos altura relativa
          const heightPercentage = (day.amount / maxVal) * 100;
          const isGoalMet = day.amount >= day.goal;
          
          return (
            <div key={day.date} className="flex flex-col items-center flex-1 h-full justify-end group">
              
              {/* Tooltip (Hover) */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none mb-1 z-20 whitespace-nowrap border border-gray-700">
                {day.amount} ml
              </div>

              {/* Barra */}
              <div className="w-full max-w-[30px] relative h-full flex items-end rounded-t-xl bg-gray-800/30 overflow-hidden">
                 {/* Barra de progreso animada */}
                 <div 
                    className={`w-full rounded-t-lg transition-all duration-1000 ease-out relative ${
                        isGoalMet ? 'bg-gradient-to-t from-primary to-primary-light' : 'bg-gradient-to-t from-gray-700 to-gray-600'
                    }`}
                    style={{ height: `${heightPercentage}%`, animationDelay: `${index * 100}ms` }}
                 >
                    {/* Brillo superior */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20"></div>
                 </div>
              </div>

              {/* Etiqueta Día */}
              <span className={`text-xs mt-3 font-medium ${isToday(day.date) ? 'text-white' : 'text-gray-500'}`}>
                {day.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function isToday(dateStr: string) {
    const today = new Date().toISOString().split('T')[0];
    return dateStr === today;
}