export type RolUsuario = "Administrador" | "Cliente";

export interface Usuario {
  run: string;          
  nombre: string;
  apellidos: string;
  correo: string;
  rol: RolUsuario;
  fechaNac?: string;    
  region: string;
  comuna: string;
  direccion: string;
}


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