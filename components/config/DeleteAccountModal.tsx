// components/config/DeleteAccountModal.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/lib/userService';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const router = useRouter();
  const { token, logout } = useAuthStore();
  
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !password) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Llamamos al backend (DELETE /api/perfil)
      await userService.deleteAccount(password, token);
      
      // 2. Si éxito: Limpiamos sesión local
      logout();
      
      // 3. Redirigimos al login (o a una página de despedida)
      router.replace('/login');
      
    } catch (err: any) {
      // Error común: Contraseña incorrecta (401)
      setError(err.message || 'Error al eliminar la cuenta');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
      
      <div 
        className="w-full max-w-md bg-[#141414] border-t sm:border border-red-900/30 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl shadow-red-900/10 relative overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors bg-gray-900/50 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6 mt-2">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white">¿Eliminar cuenta?</h2>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            Esta acción es <span className="text-red-400 font-bold">permanente</span>. 
            Se borrarán todos tus registros de hidratación, logros y conexiones sociales.
          </p>
        </div>

        <form onSubmit={handleDelete} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">
              Confirma tu contraseña para continuar
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña actual"
              isInvalid={!!error}
              className="bg-black border-gray-800 focus:border-red-500 focus:ring-red-500/20"
            />
            {error && (
              <p className="text-red-500 text-xs ml-1 flex items-center gap-1 font-medium animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="border-gray-700 hover:bg-gray-800 text-gray-300"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!password}
              className="bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-900/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              Sí, eliminar todo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}