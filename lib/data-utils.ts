import fs from "fs"
import path from "path"

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
export function ensureDirectoryExists() {
  const dir = path.dirname(DATA_FILE_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Leer todos los invitados del archivo JSON
export function readInvitados(): Invitado[] {
  try {
    ensureDirectoryExists()

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
export function saveInvitados(invitados: Invitado[]): boolean {
  try {
    ensureDirectoryExists()
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(invitados, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error al guardar invitados:", error)
    return false
  }
}

// Generar una URL única para un invitado
export function generateUniqueUrl(nombre: string, existingInvitados: Invitado[]): string {
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

