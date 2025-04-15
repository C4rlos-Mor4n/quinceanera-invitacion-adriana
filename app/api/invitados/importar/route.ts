import { type NextRequest, NextResponse } from "next/server"
import { saveInvitados } from "@/lib/json-store"

// POST /api/invitados/importar - Importar invitados
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { invitados } = body

    if (!Array.isArray(invitados)) {
      return NextResponse.json({ success: false, error: "Formato de datos inválido" }, { status: 400 })
    }

    // Validar estructura básica de cada invitado
    for (const inv of invitados) {
      if (!inv.id || !inv.nombre || typeof inv.confirmado !== "boolean" || !inv.urlUnica) {
        return NextResponse.json(
          { success: false, error: "Algunos invitados no tienen el formato correcto" },
          { status: 400 },
        )
      }
    }

    const success = saveInvitados(invitados)

    if (!success) {
      throw new Error("Error al guardar los invitados")
    }

    return NextResponse.json({
      success: true,
      message: "Importación exitosa",
      count: invitados.length,
    })
  } catch (error) {
    console.error("Error al importar invitados:", error)
    return NextResponse.json({ success: false, error: "Error al importar los invitados" }, { status: 500 })
  }
}

