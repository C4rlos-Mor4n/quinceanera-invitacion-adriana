import { type NextRequest, NextResponse } from "next/server"
import { confirmarAsistencia } from "@/lib/json-store"

// POST /api/invitados/:id/confirmar - Confirmar asistencia
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)
    const invitadoActualizado = confirmarAsistencia(id)

    if (!invitadoActualizado) {
      return NextResponse.json({ success: false, error: "Invitado no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: invitadoActualizado })
  } catch (error) {
    console.error("Error al confirmar asistencia:", error)
    return NextResponse.json({ success: false, error: "Error al confirmar la asistencia" }, { status: 500 })
  }
}

