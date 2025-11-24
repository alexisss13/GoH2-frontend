// app/[locale]/configuracion/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileForm from '@/components/config/ProfileForm';
import SecurityForm from '@/components/config/SecurityForm';
import DeleteAccountModal from '@/components/config/DeleteAccountModal';
import { BackArrow } from '@/components/layout/Icons';

export default function SettingsPage() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <DashboardLayout onAddClick={() => router.push('/dashboard')}>
      <div className="min-h-screen lg:min-h-0 text-white font-sans pb-32 lg:pb-0 max-w-3xl mx-auto">
        
        {/* Header Mobile */}
        <div className="lg:hidden flex items-center justify-between mb-6 sticky top-0 bg-black/95 backdrop-blur-lg py-4 z-20 -mx-4 px-4 border-b border-gray-800/50">
            <button 
              onClick={() => router.back()} 
              className="p-2.5 -ml-2 rounded-xl hover:bg-gray-800/50 text-gray-300 transition-colors"
            >
                <BackArrow />
            </button>
            <span className="font-bold text-lg">Configuración</span>
            <div className="w-10" />
        </div>

        {/* Header Desktop */}
        <div className="hidden lg:block mb-10">
             <div className="flex items-center gap-3 mb-2">
               <span className="material-symbols-outlined text-[32px] text-primary">settings</span>
               <h1 className="text-3xl font-bold">Configuración</h1>
             </div>
             <p className="text-gray-400 text-sm">Administra tu cuenta y preferencias de hidratación</p>
        </div>

        {/* Secciones */}
        <div className="space-y-6 animate-fade-in">
            
            {/* 1. Perfil Biométrico */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#151515] rounded-3xl border border-gray-800/70 overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <span className="material-symbols-outlined text-[26px] text-primary">person</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Datos Biométricos</h2>
                    <p className="text-xs text-gray-400">Información para calcular tu hidratación ideal</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ProfileForm />
              </div>
            </div>

            {/* 2. Seguridad */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#151515] rounded-3xl border border-gray-800/70 overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-orange-500/10 to-transparent p-6 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                    <span className="material-symbols-outlined text-[26px] text-orange-400">lock</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Seguridad</h2>
                    <p className="text-xs text-gray-400">Protege tu cuenta con una contraseña segura</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <SecurityForm />
              </div>
            </div>

            {/* 3. Sesión */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#151515] rounded-3xl border border-gray-800/70 overflow-hidden shadow-xl">
              <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-6 border-b border-gray-800/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                    <span className="material-symbols-outlined text-[26px] text-blue-400">logout</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Sesión</h2>
                    <p className="text-xs text-gray-400">Cierra tu sesión actual</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <button 
                    onClick={handleLogout}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold hover:from-gray-700 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 border border-gray-700"
                >
                    <span className="material-symbols-outlined text-[22px]">power_settings_new</span>
                    <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>

            {/* 4. Zona de Peligro */}
            <div className="bg-gradient-to-br from-red-950/30 to-[#151515] rounded-3xl border border-red-900/30 overflow-hidden shadow-xl shadow-red-900/5">
              <div className="bg-gradient-to-r from-red-500/10 to-transparent p-6 border-b border-red-900/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                    <span className="material-symbols-outlined text-[26px] text-red-400">warning</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Zona de Peligro</h2>
                    <p className="text-xs text-red-400/80">Acciones irreversibles - procede con precaución</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="bg-red-950/20 rounded-2xl p-4 mb-4 border border-red-900/20">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-400 text-[20px] mt-0.5">info</span>
                    <div className="flex-1">
                      <p className="text-sm text-red-300/90 font-medium mb-1">¿Eliminar tu cuenta?</p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        Esta acción eliminará permanentemente todos tus datos, registros de hidratación, 
                        logros y configuraciones. No podrás recuperar esta información.
                      </p>
                    </div>
                  </div>
                </div>
                
                <button 
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="w-full py-3.5 rounded-2xl border-2 border-red-900/50 text-red-400 hover:bg-red-900/20 hover:border-red-500/50 text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-red-900/10"
                >
                    <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                    <span>Eliminar mi cuenta permanentemente</span>
                </button>
              </div>
            </div>

            {/* Footer Info */}
            <div className="text-center py-8 space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <span className="material-symbols-outlined text-[18px]">water_drop</span>
                  <p className="text-xs font-medium">GoH2 v1.0.0</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-xs text-gray-500">Hecho con</p>
                  <span className="material-symbols-outlined text-[16px] text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  <p className="text-xs text-gray-500">por Tecsup</p>
                </div>
            </div>

        </div>

      </div>

      <DeleteAccountModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
      />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
      `}</style>

    </DashboardLayout>
  );
}