import { type NextRequest, NextResponse } from "next/server"
import { getInvitadoByUrl, crearInvitadoTemporal } from "@/lib/json-store"

// GET /api/invitados/url/:urlUnica - Obtener un invitado por URL única
export async function GET(request: NextRequest, { params }: { params: { urlUnica: string } }) {
  try {
    const { urlUnica } = await Promise.resolve(params)
    const invitado = getInvitadoByUrl(urlUnica)

    if (!invitado) {
      // Si no se encuentra, crear un invitado temporal
      const invitadoTemporal = crearInvitadoTemporal(urlUnica)
      return NextResponse.json({
        success: true,
        data: invitadoTemporal,
        temporal: true,
      })
    }

    return NextResponse.json({ success: true, data: invitado })
  } catch (error) {
    console.error("Error al obtener invitado por URL:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el invitado" }, { status: 500 })
  }
}

