"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface Firefly {
  id: number;
  left: string;
  top: string;
  delay: string;
  scale: string;
}

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fireflies, setFireflies] = useState<Firefly[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  useEffect(() => {
    if (mounted) {
      const newFireflies = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        scale: `${0.8 + Math.random() * 0.5}`,
      }));
      setFireflies(newFireflies);
    }
  }, [mounted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (auth.login(username, password)) {
      router.push("/admin");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#154734] flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {/* Silueta de Nueva Orleans como fondo */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
          <Image
            src="/images/new-orleans-skyline.svg"
            alt="Silueta de Nueva Orleans"
            fill
            className="object-cover"
          />
        </div>

        {/* Luciérnagas decorativas */}
        {mounted &&
          fireflies.map((firefly) => (
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
      </div>

      <Card className="w-full max-w-md bg-black/30 border-4 sm:border-8 border-gold/30 p-8 relative overflow-hidden">
        {/* Efecto de brillo superior */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10"></div>

        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <Image
              src="https://i.imgur.com/cXAs1O0.jpeg"
              alt="Adriana Lisbeth"
              fill
              className="object-cover rounded-full border-4 border-gold/30"
            />
          </div>
          <h1 className="font-script text-4xl sm:text-5xl gold-text mb-2">
            Mis XV Años
          </h1>
          <p className="text-white/70">Adriana Lisbeth Vallejo Quiroz</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">
              Usuario
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black/20 border-gold/20 text-white"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/20 border-gold/20 text-white"
              required
              disabled={loading}
            />
          </div>

          {error && <p className="text-sm text-red-400 text-center">{error}</p>}

          <Button
            type="submit"
            className="w-full py-6 text-lg bg-gold/80 text-[#154734] hover:bg-gold transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white/50 text-sm">Panel de Administración</p>
        </div>
      </Card>
    </div>
  );
}
