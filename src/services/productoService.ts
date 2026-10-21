import { type Producto, productosData } from '../data/productosData';

export type ProductoNuevo = Omit<Producto, 'id'>;

let productos: Producto[] = [...productosData];

export function obtenerProductos(): Producto[] {
  return [...productos];
}

export function obtenerProductoPorId(id: string): Producto | undefined {
  return productos.find((p) => p.id === id || p.codigo === id);
}

export function crearProducto(datos: ProductoNuevo): Producto {
  const correlativo = productos.length + 1;
  const nuevoId = `FER-${String(correlativo).padStart(3, '0')}`;
  
  const nuevoProducto: Producto = {
    ...datos,
    id: nuevoId,
    codigo: datos.codigo || nuevoId,
  };

  productos = [...productos, nuevoProducto];
  return nuevoProducto;
}

export function actualizarProducto(id: string, cambios: Partial<ProductoNuevo>): Producto | undefined {
  const existente = obtenerProductoPorId(id);
  if (!existente) return undefined;

  const actualizado: Producto = { ...existente, ...cambios };
  productos = productos.map((p) => (p.id === id ? actualizado : p));
  return actualizado;
}

export function eliminarProducto(id: string): boolean {
  const totalAntes = productos.length;
  productos = productos.filter((p) => p.id !== id);
  return productos.length < totalAntes;
}

export function reiniciarProductos(): void {
  productos = [...productosData];
}