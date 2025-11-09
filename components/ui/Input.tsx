import React from 'react';

// Extendemos las props nativas del input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  isInvalid?: boolean; // <-- ¡NUEVO! Prop para el error
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon, isInvalid = false, className, ...props }, ref) => {
    
    // Clases condicionales para el borde
    const errorClasses = 'border-red-500 focus:ring-red-500';
    const defaultClasses = 'border-gray-medium focus:ring-primary';

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
          className={`w-full bg-gray-medium/20 text-white border
            rounded-xl py-4 pr-4 text-base placeholder-gray-light
            focus:outline-none focus:ring-2 focus:border-transparent
            ${icon ? 'pl-12' : 'pl-4'}
            ${isInvalid ? errorClasses : defaultClasses} 
            ${className || ''}
          `}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';