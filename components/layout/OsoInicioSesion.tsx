"use client";

import Image from "next/image";

export default function OsoInicioSesion() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/OsoInicioSesion.webp"
        alt="Imagen de oso de inicio sesión"
        width={800}   // solo ayuda a la calidad base
        height={800}
        priority
        className="w-[380px] h-[380px] sm:w-[430px] sm:h-[430px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px] object-contain"
      />
    </div>
  );
}
