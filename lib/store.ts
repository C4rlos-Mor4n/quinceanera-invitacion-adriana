// Almacenamiento basado en archivos JSON para invitados y confirmaciones
interface Invitado {
  id: string
  nombre: string
  email?: string
  telefono?: string
  confirmado: boolean
  fechaConfirmacion?: Date | string
  numeroInvitados: number
  urlUnica: string
}

class InvitadosStore {
  private invitados: Map<string, Invitado> = new Map()
  private initialized = false

  constructor() {
    // Inicializar con datos de ejemplo solo si es la primera vez
    if (typeof window !== "undefined") {
      try {
        // Intentamos cargar desde sessionStorage para mantener datos durante la sesión
        const sessionData = sessionStorage.getItem("invitados_temp")
        if (sessionData) {
          const parsed = JSON.parse(sessionData)
          parsed.forEach((invitado: Invitado) => {
            this.invitados.set(invitado.id, invitado)
          })
          this.initialized = true
        }
      } catch (error) {
        console.error("Error al cargar datos temporales:", error)
      }
    }
  }

  // Guardar datos temporalmente en sessionStorage (solo para la sesión actual)
  private saveToSession() {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("invitados_temp", JSON.stringify(Array.from(this.invitados.values())))
      } catch (error) {
        console.error("Error al guardar datos temporales:", error)
      }
    }
  }

  // Obtener todos los invitados
  getAll(): Invitado[] {
    return Array.from(this.invitados.values())
  }

  // Obtener invitado por ID
  getById(id: string): Invitado | undefined {
    return this.invitados.get(id)
  }

  // Obtener invitado por URL única
  getByUrl(url: string): Invitado | undefined {
    return Array.from(this.invitados.values()).find((invitado) => invitado.urlUnica.toLowerCase() === url.toLowerCase())
  }

  // Añadir nuevo invitado
  add(invitado: Omit<Invitado, "id" | "urlUnica" | "confirmado">): Invitado {
    const id = crypto.randomUUID()
    const urlUnica = this.generateUniqueUrl(invitado.nombre)

    const nuevoInvitado: Invitado = {
      id,
      ...invitado,
      confirmado: false,
      urlUnica,
    }

    this.invitados.set(id, nuevoInvitado)
    this.saveToSession()

    console.log("Invitado añadido:", nuevoInvitado)
    return nuevoInvitado
  }

  // Actualizar invitado existente
  update(id: string, data: Partial<Invitado>): Invitado | undefined {
    const invitado = this.invitados.get(id)
    if (!invitado) return undefined

    const updatedInvitado = { ...invitado, ...data }
    this.invitados.set(id, updatedInvitado)
    this.saveToSession()
    return updatedInvitado
  }

  // Eliminar invitado
  delete(id: string): boolean {
    const result = this.invitados.delete(id)
    this.saveToSession()
    return result
  }

  // Confirmar asistencia de invitado
  confirmarAsistencia(id: string): Invitado | undefined {
    const invitado = this.invitados.get(id)
    if (!invitado) return undefined

    const updatedInvitado = {
      ...invitado,
      confirmado: true,
      fechaConfirmacion: new Date().toISOString(),
    }

    this.invitados.set(id, updatedInvitado)
    this.saveToSession()
    return updatedInvitado
  }

  // Exportar todos los invitados a un archivo JSON
  exportarJSON(): string {
    return JSON.stringify(Array.from(this.invitados.values()), null, 2)
  }

  // Exportar solo invitados confirmados a un archivo JSON
  exportarConfirmadosJSON(): string {
    const confirmados = Array.from(this.invitados.values()).filter((inv) => inv.confirmado)
    return JSON.stringify(confirmados, null, 2)
  }

  // Importar invitados desde un archivo JSON
  importarInvitados(invitados: Invitado[]): void {
    // Limpiar el mapa actual
    this.invitados.clear()

    // Añadir los invitados importados
    invitados.forEach((invitado) => {
      this.invitados.set(invitado.id, invitado)
    })

    // Guardar en sessionStorage
    this.saveToSession()
    this.initialized = true
  }

  // Generar URL única para un invitado
  private generateUniqueUrl(nombre: string): string {
    const normalizedName = nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "-")

    const randomString = Math.random().toString(36).substring(2, 8)
    return `${normalizedName}-${randomString}`
  }

  // Verificar si hay datos cargados
  isInitialized(): boolean {
    return this.initialized
  }

  // Crear invitado temporal basado en URL
  crearInvitadoTemporal(url: string): Invitado {
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

    const invitadoTemporal: Invitado = {
      id: `temp-${url}`,
      nombre: nombrePosible || "Invitado",
      confirmado: false,
      numeroInvitados: 1,
      urlUnica: url,
    }

    return invitadoTemporal
  }
}

// Singleton para usar en toda la aplicación
export const invitadosStore = new InvitadosStore()

