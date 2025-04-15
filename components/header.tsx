"use client";

import Link from "next/link";
import { Crown } from "lucide-react";
import { auth } from "@/lib/auth";

export function Header() {
  const isAuthenticated =
    typeof window !== "undefined" ? auth.isAuthenticated() : false;

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <Link
        href={isAuthenticated ? "/admin" : "/"}
        className="flex items-center gap-2"
      >
        <Crown className="h-6 w-6 text-gold" />
        <span className="font-script text-xl gold-text">
          Adriana Lisbeth Vallejo Quiroz
        </span>
      </Link>
      {isAuthenticated && (
        <nav className="hidden md:flex gap-6">
          <Link href="/admin" className="text-sm hover:text-primary">
            Administración
          </Link>
        </nav>
      )}
    </header>
  );
}
