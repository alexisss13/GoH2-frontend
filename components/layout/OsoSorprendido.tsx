"use client";

import Image from "next/image";

export default function OsoSorprendido() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        src="/OsoSorprendido.gif"
        alt="Imagen de oso sorprendido"
        width={300}   // solo ayuda a la calidad base
        height={300}
        priority
        className="max-w-sm md:max-w-md lg:max-w-lg"
      />
    </div>
  );
}
