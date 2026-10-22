export type RolUsuario = "Administrador" | "Cliente";

export interface Usuario {
  run: string;          // Identificador único del usuario (sin puntos ni guion)
  nombre: string;
  apellidos: string;
  correo: string;
  rol: RolUsuario;
  fechaNac?: string;    // Opcional, formato AAAA-MM-DD
  region: string;
  comuna: string;
  direccion: string;
}

// Usuarios iniciales de la tienda (el CRUD vive en services/usuarioService.ts)
export const usuariosData: Usuario[] = [
  {
    run: "111111111",
    nombre: "Admin",
    apellidos: "Los Maestros",
    correo: "admin@losmaestros.cl",
    rol: "Administrador",
    region: "Metropolitana de Santiago",
    comuna: "Santiago",
    direccion: "Av. Central 100",
  },
];