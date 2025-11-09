import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

/**
 * Componente de Botón reutilizable.
 * variant 'primary' (color) o 'secondary' (blanco).
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    isLoading = false, 
    disabled, 
    className, 
    ...props 
  }, ref) => {
    
    const baseStyle = "block w-full text-center font-extrabold py-4 px-6 rounded-2xl text-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase";

    const variantStyles = variant === 'primary' 
      ? 'bg-primary text-black hover:scale-105 hover:bg-primary-light shadow-[inset_0_-4px_0_rgba(0,0,0,0.18)]'
      : ' text-primary hover:scale-105 hover:bg-opacity-80 active:scale-100 border border-gray-medium';

    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyle} ${variantStyles} ${className}`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            {/* Spinner simple */}
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';