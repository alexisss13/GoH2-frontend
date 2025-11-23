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
        // Reset form with data
        reset({
          alturaCm: data.alturaCm,
          pesoKg: data.pesoKg,
          nivelActividad: data.nivelActividad,
          // Formato fecha para input date
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
      // Convertir fecha a ISO si cambió
      const payload = {
        ...data,
        fechaNacimiento: data.fechaNacimiento ? new Date(data.fechaNacimiento).toISOString() : undefined
      };

      await userService.updateProfile(payload, token);
      setMessage({ type: 'success', text: 'Perfil actualizado correctamente' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Error al guardar' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="py-8 text-center text-gray-500 animate-pulse">Cargando perfil...</div>;

  return (
    <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-gray-800">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">👤</span> Datos Biométricos
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-gray-400 text-xs uppercase font-bold ml-1 mb-2 block">Altura (cm)</label>
            <Input 
              type="number" 
              placeholder="170" 
              {...register('alturaCm', { valueAsNumber: true })} 
              className="bg-gray-900 border-gray-700 focus:border-primary"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase font-bold ml-1 mb-2 block">Peso (kg)</label>
            <Input 
              type="number" 
              step="0.1"
              placeholder="70" 
              {...register('pesoKg', { valueAsNumber: true })} 
              className="bg-gray-900 border-gray-700 focus:border-primary"
            />
          </div>
        </div>

        <div>
            <label className="text-gray-400 text-xs uppercase font-bold ml-1 mb-2 block">Fecha de Nacimiento</label>
            <Input 
              type="date" 
              {...register('fechaNacimiento')} 
              className="bg-gray-900 border-gray-700 focus:border-primary text-white"
            />
        </div>

        <div>
            <label className="text-gray-400 text-xs uppercase font-bold ml-1 mb-2 block">Nivel de Actividad</label>
            <div className="relative">
                <select 
                  {...register('nivelActividad')}
                  className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl py-4 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    <option value="Sedentario">Sedentario (Poco ejercicio)</option>
                    <option value="Ligero">Ligero (1-3 días/sem)</option>
                    <option value="Moderado">Moderado (3-5 días/sem)</option>
                    <option value="Activo">Activo (6-7 días/sem)</option>
                    <option value="MuyActivo">Muy Activo (Intenso)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
            </div>
        </div>

        {message && (
            <div className={`p-3 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {message.text}
            </div>
        )}

        <div className="pt-2">
            <Button type="submit" variant="primary" isLoading={isSaving}>
                Guardar Cambios
            </Button>
        </div>
      </form>
    </div>
  );
}