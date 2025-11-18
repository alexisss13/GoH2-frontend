// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GoH2",
  description: "Hydration tracker app.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="google-site-verification" content="K0I8TQOO2qpDtxLZW9xSwmbGOh3Y6zqFLgkDIyOMGak" />
      </head>
      <body>{children}</body>
    </html>
  );
}
