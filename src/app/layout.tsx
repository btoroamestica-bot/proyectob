import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Toro Data SpA | Consultora de Bases de Datos e IA Aplicada",
  description: "Consultora chilena de tecnología e informática. Optimizamos bases de datos, automatizamos ETLs y desarrollamos analítica predictiva con un modelo híbrido Humano-IA.",
  keywords: ["Toro Data", "Bases de datos Chile", "Inteligencia Artificial aplicada", "Optimización SQL", "Consultoría base de datos", "ETL automática", "Data Science Chile"],
  authors: [{ name: "Toro Data SpA" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
