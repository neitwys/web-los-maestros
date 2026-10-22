export interface Region {
  region: string;
  comunas: string[];
}

// Regiones y comunas disponibles en el formulario de usuarios (zona admin)
export const regionesData: Region[] = [
  {
    region: "Metropolitana de Santiago",
    comunas: ["Santiago", "Maipú", "Puente Alto", "Providencia", "Las Condes", "La Florida"],
  },
  {
    region: "Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],
  },
  {
    region: "Bío-Bío",
    comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Chillán", "Coronel"],
  },
];

/** Devuelve las comunas de una región, o un arreglo vacío si no existe. */
export function obtenerComunas(nombreRegion: string): string[] {
  const encontrada = regionesData.find((r) => r.region === nombreRegion);
  return encontrada ? encontrada.comunas : [];
}