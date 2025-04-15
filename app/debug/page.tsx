"use client"

import { useEffect, useState } from "react"
import { invitadosStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [invitados, setInvitados] = useState<any[]>([])
  const [localStorageContent, setLocalStorageContent] = useState<string>("")

  useEffect(() => {
    // Obtener invitados del store
    const allInvitados = invitadosStore.getAll()
    setInvitados(allInvitados)

    // Obtener contenido directo de localStorage
    if (typeof window !== "undefined") {
      const rawData = localStorage.getItem("invitados") || "[]"
      setLocalStorageContent(rawData)
    }
  }, [])

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Página de Depuración</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invitados en el Store</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">{JSON.stringify(invitados, null, 2)}</pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contenido de localStorage</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96">{localStorageContent}</pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

