import type { RolUsuario } from "../data/usuariosData";
import { obtenerUsuarios } from "./usuarioService";
import { errorClave } from "../utils/validaciones";

export interface Sesion {
  correo: string;
  rol: RolUsuario;
  fecha: string; // Fecha y hora de inicio de sesión (formato ISO)
  nombre?: string;
}

export type ResultadoLogin =
  | { ok: true; sesion: Sesion; error?: string }
  | { ok: false; error: string; sesion?: Sesion };

  
const CLAVE_STORAGE = "sesionActiva";
export const EVENTO_SESION = "sesion-actualizada";
export const CORREO_ADMIN = "admin@losmaestros.cl";
const CLAVE_ADMIN = "1234";

/** Inicia sesión según las reglas de la tienda y guarda la sesión en localStorage. */
export function iniciarSesion(correo: string, clave: string): ResultadoLogin {
  const correoLimpio = correo.trim().toLowerCase();
  const claveLimpia = clave.trim();

  let rol: RolUsuario = "Cliente";

  if (correoLimpio === CORREO_ADMIN) {
    if (claveLimpia !== CLAVE_ADMIN) {
      return { ok: false, error: "Contraseña de administrador incorrecta." };
    }
    rol = "Administrador";
  } else {
    const error = errorClave(claveLimpia);
    if (error !== "") return { ok: false, error };

    const usuario = obtenerUsuarios().find((u) => u.correo.toLowerCase() === correoLimpio);
    if (!usuario || usuario.clave !== claveLimpia) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }
    rol = usuario.rol;
  }

  const usuario = obtenerUsuarios().find((u) => u.correo.toLowerCase() === correoLimpio);
  const nombre = rol === "Administrador" ? "Admin" : usuario?.nombre ?? correoLimpio.split("@")[0];
  const sesion: Sesion = { correo: correoLimpio, rol, fecha: new Date().toISOString(), nombre };
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(sesion));
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
  return { ok: true, sesion };
}

/** Devuelve la sesión activa, o null si no hay sesión (o los datos guardados están dañados). */
export function obtenerSesion(): Sesion | null {
  const guardada = localStorage.getItem(CLAVE_STORAGE);
  if (!guardada) return null;

  try {
    return JSON.parse(guardada) as Sesion;
  } catch {
    return null;
  }
}

/** Cierra la sesión eliminando los datos guardados. */
export function cerrarSesion(): void {
  localStorage.removeItem(CLAVE_STORAGE);
  window.dispatchEvent(new CustomEvent(EVENTO_SESION));
}
