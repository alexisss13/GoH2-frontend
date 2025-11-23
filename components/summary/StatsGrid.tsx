// components/summary/StatsGrid.tsx
'use client';

import { ChartBarIcon, BoltIcon } from '../layout/Icons'; // Asumiendo que Bolt es un rayo para la racha

interface StatsGridProps {
  avgDaily: number;
  completionRate: number;
  totalWeekly: number;
  isLoading: boolean;
}

export default function StatsGrid({ avgDaily, completionRate, totalWeekly, isLoading }: StatsGridProps) {
  if (isLoading) {
     return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#1A1A1A] h-32 rounded-[24px] animate-pulse border border-gray-800" />
            ))}
        </div>
     );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Card 1: Promedio */}
      <div className="bg-[#1A1A1A] p-5 rounded-[24px] border border-gray-800 hover:border-primary/30 transition-colors group">
        <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400 group-hover:text-blue-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 13.5a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v3zm6-6a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v9zm6-3a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75v-6a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v6z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
        <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Promedio Diario</p>
        <h4 className="text-2xl font-bold text-white mt-1">{Math.round(avgDaily)} <span className="text-sm font-normal text-gray-500">ml</span></h4>
      </div>

      {/* Card 2: Total Semanal */}
      <div className="bg-[#1A1A1A] p-5 rounded-[24px] border border-gray-800 hover:border-primary/30 transition-colors group">
         <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-primary/10 rounded-xl text-primary group-hover:text-primary-light transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
            </div>
         </div>
         <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Total Semanal</p>
         <h4 className="text-2xl font-bold text-white mt-1">{(totalWeekly / 1000).toFixed(1)} <span className="text-sm font-normal text-gray-500">Litros</span></h4>
      </div>

      {/* Card 3: Cumplimiento */}
      <div className="bg-[#1A1A1A] p-5 rounded-[24px] border border-gray-800 hover:border-primary/30 transition-colors group">
         <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-green-500/10 rounded-xl text-green-400 group-hover:text-green-300 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
            </div>
         </div>
         <p className="text-gray-400 text-xs uppercase tracking-wider font-medium">Objetivo Cumplido</p>
         <h4 className="text-2xl font-bold text-white mt-1">{Math.round(completionRate)}<span className="text-sm font-normal text-gray-500">%</span></h4>
      </div>

    </div>
  );
}