"use client";

import Image from "next/image";

export default function Oso() {
  return (
    <Image
      src="/OsoRespirandoV2.gif"
      alt="Oso respirando"
      width={500}
      height={500}
      unoptimized
      priority
      className="max-w-sm md:max-w-md lg:max-w-lg"
    />
  );
}
