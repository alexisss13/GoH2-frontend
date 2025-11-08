import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Tailwind se importa aquí

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GoH2 - Tu App de Hidratación",
  description: "Monitoriza tu hidratación diaria y alcanza tus objetivos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-black text-white`}>
        {/* En el futuro, aquí irán los Providers (Context, React Query) */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}