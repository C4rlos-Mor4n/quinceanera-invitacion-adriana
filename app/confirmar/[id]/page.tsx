"use client";

import { Suspense } from "react";
import { Header } from "@/components/header";
import { ConfirmacionContent } from "@/components/confirmacion-content";

interface ConfirmarPageProps {
  params: {
    id: string;
  };
}

export default async function ConfirmarPage({ params }: ConfirmarPageProps) {
  const { id } = await Promise.resolve(params);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-8">
        <ConfirmacionContent id={id} />
      </main>
    </div>
  );
}
