"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Gift,
  Phone,
  Undo2,
  Music,
  Heart,
  Mail,
  Sparkles,
} from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import { MusicPlayer } from "./music-player";

interface InvitationLetterProps {
  invitadoId?: string;
  nombreInvitado?: string;
  onClose?: () => void;
  showConfirmButton?: boolean;
}

export function InvitationLetter({
  invitadoId,
  nombreInvitado,
  onClose,
  showConfirmButton = false,
}: InvitationLetterProps) {
  return (
    <div className="fixed inset-0 w-full min-h-screen overflow-y-auto bg-[#154734] p-2 sm:p-4 md:p-6 overscroll-none">
      <div className="tiana-theme border-4 sm:border-8 border-gold/30 rounded-lg overflow-hidden shadow-lg gold-border relative max-w-4xl mx-auto">
        {/* Efecto de brillo superior */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10"></div>

        {/* Luciérnagas decorativas */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Encabezado con decoración */}
        <div className="relative h-20 sm:h-28 bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10 flex items-center justify-center border-b border-gold/30 pt-4">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-gold hover-glow"
            >
              <Undo2 className="w-4 h-4" />
            </button>
          )}
          <h2 className="font-script text-3xl sm:text-4xl gold-text">
            Mis Quince
          </h2>
        </div>

        {/* Contenido de la carta */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 bg-gradient-to-b from-[#154734]/90 to-[#154734]/80 text-white relative flex-1">
          {/* Silueta de Nueva Orleans como fondo */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20">
            <Image
              src="/images/new-orleans-skyline.svg"
              alt="Silueta de Nueva Orleans"
              fill
              className="object-cover"
            />
          </div>

          {/* Título principal con efecto decorativo */}
          <div className="text-center relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
            <h1 className="font-script text-3xl sm:text-4xl gold-text mb-1 sm:mb-2">
              Celebra conmigo
            </h1>
            <h2 className="font-script text-2xl sm:text-3xl gold-text mb-2 sm:mb-4">
              Adriana Lisbeth Vallejo Quiroz
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
          </div>

          {/* Imagen circular centrada con efectos decorativos */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 blur-sm"></div>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-gold/30">
                <Image
                  src="https://i.imgur.com/cXAs1O0.jpeg"
                  alt="Quinceañera Adriana Lisbeth Vallejo Quiroz"
                  fill
                  className="object-cover object-[center_25%]"
                  priority
                />
              </div>
              {/* Detalles decorativos alrededor de la foto */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-4 h-4">
                <Sparkles className="w-full h-full text-gold" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-4 h-4">
                <Sparkles className="w-full h-full text-gold" />
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 w-4 h-4">
                <Sparkles className="w-full h-full text-gold" />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 w-4 h-4">
                <Sparkles className="w-full h-full text-gold" />
              </div>
            </div>
          </div>

          {/* Agradecimiento a los padres */}
          <div className="text-center space-y-2 sm:space-y-3 bg-black/10 p-3 rounded-lg border border-gold/10">
            <h3 className="font-script text-xl sm:text-2xl gold-text">
              Agradecimiento a mis padres
            </h3>
            <div className="flex justify-center">
              <Image
                src="/images/lotus.png"
                alt="Flor de loto"
                width={40}
                height={40}
                className="opacity-80"
              />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              Con el corazón lleno de alegría
              <br />
              <span className="font-medium gold-text">
                Galo Vallejo & Iraida Quiroz
              </span>
              <br />
              les invitan a compartir una noche especial para celebrar los XV
              años de su amada hija
            </p>
          </div>

          {/* Saludo al invitado */}
          <div className="text-center">
            <p className="text-base sm:text-lg mb-1">Querido/a</p>
            <p className="font-script text-xl sm:text-2xl gold-text mb-2 sm:mb-4">
              {nombreInvitado || "Invitado/a"}
            </p>
          </div>

          {/* Separador decorativo */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 my-2 sm:my-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent flex-1"></div>
            <div className="text-gold">✦</div>
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent flex-1"></div>
          </div>

          {/* Cuenta regresiva */}
          <CountdownTimer targetDate={new Date("2025-05-17T16:00:00")} />

          {/* Detalles del evento en grid responsivo */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 bg-black/10 p-4 sm:p-6 rounded-lg border border-gold/10">
            <h3 className="font-script text-2xl sm:text-3xl gold-text text-center mb-2">
              ✨ Detalles del evento ✨
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/20 rounded-lg p-4 border border-gold/20 hover:bg-black/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-gold" />
                  </div>
                  <h4 className="font-script text-xl gold-text">Fecha 📅</h4>
                </div>
                <p className="font-medium text-sm sm:text-base">
                  Sábado 17 de Mayo, 2025
                </p>
                <p className="text-xs sm:text-sm text-white/70">
                  Recepción: 16:00
                </p>
              </div>

              <div className="bg-black/20 rounded-lg p-4 border border-gold/20 hover:bg-black/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <h4 className="font-script text-xl gold-text">Lugar 🏰</h4>
                </div>
                <p className="font-medium text-sm sm:text-base">
                  Rancho El Paraíso
                </p>
                <Link
                  href="https://maps.app.goo.gl/QxnJZ2tiCKBrytWm7"
                  target="_blank"
                  className="text-xs sm:text-sm text-gold/80 hover:text-gold hover:underline inline-flex items-center gap-1"
                >
                  Ver ubicación <span>🗺️</span>
                </Link>
              </div>
            </div>

            <MusicPlayer autoPlay={true} />

            <div className="bg-black/20 rounded-lg p-4 border border-gold/20 hover:bg-black/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gold" />
                </div>
                <h4 className="font-script text-xl gold-text">Itinerario ⏰</h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2 bg-black/10 rounded-lg border border-gold/10">
                  <p className="font-medium text-sm sm:text-base">
                    🎊 Recepción
                  </p>
                  <p className="text-xs sm:text-sm text-white/70">16:00</p>
                </div>
                <div className="p-2 bg-black/10 rounded-lg border border-gold/10">
                  <p className="font-medium text-sm sm:text-base">
                    👑 Presentación
                  </p>
                  <p className="text-xs sm:text-sm text-white/70">18:00</p>
                </div>
                <div className="p-2 bg-black/10 rounded-lg border border-gold/10">
                  <p className="font-medium text-sm sm:text-base">🍽️ Cena</p>
                  <p className="text-xs sm:text-sm text-white/70">20:30</p>
                </div>
                <div className="p-2 bg-black/10 rounded-lg border border-gold/10">
                  <p className="font-medium text-sm sm:text-base">💃 Fiesta</p>
                  <p className="text-xs sm:text-sm text-white/70">
                    Después de la cena
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Código de vestimenta */}
          <div className="bg-black/10 p-4 sm:p-6 rounded-lg border border-gold/10">
            <h3 className="font-script text-2xl sm:text-3xl gold-text text-center mb-4">
              ✨ Código de vestimenta ✨
            </h3>

            <div className="bg-black/20 p-4 rounded-lg border border-gold/20 hover:bg-black/30 transition-colors">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-3xl">👔</span>
                </div>
                <h4 className="font-script text-xl gold-text">Formal</h4>
                <div className="flex gap-2 justify-center flex-wrap">
                  <span className="text-2xl">👗</span>
                  <span className="text-2xl">🥻</span>
                  <span className="text-2xl">🤵</span>
                  <span className="text-2xl">👠</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sugerencia de Regalo */}
          <div className="bg-black/10 p-4 sm:p-6 rounded-lg border border-gold/10">
            <h3 className="font-script text-2xl sm:text-3xl gold-text text-center mb-4">
              ✨ Sugerencia de Regalo ✨
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/20 p-4 rounded-lg border border-gold/20 hover:bg-black/30 transition-colors">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-2xl">🏦</span>
                  </div>
                  <h4 className="font-script text-xl gold-text">
                    Transferencia
                  </h4>
                  <div className="text-center">
                    <p className="text-sm font-medium mb-1">
                      Banco de Pichincha
                    </p>
                    <p className="text-sm text-white/70">Cuenta: 2209905407</p>
                    <p className="text-sm text-white/70">
                      Iraida María Quiroz Constante
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 p-4 rounded-lg border border-gold/20 hover:bg-black/30 transition-colors">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-2xl">💌</span>
                  </div>
                  <h4 className="font-script text-xl gold-text">
                    Lluvia de sobres
                  </h4>
                  <p className="text-sm text-center text-white/70">
                    Habrá un buzón especial en la recepción
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje final con diseño mejorado */}
          <div className="text-center space-y-4">
            <div className="inline-block relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 blur-sm rounded-lg"></div>
              <div className="relative bg-black/30 p-6 rounded-lg border border-gold/20">
                <h3 className="font-script text-xl gold-text mb-4">
                  ✨ Mi mayor deseo ✨
                </h3>
                <p className="text-sm italic text-white/90 leading-relaxed">
                  "Los sueños nacidos del corazón tienen el poder de hacerse
                  realidad..."
                  <br />
                  <br />
                  Hoy, uno de esos sueños se vuelve realidad, y no hay mayor
                  alegría que compartir este momento con quienes iluminan mi
                  vida con su magia, amor y alegría.
                  <br />
                  <br />
                  Este recuerdo vivirá por siempre en mi corazón, y mi mayor
                  anhelo es que tú formes parte de él.
                </p>
              </div>
            </div>
          </div>

          {/* Botón de confirmación */}
          {invitadoId && showConfirmButton && (
            <div className="pt-2 sm:pt-4">
              <Button
                variant="gold"
                className="w-full py-4 sm:py-6 text-sm sm:text-lg animate-pulse hover:animate-none shadow-lg hover-glow bg-gold/80 text-[#154734] hover:bg-gold"
                asChild
              >
                <Link href={`/confirmar/${invitadoId}`}>
                  Confirmar asistencia
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Pie de la carta */}
        <div className="p-3 sm:p-4 text-center border-t border-gold/20 bg-gradient-to-r from-gold/10 via-gold/20 to-gold/10">
          <div className="flex justify-center items-center gap-2">
            <Heart className="h-3 w-3 text-gold" />
            <p className="text-xs text-white">
              ¡Gracias por formar parte de este día tan especial!
            </p>
            <Heart className="h-3 w-3 text-gold" />
          </div>
        </div>

        {/* Decoración inferior */}
        <div className="h-6 bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10 flex items-center justify-center">
          <div className="w-24 h-1 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
