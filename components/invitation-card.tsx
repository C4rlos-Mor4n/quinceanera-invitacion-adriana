import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Gift, Phone } from "lucide-react";

interface InvitationCardProps {
  invitadoId?: string;
  nombreInvitado?: string;
}

export function InvitationCard({
  invitadoId,
  nombreInvitado,
}: InvitationCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-gold gold-border bg-emerald">
      {/* Luciérnagas decorativas */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="firefly"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
      <div className="bg-theme-green/30 p-6 sm:p-8 text-center border-b border-gold">
        <div className="relative inline-block">
          <h1 className="font-script text-3xl sm:text-4xl gold-text relative z-10">
            Mis XV Años
          </h1>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>
      </div>

      {/* Imagen circular centrada */}
      <div className="relative p-6 sm:p-8 flex justify-center bg-gradient-to-b from-emerald to-theme-green/20">
        <div className="relative">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gold/30 via-gold/40 to-gold/30 blur-sm"></div>
          <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-gold hover-glow">
            <Image
              src="/placeholder-logo.svg"
              alt="Quinceañera"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <CardContent className="p-6 sm:p-8 space-y-6 sm:space-y-8 bg-gradient-to-b from-theme-green/20 to-emerald relative overflow-hidden">
        <div className="text-center">
          <p className="text-base sm:text-lg mb-1">Querido/a</p>
          <p className="font-script text-xl sm:text-2xl gold-text mb-2 sm:mb-4">
            {nombreInvitado || "Invitado/a"}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Con la bendición de Dios y la de mis padres tengo el honor de
            invitarte a celebrar mis XV años
          </p>
        </div>

        {/* Grid responsivo para los detalles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
            <div>
              <p className="font-medium text-sm sm:text-base">5 de abril</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Sábado</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
            <div>
              <p className="font-medium text-sm sm:text-base">4:00 PM</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Presentación: 5:30 PM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
            <div>
              <p className="font-medium text-sm sm:text-base">
                Salón de eventos Buganvilla
              </p>
              <Link
                href="https://maps.google.com"
                target="_blank"
                className="text-xs sm:text-sm text-primary hover:underline"
              >
                Ver ubicación
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
            <div>
              <p className="font-medium text-sm sm:text-base">
                Código de vestimenta
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">Formal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 justify-center">
          <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gold" />
          <div>
            <p className="font-medium text-sm sm:text-base">
              Confirmar antes del 28 de marzo
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Maily: 0939474919 | Mamá: 0960530147
            </p>
          </div>
        </div>

        {invitadoId && (
          <div className="pt-2 sm:pt-4">
            <Button
              variant="gold"
              className="w-full py-3 sm:py-4 text-sm sm:text-base"
              asChild
            >
              <Link href={`/confirmar/${invitadoId}`}>
                {nombreInvitado
                  ? `Confirmar asistencia de ${nombreInvitado}`
                  : "Confirmar asistencia"}
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
