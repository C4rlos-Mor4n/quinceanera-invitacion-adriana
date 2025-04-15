import { kv } from "@vercel/kv"

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

// Clave para almacenar todos los invitados
const INVITADOS_KEY = "invitados"

// Obtener todos los invitados
export async function getAllInvitados(): Promise<Invitado[]> {
  try {
    const invitados = await kv.get<Invitado[]>(INVITADOS_KEY)
    return invitados || []
  } catch (error) {
    console.error("Error al obtener invitados de KV:", error)
    return []
  }
}

// Guardar todos los invitados
export async function saveAllInvitados(invitados: Invitado[]): Promise<boolean> {
  try {
    await kv.set(INVITADOS_KEY, invitados)
    return true
  } catch (error) {
    console.error("Error al guardar invitados en KV:", error)
    return false
  }
}

// Obtener un invitado por ID
export async function getInvitadoById(id: string): Promise<Invitado | null> {
  const invitados = await getAllInvitados()
  return invitados.find((inv) => inv.id === id) || null
}

// Obtener un invitado por URL única
export async function getInvitadoByUrl(url: string): Promise<Invitado | null> {
  const invitados = await getAllInvitados()
  return invitados.find((inv) => inv.urlUnica.toLowerCase() === url.toLowerCase()) || null
}

// Añadir un nuevo invitado
export async function addInvitado(invitadoData: {
  nombre: string
  email?: string
  telefono?: string
  numeroInvitados: number
}): Promise<Invitado> {
  const invitados = await getAllInvitados()

  const id = crypto.randomUUID()
  const urlUnica = generateUniqueUrl(invitadoData.nombre, invitados)

  const nuevoInvitado: Invitado = {
    id,
    ...invitadoData,
    confirmado: false,
    numeroInvitados: Number(invitadoData.numeroInvitados) || 1,
    urlUnica,
  }

  invitados.push(nuevoInvitado)
  await saveAllInvitados(invitados)

  return nuevoInvitado
}

// Actualizar un invitado existente
export async function updateInvitado(id: string, data: Partial<Invitado>): Promise<Invitado | null> {
  const invitados = await getAllInvitados()
  const index = invitados.findIndex((inv) => inv.id === id)

  if (index === -1) return null

  invitados[index] = { ...invitados[index], ...data }
  await saveAllInvitados(invitados)

  return invitados[index]
}

// Eliminar un invitado
export async function deleteInvitado(id: string): Promise<boolean> {
  const invitados = await getAllInvitados()
  const filteredInvitados = invitados.filter((inv) => inv.id !== id)

  if (filteredInvitados.length === invitados.length) {
    return false // No se encontró el invitado
  }

  return await saveAllInvitados(filteredInvitados)
}

// Confirmar asistencia de un invitado
export async function confirmarAsistencia(id: string): Promise<Invitado | null> {
  return updateInvitado(id, {
    confirmado: true,
    fechaConfirmacion: new Date().toISOString(),
  })
}

// Generar una URL única para un invitado
function generateUniqueUrl(nombre: string, existingInvitados: Invitado[]): string {
  const normalizedName = nombre
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "-")

  const randomString = Math.random().toString(36).substring(2, 8)
  const urlUnica = `${normalizedName}-${randomString}`

  // Verificar que la URL sea única
  const exists = existingInvitados.some((inv) => inv.urlUnica === urlUnica)
  if (exists) {
    // Si ya existe, generar otra
    return generateUniqueUrl(nombre, existingInvitados)
  }

  return urlUnica
}

// Crear un invitado temporal basado en la URL
export function crearInvitadoTemporal(url: string): Invitado {
  const urlParts = url.split("-")
  let nombrePosible = ""

  if (urlParts.length > 1) {
    const nombrePartes = urlParts.slice(0, -1)
    nombrePosible = nombrePartes
      .join(" ")
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return {
    id: `temp-${url}`,
    nombre: nombrePosible || "Invitado",
    confirmado: false,
    numeroInvitados: 1,
    urlUnica: url,
  }
}

