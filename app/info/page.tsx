import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Crown } from "lucide-react";

export default function InfoPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md border-gold/20">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Crown className="h-12 w-12 text-gold" />
          </div>
          <CardTitle className="text-2xl font-script gold-text">
            Quinceañera de Adriana Lisbeth Vallejo Quiroz
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Esta es una invitación privada para la quinceañera de Adriana
            Lisbeth Vallejo Quiroz.
          </p>
          <p className="text-muted-foreground">
            Para acceder, necesitas una invitación personalizada o credenciales
            de administrador.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
