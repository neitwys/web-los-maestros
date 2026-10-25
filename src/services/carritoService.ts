import type { Producto } from "../data/productosData";

export interface ItemCarrito extends Producto {
  cantidad: number;
}

const CLAVE_CARRITO = "carrito";
export const EVENTO_CARRITO = "carrito-actualizado";

function leerCarrito(): ItemCarrito[] {
  if (typeof window === "undefined") return [];

  try {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    if (!guardado) return [];
    const items: unknown = JSON.parse(guardado);
    if (!Array.isArray(items)) return [];

    return items.filter(
      (item): item is ItemCarrito =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "cantidad" in item &&
        typeof item.cantidad === "number" &&
        item.cantidad > 0
    );
  } catch {
    return [];
  }
}

function guardarCarrito(items: ItemCarrito[]): void {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENTO_CARRITO));
}

export function obtenerCarrito(): ItemCarrito[] {
  return leerCarrito();
}

export function agregarAlCarrito(producto: Producto, cantidad = 1): ItemCarrito[] {
  const items = leerCarrito();
  const existente = items.find((item) => item.id === producto.id);

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    items.push({ ...producto, cantidad });
  }

  guardarCarrito(items);
  return items;
}

export function cambiarCantidadCarrito(id: string, cantidad: number): ItemCarrito[] {
  const items = leerCarrito()
    .map((item) => (item.id === id ? { ...item, cantidad } : item))
    .filter((item) => item.cantidad > 0);
  guardarCarrito(items);
  return items;
}

export function eliminarDelCarrito(id: string): ItemCarrito[] {
  return cambiarCantidadCarrito(id, 0);
}

export function vaciarCarrito(): void {
  guardarCarrito([]);
}

export function calcularTotalCarrito(items = leerCarrito()): number {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

export function calcularCantidadCarrito(items = leerCarrito()): number {
  return items.reduce((total, item) => total + item.cantidad, 0);
}
