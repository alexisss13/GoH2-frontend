// components/layout/Sidebar.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HomeIcon, ChartBarIcon, UserIcon, CogIcon, DropIcon } from './Icons';

interface SidebarProps {
  onAddClick: () => void;
}

export default function Sidebar({ onAddClick }: SidebarProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  // Quitamos Configuración de la lista principal
  const navItems = [
    { label: 'Inicio', href: '/dashboard', icon: HomeIcon },
    { label: 'Resumen', href: '/resumen', icon: ChartBarIcon },
    { label: 'Social', href: '/social', icon: UserIcon },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen bg-black border-r border-gray-800 fixed left-0 top-0 z-50 p-6">
      
      {/* Logo */}
      <div className="mb-10 px-2">
        <Link href="/dashboard">
          <Image
            src="/goh2-logo-horizontal.webp"
            alt="GoH2 Logo"
            width={120}
            height={40}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Navigation Links (Principal) */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                active 
                  ? 'bg-primary/10 text-primary font-bold' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              <item.icon className={`w-6 h-6 ${active ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* CTA Button & Configuración - Bottom */}
      <div className="mt-auto pt-6 border-t border-gray-800 flex flex-col gap-4">
        
        {/* Botón de Acción Principal */}
        <button
          onClick={onAddClick}
          className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-primary/20"
        >
          <div className="bg-white/20 p-1.5 rounded-full">
             <DropIcon className="w-5 h-5 text-white" />
          </div>
          <span>Registrar Bebida</span>
        </button>
        
        {/* Configuración (Reemplaza a "Mi Cuenta") */}
        <Link
          href="/configuracion"
          className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
            isActive('/configuracion')
              ? 'bg-primary/10 text-primary font-bold'
              : 'text-gray-400 hover:bg-gray-900 hover:text-white'
          }`}
        >
          <CogIcon className={`w-6 h-6 ${isActive('/configuracion') ? 'text-primary' : 'text-gray-500 group-hover:text-white'}`} />
          <span>Configuración</span>
        </Link>

      </div>
    </aside>
  );
}