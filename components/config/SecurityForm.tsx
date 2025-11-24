// components/config/SecurityForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { configService } from '@/lib/configService';
import { useAuthStore } from '@/store/authStore';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';

export default function SecurityForm() {
  const token = useAuthStore(state => state.token);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  
  const { register, handleSubmit, reset, watch } = useForm();
  const newPassword = watch('newPassword');

  // Calcular fortaleza de contraseña
  const calculatePasswordStrength = (password: string) => {
    if (!password || password.length === 0) {
      setPasswordStrength(null);
      return;
    }
    
    if (password.length < 6) {
      setPasswordStrength('weak');
    } else if (password.length < 10) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  // Watch password changes
  useState(() => {
    if (newPassword) {
      calculatePasswordStrength(newPassword);
    }
  });

  const onSubmit = async (data: any) => {
    if (!token) return;
    
    if (data.newPassword !== data.confirmPassword) {
        setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
        return;
    }

    if (data.newPassword.length < 6) {
        setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
        return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      await configService.changePassword(data.currentPassword, data.newPassword, token);
      setMessage({ type: 'success', text: 'Contraseña actualizada exitosamente' });
      reset();
      setPasswordStrength(null);
      
      // Auto-hide success message
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al cambiar contraseña' });
    } finally {
      setIsSaving(false);
    }
  };

  const strengthConfig = {
    weak: { label: 'Débil', color: 'bg-red-500', textColor: 'text-red-400', width: '33%' },
    medium: { label: 'Media', color: 'bg-yellow-500', textColor: 'text-yellow-400', width: '66%' },
    strong: { label: 'Fuerte', color: 'bg-green-500', textColor: 'text-green-400', width: '100%' }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Info Box */}
      <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-orange-400 text-[20px] mt-0.5">shield</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-orange-300/90 mb-1">Protege tu cuenta</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            Usa una contraseña única con al menos 6 caracteres. Combina letras, números y símbolos para mayor seguridad.
          </p>
        </div>
      </div>

      {/* Contraseña Actual */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold ml-1">
          <span className="material-symbols-outlined text-[16px] text-orange-400">lock</span>
          Contraseña Actual
        </label>
        <PasswordInput 
          {...register('currentPassword', { required: true })}
          placeholder="••••••••"
          className="bg-black/40 border-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
        />
      </div>

      {/* Nueva Contraseña */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold ml-1">
          <span className="material-symbols-outlined text-[16px] text-orange-400">lock_reset</span>
          Nueva Contraseña
        </label>
        <PasswordInput 
          {...register('newPassword', { required: true, minLength: 6 })}
          placeholder="••••••••"
          className="bg-black/40 border-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
          onChange={(e) => calculatePasswordStrength(e.target.value)}
        />
        
        {/* Password Strength Indicator */}
        {passwordStrength && (
          <div className="space-y-2 animate-slide-down">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium ${strengthConfig[passwordStrength].textColor}`}>
                {strengthConfig[passwordStrength].label}
              </span>
              <span className="text-xs text-gray-500">{newPassword?.length || 0} caracteres</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`h-full ${strengthConfig[passwordStrength].color} transition-all duration-300`}
                style={{ width: strengthConfig[passwordStrength].width }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmar Nueva Contraseña */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold ml-1">
          <span className="material-symbols-outlined text-[16px] text-orange-400">verified</span>
          Confirmar Nueva Contraseña
        </label>
        <PasswordInput 
          {...register('confirmPassword', { required: true })}
          placeholder="••••••••"
          className="bg-black/40 border-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20"
        />
      </div>

      {/* Message */}
      {message && (
        <div className={`rounded-2xl p-4 flex items-center gap-3 animate-slide-down ${
          message.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/30' 
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          <span className={`material-symbols-outlined text-[22px] ${
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {message.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className={`text-sm font-medium ${
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {message.text}
          </p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button 
          type="submit" 
          variant="secondary" 
          isLoading={isSaving}
          className="w-full bg-orange-500/20 hover:bg-orange-500/30 border-orange-500/30 text-orange-300 font-bold shadow-lg shadow-orange-500/10"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">vpn_key</span>
            <span>Actualizar Contraseña</span>
          </span>
        </Button>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </form>
  );
}