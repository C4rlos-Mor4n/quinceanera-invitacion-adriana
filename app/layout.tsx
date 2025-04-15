import type React from "react";
import type { Metadata } from "next";
import { Inter, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Optimización de carga de fuente
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap", // Optimización de carga de fuente
});

export const metadata: Metadata = {
  title: "Quinceañera de Adriana Lisbeth Vallejo Quiroz",
  description:
    "Invitación a la celebración de los XV años de Adriana Lisbeth Vallejo Quiroz",
  generator: "v0.dev",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1", // Mejora visualización móvil
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link
          rel="preload"
          href="https://i.imgur.com/cXAs1O0.jpeg"
          as="image"
        />
      </head>
      <body
        className={`${inter.variable} ${greatVibes.variable} font-sans antialiased`}
      >
        {/* Script para inicializar datos de ejemplo */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Verificar si ya hay invitados en localStorage
              if (typeof window !== 'undefined') {
                const invitados = localStorage.getItem('invitados');
                if (!invitados || invitados === '[]') {
                  // Crear un invitado de ejemplo
                  const exampleInvitado = {
                    id: "example-id-123456",
                    nombre: "Denisse",
                    email: "denisse@example.com",
                    telefono: "0987654321",
                    confirmado: false,
                    numeroInvitados: 2,
                    urlUnica: "denisse-example"
                  };
                  
                  // Guardar en localStorage
                  localStorage.setItem('invitados', JSON.stringify([exampleInvitado]));
                }
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}

import "./globals.css";

import "./globals.css";
