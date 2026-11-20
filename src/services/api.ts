export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8090";
export const CLAVE_SESION = "sesionActiva";
export const EVENTO_SESION = "sesion-actualizada";

export class ErrorApi extends Error {
  estado: number;

  constructor(estado: number, mensaje: string) {
    super(mensaje);
    this.estado = estado;
  }
}

interface OpcionesApi {
  metodo?: string;
  cuerpo?: unknown;
  sinToken?: boolean;
}

function leerToken(): string | null {
  try {
    const guardada = localStorage.getItem(CLAVE_SESION);
    return guardada ? (JSON.parse(guardada).token ?? null) : null;
  } catch {
    return null;
  }
}

function mensajeDeError(cuerpo: unknown, estado: number): string {
  if (cuerpo && typeof cuerpo === "object") {
    const { mensaje, errores } = cuerpo as { mensaje?: string; errores?: Record<string, string> };
    if (errores) return Object.values(errores).join(" ");
    if (mensaje) return mensaje;
  }
  return `Error ${estado}`;
}

export async function llamarApi<T>(ruta: string, opciones: OpcionesApi = {}): Promise<T> {
  const token = opciones.sinToken ? null : leerToken();
  const encabezados: Record<string, string> = {};
  if (opciones.cuerpo !== undefined) encabezados["Content-Type"] = "application/json";
  if (token) encabezados.Authorization = `Bearer ${token}`;

  let respuesta: Response;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      method: opciones.metodo ?? "GET",
      headers: encabezados,
      body: opciones.cuerpo === undefined ? undefined : JSON.stringify(opciones.cuerpo),
      signal: AbortSignal.timeout(10000),
    });
  } catch {
    throw new ErrorApi(0, "No se pudo conectar con el servidor.");
  }

  if (respuesta.status === 204) return undefined as T;

  const texto = await respuesta.text();
  let cuerpo: unknown;
  try {
    cuerpo = texto ? JSON.parse(texto) : null;
  } catch {
    cuerpo = null;
  }

  if (!respuesta.ok) {
    if (respuesta.status === 401 && token) {
      localStorage.removeItem(CLAVE_SESION);
      window.dispatchEvent(new CustomEvent(EVENTO_SESION));
      window.location.assign("/login");
    }
    throw new ErrorApi(respuesta.status, mensajeDeError(cuerpo, respuesta.status));
  }

  return cuerpo as T;
}
