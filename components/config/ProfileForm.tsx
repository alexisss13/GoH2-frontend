// components/config/ProfileForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { userService, UserProfile, ProfileUpdateData } from '@/lib/userService';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ProfileForm() {
  const token = useAuthStore(state => state.token);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

  const { register, handleSubmit, reset } = useForm<ProfileUpdateData>();

  useEffect(() => {
    if (!token) return;
    userService.getProfile(token)
      .then(data => {
        setUser(data);
        reset({
          alturaCm: data.alturaCm,
          pesoKg: data.pesoKg,
          nivelActividad: data.nivelActividad,
          fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString().split('T')[0] : ''
        });
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, [token, reset]);

  const onSubmit = async (data: ProfileUpdateData) => {
    if (!token) return;
    setIsSaving(true);
    setMessage(null);
    
    try {
      const payload = {
        ...data,
        fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString() : undefined
      };

      await userService.updateProfile(payload, token);
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
      
      // Auto-hide success message
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al guardar' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="text-gray-500 text-sm font-medium">Cargando datos biométricos...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Altura y Peso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold ml-1">
            <span className="material-symbols-outlined text-[16px] text-primary">height</span>
            Altura
          </label>
          <div className="relative">
            <Input 
              type="number" 
              placeholder="170" 
              {...register('alturaCm', { valueAsNumber: true })} 
              className="bg-black/40 border-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 pl-4 pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">cm</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold ml-1">
            <span className="material-symbols-outlined text-[16px] text-primary">monitor_weight</span>
            Peso
          </label>
          <div className="relative">
            <Input 
              type="number" 
              step="0.1"
              placeholder="70.5" 
              {...register('pesoKg', { valueAsNumber: true })} 
              className="bg-black/40 border-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 pl-4 pr-12"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">kg</span>
          </div>
        </div>
      </div>

      {/* Fecha de Nacimiento */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold ml-1">
          <span className="material-symbols-outlined text-[16px] text-primary">cake</span>
          Fecha de Nacimiento
        </label>
        <div className="relative">
          <Input 
            type="date" 
            {...register('fechaNacimiento')} 
            className="bg-black/40 border-gray-800 focus:border-primary focus:ring-2 focus:ring-primary/20 text-white pl-4"
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-[20px] pointer-events-none">
            calendar_today
          </span>
        </div>
      </div>

      {/* Nivel de Actividad */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-gray-400 text-xs uppercase font-bold ml-1">
          <span className="material-symbols-outlined text-[16px] text-primary">fitness_center</span>
          Nivel de Actividad
        </label>
        <div className="relative">
          <select 
            {...register('nivelActividad')}
            className="w-full bg-black/40 text-white border border-gray-800 rounded-2xl py-4 px-4 pr-12 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
          >
            <option value="Sedentario" className="bg-[#1A1A1A]">Sedentario (Poco o ningún ejercicio)</option>
            <option value="Ligero" className="bg-[#1A1A1A]">Ligero (Ejercicio 1-3 días/semana)</option>
            <option value="Moderado" className="bg-[#1A1A1A]">Moderado (Ejercicio 3-5 días/semana)</option>
            <option value="Activo" className="bg-[#1A1A1A]">Activo (Ejercicio 6-7 días/semana)</option>
            <option value="MuyActivo" className="bg-[#1A1A1A]">Muy Activo (Ejercicio intenso diario)</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-[20px]">
            expand_more
          </span>
        </div>
        <p className="text-xs text-gray-600 ml-1 flex items-center gap-1.5 mt-2">
          <span className="material-symbols-outlined text-[14px]">info</span>
          <span>Esto ayuda a calcular tu meta de hidratación diaria</span>
        </p>
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
          variant="primary" 
          isLoading={isSaving}
          className="w-full bg-primary hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
        >
          <span className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">save</span>
            <span>Guardar Cambios</span>
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