import type { ItemCarrito } from "./carritoService";
import { calcularTotalCarrito } from "./carritoService";

export interface Compra {
  id: string;
  fecha: string;
  items: ItemCarrito[];
  total: number;
}

const CLAVE_COMPRAS = "compras";

function leerCompras(): Compra[] {
  try {
    const guardado = localStorage.getItem(CLAVE_COMPRAS);
    if (!guardado) return [];
    const compras: unknown = JSON.parse(guardado);
    return Array.isArray(compras) ? compras as Compra[] : [];
  } catch {
    return [];
  }
}

export function obtenerCompras(): Compra[] {
  return leerCompras();
}

export function registrarCompra(items: ItemCarrito[]): Compra {
  if (items.length === 0) {
    throw new Error("No puedes pagar un carrito vacío.");
  }

  const compra: Compra = {
    id: `COMP-${Date.now()}`,
    fecha: new Date().toISOString(),
    items: items.map((item) => ({ ...item })),
    total: calcularTotalCarrito(items),
  };

  localStorage.setItem(CLAVE_COMPRAS, JSON.stringify([...leerCompras(), compra]));
  return compra;
}
