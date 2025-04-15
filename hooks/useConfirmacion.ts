import { useState, useCallback } from "react";
import {
  getInvitadoData,
  handleConfirmacion,
} from "@/components/confirmacion-data";

export function useConfirmacion(id: string) {
  const [invitado, setInvitado] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [confirmado, setConfirmado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [esInvitadoTemporal, setEsInvitadoTemporal] = useState(false);
  const [redirigiendo, setRedirigiendo] = useState(false);
  const [contador, setContador] = useState(5);

  const cargarDatos = useCallback(async () => {
    try {
      const data = await getInvitadoData(id);
      setInvitado(data.invitado);
      setConfirmado(data.confirmado);
      setEsInvitadoTemporal(data.esInvitadoTemporal);
      setError(data.error);
    } catch (err) {
      setError("Ocurrió un error al cargar la información");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const confirmar = useCallback(async () => {
    try {
      const result = await handleConfirmacion(id, esInvitadoTemporal, invitado);
      if (result?.success) {
        setInvitado(result.invitado);
        setConfirmado(true);
        setRedirigiendo(true);
      } else if (result?.error) {
        alert(result.error);
      }
    } catch (err) {
      alert("Ocurrió un error al confirmar la asistencia");
    }
  }, [id, esInvitadoTemporal, invitado]);

  return {
    invitado,
    loading,
    confirmado,
    error,
    esInvitadoTemporal,
    redirigiendo,
    contador,
    setContador,
    cargarDatos,
    confirmar,
  };
}
