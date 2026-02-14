import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";  // <--- ESTA LÍNEA ES LA CLAVE

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BKT Arquitectura",
  description: "Sistema de Gestión de Obras",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}