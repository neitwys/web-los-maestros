export type RolUsuario = "ADMIN" | "CLIENTE";

export interface Usuario {
  id: number;
  run: string;
  nombre: string;
  apellido?: string | null;
  correo: string;
  telefono: string;
  rol: RolUsuario;
  activo: boolean;
}
