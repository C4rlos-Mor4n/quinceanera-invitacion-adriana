"use server"

import fs from "fs"
import path from "path"
import { revalidatePath } from "next/cache"

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

// Ruta al archivo JSON (relativa a la raíz del proyecto)
const DATA_FILE_PATH = path.join(process.cwd(), "data", "invitados.json")

// Asegurarse de que el directorio data existe
async function ensureDirectoryExists() {
  const dir = path.dirname(DATA_FILE_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Leer todos los invitados del archivo JSON
export async function getInvitados(): Promise<Invitado[]> {
  try {
    await ensureDirectoryExists()

    if (!fs.existsSync(DATA_FILE_PATH)) {
      // Si el archivo no existe, crear uno vacío
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([]), "utf8")
      return []
    }

    const data = fs.readFileSync(DATA_FILE_PATH, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error al leer invitados:", error)
    return []
  }
}

// Guardar todos los invitados en el archivo JSON
async function saveInvitados(invitados: Invitado[]): Promise<boolean> {
  try {
    await ensureDirectoryExists()
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(invitados, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error al guardar invitados:", error)
    return false
  }
}

// Obtener un invitado por ID
export async function getInvitadoById(id: string): Promise<Invitado | null> {
  const invitados = await getInvitados()
  return invitados.find((inv) => inv.id === id) || null
}

// Obtener un invitado por URL única
export async function getInvitadoByUrl(url: string): Promise<Invitado | null> {
  const invitados = await getInvitados()
  return invitados.find((inv) => inv.urlUnica.toLowerCase() === url.toLowerCase()) || null
}

// Añadir un nuevo invitado
export async function addInvitado(invitadoData: Omit<Invitado, "id" | "urlUnica" | "confirmado">): Promise<Invitado> {
  const invitados = await getInvitados()

  const id = crypto.randomUUID()
  const urlUnica = await generateUniqueUrl(invitadoData.nombre, invitados)

  const nuevoInvitado: Invitado = {
    id,
    ...invitadoData,
    confirmado: false,
    urlUnica,
  }

  invitados.push(nuevoInvitado)
  await saveInvitados(invitados)

  // Revalidar las rutas para actualizar los datos
  revalidatePath("/admin")

  return nuevoInvitado
}

// Actualizar un invitado existente
export async function updateInvitado(id: string, data: Partial<Invitado>): Promise<Invitado | null> {
  const invitados = await getInvitados()
  const index = invitados.findIndex((inv) => inv.id === id)

  if (index === -1) return null

  invitados[index] = { ...invitados[index], ...data }
  await saveInvitados(invitados)

  // Revalidar las rutas para actualizar los datos
  revalidatePath("/admin")
  revalidatePath(`/confirmar/${id}`)

  return invitados[index]
}

// Eliminar un invitado
export async function deleteInvitado(id: string): Promise<boolean> {
  const invitados = await getInvitados()
  const filteredInvitados = invitados.filter((inv) => inv.id !== id)

  if (filteredInvitados.length === invitados.length) {
    return false // No se encontró el invitado
  }

  const result = await saveInvitados(filteredInvitados)

  // Revalidar las rutas para actualizar los datos
  revalidatePath("/admin")

  return result
}

// Confirmar asistencia de un invitado
export async function confirmarAsistencia(id: string): Promise<Invitado | null> {
  return updateInvitado(id, {
    confirmado: true,
    fechaConfirmacion: new Date().toISOString(),
  })
}

// Importar invitados desde un JSON
export async function importarInvitados(invitados: Invitado[]): Promise<boolean> {
  const result = await saveInvitados(invitados)

  // Revalidar las rutas para actualizar los datos
  revalidatePath("/admin")

  return result
}

// Generar una URL única para un invitado
async function generateUniqueUrl(nombre: string, existingInvitados: Invitado[]): Promise<string> {
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
export async function crearInvitadoTemporal(url: string): Promise<Invitado> {
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

