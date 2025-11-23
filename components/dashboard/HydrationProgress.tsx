// components/dashboard/HydrationProgress.tsx
'use client';

interface HydrationProgressProps {
  consumed: number;
  goal: number;
}

export default function HydrationProgress({ consumed, goal }: HydrationProgressProps) {
  // Asegurar que el progreso no exceda 100 visualmente de forma extraña, o sí para mostrar overachievement
  const percentage = Math.min(100, Math.max(0, (consumed / goal) * 100));
  
  // Cálculo para el círculo SVG
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative py-8">
      {/* SVG Circle */}
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="stroke-gray-800 fill-none"
            strokeWidth="15"
          />
          {/* Progress Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            className="stroke-primary fill-none transition-all duration-1000 ease-out"
            strokeWidth="15"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Text Content Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl md:text-4xl font-bold text-white">
            {consumed}<span className="text-lg font-normal text-gray-light">ml</span>
          </span>
          <span className="text-xs md:text-sm text-gray-light mt-1">
            de {goal} ml diarios
          </span>
        </div>
      </div>
    </div>
  );
}