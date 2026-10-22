import { type Usuario, usuariosData } from "../data/usuariosData";

export type UsuarioCambios = Partial<Omit<Usuario, "run">>;

// Fuente de datos simulada en memoria
let usuarios: Usuario[] = [...usuariosData];

/** Deja el RUN sin puntos ni guion y en mayúsculas (ej: 12.345.678-k -> 12345678K). */
export function normalizarRun(run: string): string {
  return run.replace(/[^0-9kK]/g, "").toUpperCase();
}

/** READ: todos los usuarios */
export function obtenerUsuarios(): Usuario[] {
  return [...usuarios];
}

/** READ: un usuario por su RUN */
export function obtenerUsuarioPorRun(run: string): Usuario | undefined {
  const buscado = normalizarRun(run);
  return usuarios.find((u) => u.run === buscado);
}

/** CREATE: agrega un usuario. Lanza un error si el RUN ya está registrado. */
export function crearUsuario(datos: Usuario): Usuario {
  const run = normalizarRun(datos.run);

  if (obtenerUsuarioPorRun(run)) {
    throw new Error("Ya existe un usuario con ese RUN.");
  }

  const nuevo: Usuario = { ...datos, run };
  usuarios = [...usuarios, nuevo];
  return nuevo;
}

/** UPDATE: modifica los datos de un usuario (el RUN no se puede cambiar). */
export function actualizarUsuario(run: string, cambios: UsuarioCambios): Usuario | undefined {
  const existente = obtenerUsuarioPorRun(run);
  if (!existente) return undefined;

  const actualizado: Usuario = { ...existente, ...cambios };
  usuarios = usuarios.map((u) => (u.run === existente.run ? actualizado : u));
  return actualizado;
}

/** DELETE: elimina un usuario. Devuelve true si se eliminó. */
export function eliminarUsuario(run: string): boolean {
  const buscado = normalizarRun(run);
  const totalAntes = usuarios.length;
  usuarios = usuarios.filter((u) => u.run !== buscado);
  return usuarios.length < totalAntes;
}

/** RESET: vuelve a los datos iniciales (útil en las pruebas). */
export function reiniciarUsuarios(): void {
  usuarios = [...usuariosData];
}