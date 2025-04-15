import { NextResponse } from "next/server"
import { readInvitados } from "@/lib/json-store"

// GET /api/invitados/confirmados - Obtener invitados confirmados
export async function GET() {
  try {
    const invitados = readInvitados()
    const confirmados = invitados.filter((inv) => inv.confirmado)

    return NextResponse.json({ success: true, data: confirmados })
  } catch (error) {
    console.error("Error al obtener invitados confirmados:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los invitados confirmados" }, { status: 500 })
  }
}

