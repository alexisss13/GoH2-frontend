// components/layout/BottomNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ChartBarIcon, DropIcon, UserIcon, CogIcon } from './Icons';

interface BottomNavProps {
    onAddClick: () => void;
}

export default function BottomNav({ onAddClick }: BottomNavProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const items = [
    { label: 'Inicio', href: '/dashboard', icon: HomeIcon },
    { label: 'Resumen', href: '/resumen', icon: ChartBarIcon },
  ];

  const itemsRight = [
    { label: 'Social', href: '/social', icon: UserIcon },
    { label: 'Config', href: '/configuracion', icon: CogIcon },
  ];

  const linkBaseClass = "flex flex-col items-center justify-center gap-1 w-16 transition-colors duration-200";
  const activeClass = "text-primary";
  const inactiveClass = "text-gray-light/60 hover:text-white";

  return (
    <nav className="fixed bottom-0 left-0 w-full h-[85px] bg-black border-t border-gray-800 flex items-start justify-center pt-4 px-4 z-50 rounded-t-2xl pb-6">
      <div className="flex items-center justify-between w-full max-w-md relative">
        
        {/* Left Items */}
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={`${linkBaseClass} ${isActive(item.href) ? activeClass : inactiveClass}`}>
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}

        {/* Center Floating Button - Spacer */}
        <div className="w-20"></div>
        
        {/* The Big Button (Absolute) */}
        <button 
            onClick={onAddClick}
            className="absolute left-1/2 -translate-x-1/2 -top-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,151,178,0.5)] hover:scale-105 transition-transform z-10 border-4 border-black"
        >
            <DropIcon className="w-8 h-8 text-white" />
            <span className="absolute -right-1 -bottom-1 bg-white text-primary font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center">+</span>
        </button>

        {/* Right Items */}
        {itemsRight.map((item) => (
          <Link key={item.href} href={item.href} className={`${linkBaseClass} ${isActive(item.href) ? activeClass : inactiveClass}`}>
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}