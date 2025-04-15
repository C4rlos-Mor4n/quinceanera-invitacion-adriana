// Definir la interfaz para los invitados
export interface Invitado {
  id: string
  nombre: string
  email?: string
  telefono?: string
  confirmado: boolean
  fechaConfirmacion?: string
  numeroInvitados: number
  urlUnica: string
}

// Función para manejar errores de fetch
const handleFetchError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.error || `Error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

// Obtener todos los invitados
export async function getInvitados(): Promise<Invitado[]> {
  const response = await fetch("/api/invitados")
  const data = await handleFetchError(response)
  return data.success ? data.data : []
}

// Obtener un invitado por ID
export async function getInvitadoById(id: string): Promise<Invitado | null> {
  try {
    const response = await fetch(`/api/invitados/${id}`)
    const data = await handleFetchError(response)
    return data.success ? data.data : null
  } catch (error) {
    console.error("Error al obtener invitado por ID:", error)
    return null
  }
}

// Obtener un invitado por URL única
export async function getInvitadoByUrl(url: string): Promise<Invitado | null> {
  try {
    const response = await fetch(`/api/invitados/url/${url}`)
    const data = await handleFetchError(response)
    return data.success ? data.data : null
  } catch (error) {
    console.error("Error al obtener invitado por URL:", error)
    return null
  }
}

// Añadir un nuevo invitado
export async function addInvitado(invitadoData: {
  nombre: string
  email?: string
  telefono?: string
  numeroInvitados: number
}): Promise<Invitado | null> {
  try {
    const response = await fetch("/api/invitados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invitadoData),
    })
    const data = await handleFetchError(response)
    return data.success ? data.data : null
  } catch (error) {
    console.error("Error al añadir invitado:", error)
    return null
  }
}

// Actualizar un invitado
export async function updateInvitado(id: string, updates: Partial<Invitado>): Promise<Invitado | null> {
  try {
    const response = await fetch(`/api/invitados/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })
    const data = await handleFetchError(response)
    return data.success ? data.data : null
  } catch (error) {
    console.error("Error al actualizar invitado:", error)
    return null
  }
}

// Eliminar un invitado
export async function deleteInvitado(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/invitados/${id}`, {
      method: "DELETE",
    })
    const data = await handleFetchError(response)
    return data.success
  } catch (error) {
    console.error("Error al eliminar invitado:", error)
    return false
  }
}

// Confirmar asistencia
export async function confirmarAsistencia(id: string): Promise<Invitado | null> {
  try {
    const response = await fetch(`/api/invitados/${id}/confirmar`, {
      method: "POST",
    })
    const data = await handleFetchError(response)
    return data.success ? data.data : null
  } catch (error) {
    console.error("Error al confirmar asistencia:", error)
    return null
  }
}

// Obtener invitados confirmados
export async function getInvitadosConfirmados(): Promise<Invitado[]> {
  try {
    const response = await fetch("/api/invitados/confirmados")
    const data = await handleFetchError(response)
    return data.success ? data.data : []
  } catch (error) {
    console.error("Error al obtener invitados confirmados:", error)
    return []
  }
}

// Importar invitados
export async function importarInvitados(invitados: Invitado[]): Promise<boolean> {
  try {
    const response = await fetch("/api/invitados/importar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invitados }),
    })
    const data = await handleFetchError(response)
    return data.success
  } catch (error) {
    console.error("Error al importar invitados:", error)
    return false
  }
}

