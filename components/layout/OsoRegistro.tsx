// components/layout/OsoRegistro.tsx
"use client";

import Image from "next/image";

export default function OsoRegistro() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/OsoRespirandoV2.gif" // o .png si es estático
        alt="Oso dando la bienvenida"
        width={300}
        height={300}
        priority
        className="max-w-sm md:max-w-md lg:max-w-lg"
      />
    </div>
  );
}