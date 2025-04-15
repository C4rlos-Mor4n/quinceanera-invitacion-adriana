"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  PartyPopper,
  Users,
  Sparkles,
  Heart,
} from "lucide-react";
import { useConfirmacion } from "@/hooks/useConfirmacion";

interface ConfirmacionContentProps {
  id: string;
}

export function ConfirmacionContent({ id }: ConfirmacionContentProps) {
  const router = useRouter();
  const {
    invitado,
    loading,
    confirmado,
    error,
    esInvitadoTemporal,
    redirigiendo,
    contador,
    setContador,
    cargarDatos,
    confirmar,
  } = useConfirmacion(id);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (redirigiendo && contador > 0) {
      interval = setInterval(() => {
        setContador((prev) => prev - 1);
      }, 1000);
    } else if (contador === 0) {
      window.location.href = "https://maps.app.goo.gl/QxnJZ2tiCKBrytWm7";
    }
    return () => clearInterval(interval);
  }, [redirigiendo, contador, setContador]);

  if (loading) {
    return (
      <div className="fixed inset-0 w-full h-full bg-[#154734] flex items-center justify-center">
        <div className="text-gold text-lg animate-pulse">
          Cargando información...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 w-full h-full bg-[#154734] p-4">
        <Card className="w-full max-w-md mx-auto border-gold/20">
          <CardContent className="text-center p-6">
            <p className="mb-4 text-white">{error}</p>
            <Button variant="gold" onClick={() => router.push("/")}>
              Volver al inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-[#154734] p-2 sm:p-4 overflow-y-auto">
      <div className="tiana-theme rounded-lg shadow-xl border-2 sm:border-4 border-gold/30 p-0 w-full h-full max-w-4xl mx-auto relative overflow-hidden">
        {/* Silueta de Nueva Orleans como fondo */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 opacity-10">
          <Image
            src="/images/new-orleans-skyline.svg"
            alt="Silueta de Nueva Orleans"
            fill
            className="object-cover"
          />
        </div>

        {/* Luciérnagas decorativas */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.6 + Math.random() * 0.4})`,
            }}
          />
        ))}

        {/* Efecto de brillo superior */}
        <div className="absolute top-0 left-0 right-0 h-2 sm:h-3 bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10"></div>

        {/* Contenido principal */}
        <div className="relative p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-white h-full space-y-4 sm:space-y-6">
          {/* Título */}
          <div className="relative mb-3 sm:mb-4">
            <div className="absolute -inset-2 sm:-inset-4 bg-gold/10 rounded-full blur-md"></div>
            <h1 className="font-script text-2xl sm:text-4xl md:text-5xl gold-text text-center relative">
              Confirmación
            </h1>
          </div>

          {/* Imagen circular con efectos */}
          <div className="relative mb-3 sm:mb-4">
            <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10 rounded-full blur-md"></div>
            <div className="absolute -inset-2 sm:-inset-4 border border-gold/30 rounded-full"></div>
            <div className="absolute -inset-3 sm:-inset-6 border border-gold/20 rounded-full"></div>
            <div className="relative w-24 h-24 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 sm:border-4 border-gold/40 shadow-lg">
              <Image
                src="https://i.imgur.com/cXAs1O0.jpeg"
                alt="Quinceañera"
                fill
                className="object-cover object-[center_25%]"
                priority
              />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 sm:-translate-y-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
            </div>
          </div>

          {/* Información del invitado */}
          <div className="text-center space-y-1 sm:space-y-2 mb-3 sm:mb-4">
            <p className="font-script text-xl sm:text-2xl gold-text">
              {invitado?.nombre}
            </p>
          </div>

          {/* Detalles del evento */}
          <div className="w-full max-w-md space-y-3 sm:space-y-4 bg-black/10 p-3 sm:p-4 rounded-lg border border-gold/10 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
              </div>
              <div>
                <p className="font-medium text-sm sm:text-base text-white">
                  Sábado 17 de Mayo, 2025
                </p>
                <p className="text-xs sm:text-sm text-white/70">4:00 PM</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
              </div>
              <div>
                <p className="font-medium text-sm sm:text-base text-white">
                  Rancho El Paraíso
                </p>
                <a
                  href="https://maps.app.goo.gl/QxnJZ2tiCKBrytWm7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-gold/80 hover:text-gold hover:underline"
                >
                  Ver ubicación
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
              </div>
              <div>
                <p className="font-medium text-sm sm:text-base text-white">
                  {invitado?.numeroInvitados || 1}{" "}
                  {invitado?.numeroInvitados === 1 ? "Invitado" : "Invitados"}
                </p>
              </div>
            </div>
          </div>

          {confirmado ? (
            <div className="text-center space-y-3 sm:space-y-4 bg-black/20 p-4 sm:p-6 rounded-lg border border-gold/20 max-w-md w-full">
              <div className="flex items-center justify-center gap-2 text-gold">
                <PartyPopper className="h-5 w-5 sm:h-6 sm:w-6" />
                <p className="font-script text-xl sm:text-2xl">
                  ¡Asistencia confirmada!
                </p>
              </div>
              <p className="text-sm sm:text-base text-white/80">
                Gracias por confirmar tu asistencia. ¡Nos vemos pronto!
              </p>
              {redirigiendo && (
                <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-white/70">
                  Serás redirigido al mapa en {contador} segundos...
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="gold"
              className="w-full max-w-md py-3 sm:py-4 text-sm sm:text-base animate-pulse hover:animate-none bg-gold/80 text-[#154734] hover:bg-gold"
              onClick={confirmar}
            >
              Confirmar Asistencia
            </Button>
          )}
        </div>

        {/* Decoración inferior */}
        <div className="h-4 sm:h-6 bg-gradient-to-r from-gold/10 via-gold/30 to-gold/10 flex items-center justify-center">
          <div className="w-16 sm:w-24 h-px bg-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
