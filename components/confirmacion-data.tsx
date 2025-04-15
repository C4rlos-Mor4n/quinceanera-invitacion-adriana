import {
  getInvitadoById,
  confirmarAsistencia,
  addInvitado,
} from "@/services/api";

export async function getInvitadoData(id: string) {
  try {
    const foundInvitado = await getInvitadoById(id);

    if (foundInvitado) {
      return {
        invitado: foundInvitado,
        confirmado: foundInvitado.confirmado || false,
        esInvitadoTemporal: false,
        error: null,
      };
    }

    if (id.startsWith("temp-")) {
      const urlUnica = id.replace("temp-", "");
      const invitadoTemporal = {
        id: `temp-${urlUnica}`,
        nombre: "Invitado",
        confirmado: false,
        numeroInvitados: 1,
        urlUnica: urlUnica,
      };

      return {
        invitado: invitadoTemporal,
        confirmado: false,
        esInvitadoTemporal: true,
        error: null,
      };
    }

    return {
      invitado: null,
      confirmado: false,
      esInvitadoTemporal: false,
      error: "No se encontró la información del invitado",
    };
  } catch (error) {
    console.error("Error al buscar invitado:", error);
    return {
      invitado: null,
      confirmado: false,
      esInvitadoTemporal: false,
      error: "Ocurrió un error al cargar la información",
    };
  }
}

export async function handleConfirmacion(
  id: string,
  esInvitadoTemporal: boolean,
  invitado: any
) {
  try {
    if (esInvitadoTemporal) {
      if (invitado) {
        const nuevoInvitado = await addInvitado({
          nombre: invitado.nombre,
          numeroInvitados: invitado.numeroInvitados,
          email: "",
          telefono: "",
        });

        if (nuevoInvitado) {
          await confirmarAsistencia(nuevoInvitado.id);
          return {
            success: true,
            invitado: nuevoInvitado,
            error: null,
          };
        }
      }
    } else {
      const invitadoActualizado = await confirmarAsistencia(id);
      return {
        success: true,
        invitado: invitadoActualizado,
        error: null,
      };
    }
  } catch (error) {
    console.error("Error al confirmar asistencia:", error);
    return {
      success: false,
      invitado: null,
      error: "Ocurrió un error al confirmar la asistencia",
    };
  }
}
