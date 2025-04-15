"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Users,
  Sparkles,
  Heart,
  LogOut,
  Copy,
  CheckCircle,
  Clock3,
  Loader2,
} from "lucide-react";
import { getInvitados, addInvitado, deleteInvitado } from "@/services/api";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";

interface Invitado {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  numeroInvitados: number;
  confirmado: boolean;
  urlUnica: string;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  numeroInvitados: number;
}

interface Firefly {
  id: number;
  left: string;
  top: string;
  delay: string;
  scale: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [invitados, setInvitados] = useState<Invitado[]>([]);
  const [loading, setLoading] = useState(true);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    numeroInvitados: 1,
  });

  const loadInvitados = async () => {
    try {
      console.log("Cargando invitados...");
      const response = await fetch("/api/invitados");
      if (!response.ok) {
        console.error("Error en la respuesta:", response.status);
        throw new Error("Error al cargar invitados");
      }
      const responseData = await response.json();
      console.log("Datos recibidos:", responseData);

      // Extraer el array de invitados de la propiedad 'data'
      const invitadosData = responseData.data;

      if (Array.isArray(invitadosData)) {
        setInvitados(invitadosData);
      } else {
        console.error("Los datos no tienen el formato esperado:", responseData);
        setInvitados([]);
      }
    } catch (error) {
      console.error("Error al cargar invitados:", error);
      setInvitados([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvitados();
  }, []);

  useEffect(() => {
    const newFireflies = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      scale: `${0.8 + Math.random() * 0.5}`,
    }));
    setFireflies(newFireflies);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/invitados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al agregar invitado");

      await loadInvitados();
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        numeroInvitados: 1,
      });
      toast.success("Invitado agregado correctamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al agregar invitado");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/invitados/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar invitado");

      await loadInvitados();
      toast.success("Invitado eliminado correctamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al eliminar invitado");
    }
  };

  const handleCopyUrl = async (url: string) => {
    try {
      // Construir la URL completa
      const baseUrl = window.location.origin;
      const fullUrl = `${baseUrl}/invitacion/${url}`;

      if (!navigator?.clipboard) {
        // Fallback para navegadores que no soportan clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = fullUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          toast.success("URL completa copiada al portapapeles");
        } catch (err) {
          toast.error("No se pudo copiar la URL");
        }
        document.body.removeChild(textArea);
        return;
      }

      await navigator.clipboard.writeText(fullUrl);
      toast.success("URL completa copiada al portapapeles");
    } catch (error) {
      console.error("Error al copiar URL:", error);
      toast.error("No se pudo copiar la URL");
    }
  };

  const handleLogout = async () => {
    try {
      auth.logout();
      router.push("/login");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cerrar sesión");
    }
  };

  const totalInvitados = Array.isArray(invitados) ? invitados.length : 0;
  const totalConfirmados = Array.isArray(invitados)
    ? invitados.filter((inv) => inv?.confirmado).length
    : 0;

  return (
    <div className="min-h-screen bg-[#154734] overflow-x-hidden">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="tiana-theme rounded-lg shadow-xl border-4 sm:border-8 border-gold/30 bg-black/30 overflow-hidden">
          {/* Silueta de Nueva Orleans como fondo */}
          <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-32 opacity-10 pointer-events-none">
            <Image
              src="/images/new-orleans-skyline.svg"
              alt="Silueta de Nueva Orleans"
              fill
              className="object-cover"
            />
          </div>

          {/* Luciérnagas decorativas */}
          {fireflies.map((firefly) => (
            <div
              key={firefly.id}
              className="firefly absolute pointer-events-none"
              style={{
                left: firefly.left,
                top: firefly.top,
                animationDelay: firefly.delay,
                transform: `scale(${firefly.scale})`,
              }}
            />
          ))}

          {/* Efecto de brillo superior */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10"></div>

          {/* Contenido principal */}
          <div className="relative p-4 sm:p-6 flex flex-col items-center gap-4 sm:gap-6">
            {/* Header con título y botón de cerrar sesión */}
            <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex flex-col items-center sm:items-start gap-2">
                <h1 className="font-script text-2xl sm:text-4xl md:text-5xl gold-text relative">
                  Panel de Administración
                </h1>
                <div className="flex items-center gap-2">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold/30">
                    <Image
                      src="https://i.imgur.com/cXAs1O0.jpeg"
                      alt="Adriana Lisbeth Vallejo Quiroz"
                      fill
                      className="object-cover object-[center_25%]"
                    />
                  </div>
                  <div className="text-white">
                    <p className="font-script text-lg gold-text">
                      Adriana Lisbeth
                    </p>
                    <p className="text-sm text-white/70">Mis XV Años</p>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-white hover:text-gold hover:bg-black/20"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Cerrar Sesión
              </Button>
            </div>

            {/* Resumen de confirmaciones */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-black/20 rounded-lg border border-gold/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gold" />
                  <div>
                    <p className="text-white/70 text-sm">Total Invitados</p>
                    <p className="text-white text-lg font-medium">
                      {totalInvitados}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 rounded-lg border border-gold/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-white/70 text-sm">Confirmados</p>
                    <p className="text-white text-lg font-medium">
                      {totalConfirmados}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-black/20 rounded-lg border border-gold/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-white/70 text-sm">Pendientes</p>
                    <p className="text-white text-lg font-medium">
                      {totalInvitados - totalConfirmados}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información de la cumpleañera */}
            <div className="w-full bg-black/20 rounded-lg border border-gold/20 p-4 sm:p-6">
              <h2 className="font-script text-xl sm:text-2xl gold-text text-center mb-4">
                Adriana Lisbeth Vallejo Quiroz
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Calendar className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-white">
                      Sábado 17 de Mayo, 2025
                    </p>
                    <p className="text-sm text-white/70">4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Rancho El Paraíso</p>
                    <a
                      href="https://maps.app.goo.gl/QxnJZ2tiCKBrytWm7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold/80 hover:text-gold hover:underline"
                    >
                      Ver ubicación
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Contacto</p>
                    <p className="text-sm text-white/70">+593 99 999 9999</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-sm text-white/70">adriana@ejemplo.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario para agregar invitados */}
            <div className="w-full bg-black/20 rounded-lg border border-gold/20 p-4 sm:p-6">
              <h2 className="font-script text-xl sm:text-2xl gold-text text-center mb-4">
                Agregar Invitado
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-white">
                    Nombre
                  </Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className="bg-black/20 border-gold/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-black/20 border-gold/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-white">
                    Teléfono
                  </Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className="bg-black/20 border-gold/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numeroInvitados" className="text-white">
                    Número de Invitados
                  </Label>
                  <Input
                    id="numeroInvitados"
                    type="number"
                    min="1"
                    value={formData.numeroInvitados}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numeroInvitados: parseInt(e.target.value),
                      })
                    }
                    className="bg-black/20 border-gold/20 text-white"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 text-lg bg-gold/80 text-[#154734] hover:bg-gold transition-colors"
                >
                  Agregar Invitado
                </Button>
              </form>
            </div>

            {/* Lista de invitados actualizada */}
            <div className="w-full bg-black/20 rounded-lg border border-gold/20 p-4 sm:p-6">
              <h2 className="font-script text-xl sm:text-2xl gold-text text-center mb-4">
                Lista de Invitados
              </h2>

              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-gold" />
                </div>
              ) : (
                <div className="space-y-4">
                  {invitados.map((invitado) => (
                    <div
                      key={invitado.id}
                      className="bg-black/30 p-4 rounded-lg border border-gold/20 hover:bg-black/40 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div>
                          <h3 className="font-medium text-white">
                            {invitado.nombre}
                          </h3>
                          <p className="text-sm text-white/70">
                            {invitado.email}
                          </p>
                          <p className="text-sm text-white/70">
                            {invitado.telefono}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Users className="h-4 w-4 text-gold" />
                            <span className="text-sm text-white/70">
                              {invitado.numeroInvitados}{" "}
                              {invitado.numeroInvitados === 1
                                ? "Invitado"
                                : "Invitados"}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <span
                            className={`text-sm ${
                              invitado.confirmado
                                ? "text-green-400"
                                : "text-yellow-400"
                            }`}
                          >
                            {invitado.confirmado ? "Confirmado" : "Pendiente"}
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleCopyUrl(invitado.urlUnica)}
                            className="w-full sm:w-auto bg-black/20 text-white hover:bg-black/30"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar URL
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(invitado.id)}
                            className="w-full sm:w-auto"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
