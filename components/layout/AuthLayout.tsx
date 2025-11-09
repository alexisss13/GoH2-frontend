import Oso from './Oso'; // Asumo que Oso.tsx está en components/layout/

interface AuthLayoutProps {
  bubbleText: string;
  children: React.ReactNode;
}

/**
 * Layout reutilizable para las páginas de Login y Registro.
 * Muestra la mascota y una burbuja de texto en la parte superior.
 */
export default function AuthLayout({ bubbleText, children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-start p-8 bg-black text-white">
      {/* Sección Superior: Mascota y Burbuja */}
      <div className="w-full max-w-md flex flex-col items-center pt-12 pb-8">
        
        {/* Burbuja de Texto (Pág. 5) */}
        <div className="relative bg-white text-black text-center rounded-xl p-4 mb-4">
          <p className="text-lg font-semibold">{bubbleText}</p>
          {/* Triángulo de la burbuja */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0
            border-l-[15px] border-l-transparent
            border-r-[15px] border-r-transparent
            border-t-[15px] border-t-white"
          />
        </div>
        
        {/* Mascota (Usando tu componente) */}
        <div className="w-48 h-48 mt-4">
          <Oso />
        </div>
      </div>

      {/* Sección Inferior: Contenido del Formulario */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}