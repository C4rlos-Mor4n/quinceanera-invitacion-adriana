"use client";

import { Suspense } from "react";
import { use } from "react";
import { InvitacionContent } from "@/components/invitacion-content";
import "../styles.css";
import "../fullscreen-envelope.css";

interface InvitacionPageProps {
  params: Promise<{
    url: string;
  }>;
}

export default function InvitacionPage({ params }: InvitacionPageProps) {
  const resolvedParams = use(params);

  return (
    <div className="envelope-container">
      <main className="flex-1 w-full h-full">
        <InvitacionContent url={resolvedParams.url} />
      </main>
    </div>
  );
}
