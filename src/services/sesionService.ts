import type { RolUsuario, Usuario } from "../data/usuariosData";
import { CLAVE_SESION, ErrorApi, EVENTO_SESION, llamarApi } from "./api";

export { EVENTO_SESION };

export interface Sesion {
  token: string;
  id: number;
  correo: string;
  rol: RolUsuario;
  nombre: string;
  fecha: string;
}

export type ResultadoLogin =
  | { ok: true; sesion: Sesion; error?: string }
  | { ok: false; error: string; sesion?: Sesion };

interface RespuestaLogin {
  token: string;
  usuario: Usuario;
}

function tokenExpirado(token: string): boolean {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4)));
    return typeof exp !== "number" || exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function esSesionValida(dato: unknown): dato is Sesion {
  if (typeof dato !== "object" || dato === null) return false;
  const sesion = dato as Partial<Sesion>;
  return (
    typeof sesion.token === "string" &&
    typeof sesion.id === "number" &&
    typeof sesion.correo === "string" &&
    (sesion.rol === "ADMIN" || sesion.rol === "CLIENTE") &&
    !tokenExpirado(sesion.token)
  );
}

export async function iniciarSesion(correo: string, clave: string): Promise<ResultadoLogin> {
  try {
    const respuesta = await llamarApi<RespuestaLogin>("/autenticacion/auth/login", {
      metodo: "POST",
      cuerpo: { correo: correo.trim().toLowerCase(), contrasena: clave },
      sinToken: true,
    });

    const { usuario } = respuesta;
    const sesion: Sesion = {
      token: respuesta.token,
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol,
      nombre: usuario.nombre,
      fecha: new Date().toISOString(),
    };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    window.dispatchEvent(new CustomEvent(EVENTO_SESION));
    return { ok: true, sesion };
  } catch (error) {
    return { ok: false, error: error instanceof ErrorApi ? error.message : "No se pudo iniciar sesión." };
  }
}

export function obtenerSesion(): Sesion | null {
  const guardada = localStorage.getItem(CLAVE_SESION);
  if (!guardada) return null;

  try {
    const dato: unknown = JSON.parse(guardada);
    if (esSesionValida(dato)) return dato;
  } catch {
    return null;
  }

  localStorage.removeItem(CLAVE_SESION);
  return null;
}

export function cerrarSesion(): void {
  localStorage.removeItem(CLAVE_SESION);
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
}
