import { type NextRequest, NextResponse } from "next/server"
import { readInvitados, addInvitado } from "@/lib/json-store"

// GET /api/invitados - Obtener todos los invitados
export async function GET() {
  try {
    const invitados = readInvitados()
    return NextResponse.json({ success: true, data: invitados })
  } catch (error) {
    console.error("Error al obtener invitados:", error)
    return NextResponse.json({ success: false, error: "Error al obtener los invitados" }, { status: 500 })
  }
}

// POST /api/invitados - Crear un nuevo invitado
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, numeroInvitados } = body

    // Validación básica
    if (!nombre) {
      return NextResponse.json({ success: false, error: "El nombre es obligatorio" }, { status: 400 })
    }

    const nuevoInvitado = addInvitado({
      nombre,
      email,
      telefono,
      numeroInvitados: Number(numeroInvitados) || 1,
    })

    return NextResponse.json({ success: true, data: nuevoInvitado }, { status: 201 })
  } catch (error) {
    console.error("Error al crear invitado:", error)
    return NextResponse.json({ success: false, error: "Error al crear el invitado" }, { status: 500 })
  }
}

