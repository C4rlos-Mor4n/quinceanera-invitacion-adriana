import { type NextRequest, NextResponse } from "next/server"
import { getInvitadoById, updateInvitado, deleteInvitado } from "@/lib/json-store"

// GET /api/invitados/:id - Obtener un invitado por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)
    const invitado = getInvitadoById(id)

    if (!invitado) {
      return NextResponse.json({ success: false, error: "Invitado no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: invitado })
  } catch (error) {
    console.error("Error al obtener invitado:", error)
    return NextResponse.json({ success: false, error: "Error al obtener el invitado" }, { status: 500 })
  }
}

// PUT /api/invitados/:id - Actualizar un invitado
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)
    const body = await request.json()

    const invitadoActualizado = updateInvitado(id, body)

    if (!invitadoActualizado) {
      return NextResponse.json({ success: false, error: "Invitado no encontrado" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: invitadoActualizado })
  } catch (error) {
    console.error("Error al actualizar invitado:", error)
    return NextResponse.json({ success: false, error: "Error al actualizar el invitado" }, { status: 500 })
  }
}

// DELETE /api/invitados/:id - Eliminar un invitado
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params)
    const success = deleteInvitado(id)

    if (!success) {
      return NextResponse.json({ success: false, error: "Invitado no encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Invitado eliminado correctamente",
    })
  } catch (error) {
    console.error("Error al eliminar invitado:", error)
    return NextResponse.json({ success: false, error: "Error al eliminar el invitado" }, { status: 500 })
  }
}

