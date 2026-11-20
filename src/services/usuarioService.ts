import type { Usuario } from "../data/usuariosData";
import { llamarApi } from "./api";

export interface DatosRegistroApi {
  nombre: string;
  apellido?: string;
  run: string;
  correo: string;
  contrasena: string;
  telefono: string;
}

export function registrarUsuario(datos: DatosRegistroApi): Promise<Usuario> {
  return llamarApi<Usuario>("/autenticacion/auth/registro", {
    metodo: "POST",
    cuerpo: datos,
    sinToken: true,
  });
}

export function obtenerUsuarios(): Promise<Usuario[]> {
  return llamarApi<Usuario[]>("/autenticacion/usuarios/listar");
}

export interface UsuarioCambios {
  nombre: string;
  apellido: string;
  telefono: string;
}

export function actualizarUsuario(id: number, cambios: UsuarioCambios): Promise<Usuario> {
  return llamarApi<Usuario>(`/autenticacion/usuarios/actualizar/${id}`, {
    metodo: "PUT",
    cuerpo: cambios,
  });
}

export function eliminarUsuario(id: number): Promise<void> {
  return llamarApi<void>(`/autenticacion/usuarios/eliminar/${id}`, { metodo: "DELETE" });
}
