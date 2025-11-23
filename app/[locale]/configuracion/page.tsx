// app/[locale]/configuracion/page.tsx
'use client';

import { useState } from 'react'; // <-- Añadido useState
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/config/ProfileForm';
import SecurityForm from '@/components/config/SecurityForm';
import DeleteAccountModal from '@/components/config/DeleteAccountModal'; // <-- Importar Modal
import { BackArrow } from '@/components/layout/Icons';

export default function SettingsPage() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  
  // Estado para controlar el modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <DashboardLayout onAddClick={() => router.push('/dashboard')}>
      <div className="min-h-screen lg:min-h-0 text-white font-sans pb-32 lg:pb-0 max-w-2xl mx-auto">
        
        {/* Header Mobile */}
        <div className="lg:hidden flex items-center justify-between mb-6 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-20 -mx-4 px-4 border-b border-gray-800">
            <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full hover:bg-gray-800 text-gray-300">
                <BackArrow />
            </button>
            <span className="font-bold text-lg">Configuración</span>
            <div className="w-10" />
        </div>

        {/* Header Desktop */}
        <div className="hidden lg:block mb-8">
             <h1 className="text-3xl font-bold">Configuración</h1>
             <p className="text-gray-400">Administra tu cuenta y preferencias</p>
        </div>

        {/* Secciones */}
        <div className="animate-fade-in space-y-8">
            
            {/* 1. Perfil Biométrico */}
            <ProfileForm />

            {/* 2. Seguridad */}
            <SecurityForm />

            {/* 3. Sesión y Zona de Peligro */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-gray-800">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-2xl">🚪</span> Cuenta
                </h2>

                <button 
                    onClick={handleLogout}
                    className="w-full py-4 rounded-2xl bg-gray-800 text-white font-bold hover:bg-gray-700 transition-colors mb-4 shadow-sm"
                >
                    Cerrar Sesión
                </button>

                <div className="pt-6 mt-6 border-t border-gray-800">
                    <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">
                        Zona de peligro
                    </p>
                    <button 
                        onClick={() => setIsDeleteModalOpen(true)} // <-- Abrir modal real
                        className="w-full py-3 rounded-xl border border-red-900/30 text-red-500 hover:bg-red-900/10 hover:border-red-500/50 text-sm font-medium transition-all"
                    >
                        Eliminar Cuenta
                    </button>
                </div>
            </div>

            {/* Footer Info */}
            <div className="text-center text-gray-600 text-xs py-4">
                <p>GoH2 v1.0.0</p>
                <p>Hecho con 💙 por Tecsup</p>
            </div>

        </div>

      </div>

      {/* Renderizamos el Modal condicionalmente */}
      <DeleteAccountModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
      />

    </DashboardLayout>
  );
}