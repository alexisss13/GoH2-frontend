"use client";

import Image from "next/image";

export default function OsoCorriendo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/BienvenidaOsoCorriendo.gif"
        alt="Imagen de oso de inicio sesión"
        width={500}   // solo ayuda a la calidad base
        height={500}
        priority
        className="max-w-sm md:max-w-md lg:max-w-lg"
      />
    </div>
  );
}
