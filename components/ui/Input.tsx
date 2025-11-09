import React from 'react';

// Extendemos las props nativas del input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode; // Para el icono de email/nombre
}

/**
 * Componente de Input reutilizable y estilizado.
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-light">
            {icon}
          </div>
        )}
        <input
          {...props}
          ref={ref}
          className={`w-full bg-gray-medium/20 text-white border border-gray-medium
            rounded-xl py-4 pr-4 text-base placeholder-gray-light
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
            ${icon ? 'pl-12' : 'pl-4'}
          `}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';