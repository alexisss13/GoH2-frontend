// components/layout/DashboardLayout.tsx
'use client';

import BottomNav from './BottomNav';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onAddClick: () => void;
}

export default function DashboardLayout({ children, onAddClick }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      
      {/* Desktop Sidebar (Hidden on Mobile) */}
      <Sidebar onAddClick={onAddClick} />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 w-full min-h-screen relative">
        {/* Container para limitar el ancho en pantallas muy grandes 
            y centrar el contenido móvil en el espacio disponible 
        */}
        <div className="w-full max-w-2xl mx-auto lg:max-w-5xl p-0 lg:p-8 xl:p-12 pb-24 lg:pb-8">
            {children}
        </div>
      </main>

      {/* Mobile Bottom Nav (Hidden on Desktop) */}
      <div className="lg:hidden">
        <BottomNav onAddClick={onAddClick} />
      </div>

    </div>
  );
}