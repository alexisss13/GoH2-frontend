"use client";

import Image from "next/image";

export default function OsoEscribiendo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/OsoEscribiendo.gif"
        alt="Imagen de oso de inicio sesión"
        width={250}   // solo ayuda a la calidad base
        height={250}
        priority
        className="max-w-sm md:max-w-md lg:max-w-lg"
      />
    </div>
  );
}
