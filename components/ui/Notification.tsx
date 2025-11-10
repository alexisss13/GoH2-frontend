'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface NotificationProps {
  messageKey: string;
  type?: 'success' | 'error';
  onClose: () => void;
}

// Icono de Éxito (Check)
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function Notification({ messageKey, type = 'success', onClose }: NotificationProps) {
  const t = useTranslations('Auth');
  const [isVisible, setIsVisible] = useState(true);

  const bgColor = type === 'success' ? 'bg-primary/80' : 'bg-red-600/80';

  useEffect(() => {
    if (isVisible) {
      // Ocultar automáticamente después de 5 segundos
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose(); // Llama a la función para limpiar el estado de la URL
      }, 5000); 
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-sm p-4 rounded-xl shadow-2xl transition-all duration-300 z-50 ${bgColor}`}>
      <div className="flex items-center text-white">
        <CheckIcon />
        <span className="font-semibold text-sm">
          {t(messageKey as any)}
        </span>
        <button onClick={() => { setIsVisible(false); onClose(); }} className="ml-auto opacity-70 hover:opacity-100">
          <span className="sr-only">Cerrar notificación</span>
          &times;
        </button>
      </div>
    </div>
  );
}