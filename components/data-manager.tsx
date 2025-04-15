"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Download, Upload, UserCheck, AlertTriangle, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { importarInvitados, getInvitadosConfirmados, type Invitado } from "@/services/api"

interface DataManagerProps {
  invitados: Invitado[]
  setInvitados: (invitados: Invitado[]) => void
}

export function DataManager({ invitados, setInvitados }: DataManagerProps) {
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<"success" | "error" | "warning" | null>(null)

  // Función para exportar todos los invitados
  const exportarInvitados = () => {
    const dataStr = JSON.stringify(invitados, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `invitados-xv-maily-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    setImportStatus("Datos exportados correctamente.")
    setStatusType("success")
  }

  // Función para exportar solo los invitados confirmados
  const exportarConfirmados = async () => {
    try {
      const confirmados = await getInvitadosConfirmados()

      if (confirmados.length === 0) {
        setImportStatus("No hay invitados que hayan confirmado su asistencia aún.")
        setStatusType("warning")
        return
      }

      const dataStr = JSON.stringify(confirmados, null, 2)
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

      const exportFileDefaultName = `confirmados-xv-maily-${new Date().toISOString().split("T")[0]}.json`

      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      linkElement.click()

      setImportStatus("Lista de confirmados exportada correctamente.")
      setStatusType("success")
    } catch (error) {
      console.error("Error al exportar confirmados:", error)
      setImportStatus("Error al exportar la lista de confirmados.")
      setStatusType("error")
    }
  }

  // Función para importar invitados
  const handleImportarInvitados = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    fileReader.readAsText(file, "UTF-8")
    fileReader.onload = async (e) => {
      try {
        const content = e.target?.result as string
        const parsedInvitados = JSON.parse(content)

        if (!Array.isArray(parsedInvitados)) {
          throw new Error("El formato del archivo no es válido")
        }

        // Verificar que cada objeto tenga la estructura correcta
        parsedInvitados.forEach((inv: any) => {
          if (!inv.id || !inv.nombre || typeof inv.confirmado !== "boolean" || !inv.urlUnica) {
            throw new Error("Algunos invitados no tienen el formato correcto")
          }
        })

        // Importar los invitados al servidor
        const success = await importarInvitados(parsedInvitados)

        if (success) {
          setImportStatus("Importación exitosa: " + parsedInvitados.length + " invitados importados")
          setStatusType("success")

          // Actualizar la lista local
          setInvitados(parsedInvitados)

          // Recargar la página después de 2 segundos para reflejar los cambios
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        } else {
          throw new Error("Error al guardar los datos en el servidor")
        }
      } catch (error) {
        console.error("Error al importar:", error)
        setImportStatus("Error al importar: " + (error as Error).message)
        setStatusType("error")
      }
    }
    fileReader.onerror = () => {
      setImportStatus("Error al leer el archivo")
      setStatusType("error")
    }

    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    event.target.value = ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Datos</CardTitle>
        <CardDescription>Exporta e importa datos para mantener la información entre dispositivos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center gap-2" onClick={exportarInvitados}>
            <Download className="h-4 w-4" />
            Exportar Todos los Invitados
          </Button>

          <Button variant="outline" className="flex items-center gap-2" onClick={exportarConfirmados}>
            <UserCheck className="h-4 w-4" />
            Exportar Confirmados
          </Button>
        </div>

        <div className="border rounded-md p-4">
          <p className="text-sm mb-3">Importar invitados desde archivo JSON:</p>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Haz clic para seleccionar</span> o arrastra y suelta
              </p>
              <p className="text-xs text-muted-foreground">Archivo JSON con formato de invitados</p>
            </div>
            <input type="file" className="hidden" accept=".json" onChange={handleImportarInvitados} />
          </label>
        </div>

        {importStatus && (
          <Alert variant={statusType || "default"} className="mt-4">
            {statusType === "success" && <Check className="h-4 w-4" />}
            {statusType === "error" && <AlertTriangle className="h-4 w-4" />}
            {statusType === "warning" && <AlertTriangle className="h-4 w-4" />}
            <AlertTitle>{statusType === "success" ? "Éxito" : statusType === "error" ? "Error" : "Aviso"}</AlertTitle>
            <AlertDescription>{importStatus}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

