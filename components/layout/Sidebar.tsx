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

  const navItems = [
    { label: 'Inicio', href: '/dashboard', icon: HomeIcon },
    { label: 'Resumen', href: '/resumen', icon: ChartBarIcon },
    { label: 'Social', href: '/social', icon: UserIcon },
    { label: 'Configuración', href: '/configuracion', icon: CogIcon },
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

      {/* Navigation Links */}
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

      {/* CTA Button - Bottom */}
      <div className="mt-auto pt-6 border-t border-gray-800">
        <button
          onClick={onAddClick}
          className="w-full bg-primary hover:bg-primary-light text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-primary/20"
        >
          <div className="bg-white/20 p-1.5 rounded-full">
             <DropIcon className="w-5 h-5 text-white" />
          </div>
          <span>Registrar Bebida</span>
        </button>
        
        <div className="mt-6 flex items-center gap-3 px-2">
             <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
                <Image src="/OsoFeliz.gif" width={40} height={40} alt="Avatar" />
             </div>
             <div className="flex flex-col">
                 <span className="text-sm text-white font-medium">Mi Cuenta</span>
                 <span className="text-xs text-gray-500">Ver perfil</span>
             </div>
        </div>
      </div>
    </aside>
  );
}