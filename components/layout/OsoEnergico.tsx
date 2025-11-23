"use client";

import Image from "next/image";

export default function OsoEnergico() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/OsoEnergico.gif"
        alt="Imagen de oso de pie, para dar la bienvenida"
        width={500}   // solo ayuda a la calidad base
        height={500}
        priority
        className="max-w-sm md:max-w-md lg:max-w-lg"
      />
    </div>
  );
}
