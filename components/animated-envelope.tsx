"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MailOpenIcon as Envelope, ChevronDown, Sparkles } from "lucide-react";
import { InvitationLetter } from "./invitation-letter";

interface AnimatedEnvelopeProps {
  invitadoId?: string;
  nombreInvitado?: string;
}

export function AnimatedEnvelope({
  invitadoId,
  nombreInvitado,
}: AnimatedEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
  };

  // Optimizar la cantidad de partículas según el dispositivo
  const particleCount =
    typeof window !== "undefined" && window.innerWidth < 768 ? 15 : 30;

  return (
    <AnimatePresence mode="wait">
      {!isOpen ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 w-full min-h-screen flex flex-col items-center justify-center cursor-pointer bg-[#154734] overscroll-none"
          onClick={toggleEnvelope}
        >
          <div className="tiana-theme rounded-lg shadow-xl border-4 sm:border-8 border-gold/30 p-0 w-full h-full max-w-4xl mx-auto relative overflow-hidden">
            {/* Optimizar la cantidad de luciérnagas en móviles */}
            {[...Array(particleCount)].map((_, i) => (
              <div
                key={i}
                className="firefly"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  transform: `scale(${0.6 + Math.random() * 0.4})`,
                }}
              />
            ))}

            {/* Contenido principal */}
            <div className="relative p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-white h-full">
              {/* Título con efecto decorativo */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute -inset-2 sm:-inset-4 bg-gold/10 rounded-full blur-md"></div>
                <h1 className="font-script text-3xl sm:text-4xl md:text-5xl gold-text text-center relative">
                  Mis Quince
                </h1>
              </div>

              {/* Subtítulo */}
              <div className="mb-4 sm:mb-6 text-center">
                <h2 className="font-script text-xl sm:text-2xl gold-text">
                  Celebra conmigo
                </h2>
              </div>

              {/* Foto */}
              <div className="relative mb-4 sm:mb-6">
                <div className="absolute -inset-2 bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10 rounded-full blur-md"></div>
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gold/40 shadow-lg">
                  <Image
                    src="https://i.imgur.com/cXAs1O0.jpeg"
                    alt="Quinceañera Adriana Lisbeth"
                    fill
                    sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                    className="object-cover object-[center_25%]"
                    priority
                  />
                </div>
              </div>

              {/* Nombre */}
              <h2 className="font-script text-xl sm:text-2xl gold-text text-center mb-4">
                Adriana Lisbeth
              </h2>

              {/* Mensaje para el invitado */}
              <div className="bg-black/20 rounded-lg p-3 sm:p-4 border border-gold/10 mb-4 sm:mb-6 max-w-md">
                <p className="text-sm sm:text-base text-center mb-2">
                  {nombreInvitado ? `¡Hola ${nombreInvitado}!` : "¡Hola!"}
                </p>
                <p className="text-xs sm:text-sm text-center text-white/80">
                  Has recibido una invitación especial para celebrar conmigo
                  este día tan importante.
                </p>
              </div>

              {/* Botón para abrir */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 border border-gold/40 text-sm text-white shadow-md hover:shadow-lg transition-all duration-300 hover-glow">
                <span>Pulsa para abrir</span>
                <ChevronDown className="w-4 h-4" />
              </div>

              {/* Fecha */}
              <div className="absolute top-4 right-4 text-right bg-black/30 px-2 sm:px-3 py-1 rounded-lg border border-gold/20">
                <p className="text-xs text-gold font-medium">
                  Sábado 17 de Mayo
                </p>
                <p className="text-xs font-bold text-white">2025</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 w-full h-full overflow-y-auto bg-[#154734] overscroll-none"
        >
          <InvitationLetter
            invitadoId={invitadoId}
            nombreInvitado={nombreInvitado}
            onClose={() => setIsOpen(false)}
            showConfirmButton={true}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
