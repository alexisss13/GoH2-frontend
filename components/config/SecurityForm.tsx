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
  
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();
  const newPassword = watch('newPassword');

  const onSubmit = async (data: any) => {
    if (!token) return;
    
    // Validación manual simple (idealmente Zod)
    if (data.newPassword !== data.confirmPassword) {
        setMessage({ type: 'error', text: 'Las contraseñas no coinciden' });
        return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      await configService.changePassword(data.currentPassword, data.newPassword, token);
      setMessage({ type: 'success', text: 'Contraseña actualizada' });
      reset();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-gray-800 mt-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">🔒</span> Seguridad
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
            <label className="text-gray-400 text-xs uppercase font-bold ml-1 mb-2 block">Contraseña Actual</label>
            <PasswordInput 
                {...register('currentPassword', { required: true })}
                className="bg-gray-900 border-gray-700"
            />
        </div>

        <div>
            <label className="text-gray-400 text-xs uppercase font-bold ml-1 mb-2 block">Nueva Contraseña</label>
            <PasswordInput 
                {...register('newPassword', { required: true, minLength: 6 })}
                className="bg-gray-900 border-gray-700"
            />
        </div>

        <div>
            <label className="text-gray-400 text-xs uppercase font-bold ml-1 mb-2 block">Confirmar Nueva Contraseña</label>
            <PasswordInput 
                {...register('confirmPassword', { required: true })}
                className="bg-gray-900 border-gray-700"
            />
        </div>

        {message && (
            <div className={`p-3 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {message.text}
            </div>
        )}

        <div className="pt-2">
            <Button type="submit" variant="secondary" isLoading={isSaving}>
                Actualizar Contraseña
            </Button>
        </div>
      </form>
    </div>
  );
}