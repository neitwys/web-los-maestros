import { llamarApi } from "./api";
import { obtenerSesion } from "./sesionService";

export interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface CarritoApi {
  items: {
    productoId: number;
    nombreProducto: string;
    precioUnitario: number;
    cantidad: number;
  }[];
}

export const EVENTO_CARRITO = "carrito-actualizado";

let carrito: ItemCarrito[] = [];
let cola: Promise<unknown> = Promise.resolve();

function enCola<T>(tarea: () => Promise<T>): Promise<T> {
  const resultado = cola.then(tarea, tarea);
  cola = resultado.catch(() => undefined);
  return resultado;
}

function guardar(datos: CarritoApi): ItemCarrito[] {
  carrito = datos.items.map((item) => ({
    id: String(item.productoId),
    nombre: item.nombreProducto,
    precio: item.precioUnitario,
    cantidad: item.cantidad,
  }));
  window.dispatchEvent(new CustomEvent(EVENTO_CARRITO));
  return carrito;
}

function rutaUsuario(): string {
  const sesion = obtenerSesion();
  if (!sesion) throw new Error("Debes iniciar sesión para usar el carrito.");
  return `/carrito/carritos/usuario/${sesion.id}`;
}

export function obtenerCarrito(): ItemCarrito[] {
  return carrito;
}

export async function cargarCarrito(): Promise<ItemCarrito[]> {
  const sesion = obtenerSesion();
  if (!sesion) return guardar({ items: [] });
  return guardar(await llamarApi<CarritoApi>(`/carrito/carritos/buscar/usuario/${sesion.id}`));
}

export function agregarAlCarrito(productoId: string, cantidad = 1): Promise<ItemCarrito[]> {
  return enCola(async () => {
    const datos = await llamarApi<CarritoApi>(`${rutaUsuario()}/agregar`, {
      metodo: "POST",
      cuerpo: { productoId: Number(productoId), cantidad },
    });
    return guardar(datos);
  });
}

export function cambiarCantidadCarrito(productoId: string, cantidad: number): Promise<ItemCarrito[]> {
  return enCola(async () => {
    const datos = await llamarApi<CarritoApi>(`${rutaUsuario()}/actualizar/${productoId}`, {
      metodo: "PUT",
      cuerpo: { cantidad },
    });
    return guardar(datos);
  });
}

export function eliminarDelCarrito(productoId: string): Promise<ItemCarrito[]> {
  return enCola(async () => {
    const datos = await llamarApi<CarritoApi>(`${rutaUsuario()}/eliminar/${productoId}`, { metodo: "DELETE" });
    return guardar(datos);
  });
}

export function vaciarCarrito(): Promise<ItemCarrito[]> {
  return enCola(async () => {
    await llamarApi<void>(`${rutaUsuario()}/vaciar`, { metodo: "DELETE" });
    return guardar({ items: [] });
  });
}

export function calcularTotalCarrito(items = carrito): number {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

export function calcularCantidadCarrito(items = carrito): number {
  return items.reduce((total, item) => total + item.cantidad, 0);
}
