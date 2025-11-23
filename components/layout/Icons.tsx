// components/layout/Icons.tsx
import React from "react";

// --- Navegación y UI General ---

export const HomeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.47 3.84a.75.75 0 011.06 0l8.635 8.635a.75.75 0 11-1.06 1.06l-.375-.375V20.25a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.625a.75.75 0 01-.75-.75V13.16l-.375.375a.75.75 0 11-1.06-1.06L11.47 3.84z" />
  </svg>
);

export const ChartBarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 13.5a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v3zm6-6a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v9zm6-3a.75.75 0 00.75.75h2.25a.75.75 0 00.75-.75v-6a.75.75 0 00-.75-.75h-2.25a.75.75 0 00-.75.75v6z" clipRule="evenodd" />
    <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
  </svg>
);

export const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
  </svg>
);

export const CogIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 5.389c-.421.077-.832.195-1.23.352l-1.105-.493a1.875 1.875 0 00-2.438 1.034l-.9 2.473c-.318.874.073 1.848.86 2.245l1.043.524c-.014.215-.021.433-.021.652 0 .22.007.437.02.652l-1.042.524c-.788.397-1.178 1.371-.86 2.245l.9 2.473c.32.88 1.272 1.322 2.163 1.035l1.376-.444a10.08 10.08 0 001.229.352l.178 1.571c.15.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.572c.421-.077.832-.195 1.23-.352l1.376.444c.891.287 1.843-.155 2.163-1.035l.9-2.473c.318-.874-.073-1.848-.86-2.245l-1.042-.524c.013-.215.02-.433.02-.652 0-.219-.007-.437-.02-.652l1.042-.524c.788-.397 1.178-1.371.86-2.245l-.9-2.473a1.875 1.875 0 00-2.163-1.035l-1.105.493a10.08 10.08 0 00-1.23-.352l-.178-1.571A1.875 1.875 0 0014.772 2.25h-1.844zM12 14.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
  </svg>
);

export const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

// --- Flechas ---

export const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const BackArrow = ArrowLeftIcon;

export const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className || "w-4 h-4 ml-1 opacity-70"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

// --- Elementos de Hidratación y Clima ---

export const DropIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

export const GlassIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
    <path d="M3.75 10.5a.75.75 0 000 1.5h6a.75.75 0 00.75-.75V3a.75.75 0 00-1.5 0v7.5h-5.25z" />
    <path fillRule="evenodd" d="M1.5 13.5a.75.75 0 01.75-.75h19.5a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75H2.25a.75.75 0 01-.75-.75v-6.75z" clipRule="evenodd" />
  </svg>
);

export const CoffeeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.25 2.25a.75.75 0 01.75.75v2.25h10.5V3a.75.75 0 011.5 0v2.25H18a3 3 0 013 3V10.5a3 3 0 01-3 3h-2.115a6.003 6.003 0 01-5.885 4.5H12a6.003 6.003 0 01-5.885-4.5H3.75a3 3 0 01-3-3V8.25a3 3 0 013-3h9.75V3a.75.75 0 01.75-.75zm0 3.75h-1.5a1.5 1.5 0 00-1.5 1.5v2.25a1.5 1.5 0 001.5 1.5h1.5v-5.25zm12.75 0v5.25h1.5a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5h-1.5z" clipRule="evenodd" />
  </svg>
);

export const BoltIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.914-.143z" clipRule="evenodd" />
  </svg>
);

export const CloudIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a4.5 4.5 0 01-2.25-8.625z" />
  </svg>
);

export const GlobeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.083 14.135 7.5 15 7.5c.865 0 1.72-.417 2.416-1.036M15 7.5V3m3.375 4.5c.891 0 1.756.24 2.548.662M18.375 7.5V3m0 3.75c.609.328 1.125.79 1.5 1.337M19.875 10.5c.375.547.675 1.138.9 1.762" />
  </svg>
);
