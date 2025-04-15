"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedEnvelope } from "@/components/animated-envelope";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvitadoByUrl } from "@/services/api";

interface InvitacionContentProps {
  url: string;
}

export function InvitacionContent({ url }: InvitacionContentProps) {
  const router = useRouter();
  const [invitado, setInvitado] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvitado = async () => {
      try {
        console.log("Buscando invitado con URL:", url);

        // Intentar obtener del servidor
        const foundInvitado = await getInvitadoByUrl(url);
        console.log("Invitado encontrado:", foundInvitado);

        if (foundInvitado) {
          setInvitado(foundInvitado);
          setLoading(false);
        } else {
          setError("No se pudo encontrar la invitación");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al buscar invitado:", error);
        setError("No se pudo cargar la invitación");
        setLoading(false);
      }
    };

    fetchInvitado();
  }, [url, router]);

  if (loading) {
  }

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">{error}</p>
          <Button variant="outline" onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-full">
      <AnimatedEnvelope
        invitadoId={invitado?.id}
        nombreInvitado={invitado?.nombre}
      />
    </div>
  );
}
