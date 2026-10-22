import { type Producto, productosData } from '../data/productosData';

export type ProductoNuevo = Omit<Producto, 'id'>;

let productos: Producto[] = [...productosData];

export function obtenerProductos(): Producto[] {
  return [...productos];
}

export function obtenerProductoPorId(id: string): Producto | undefined {
  return productos.find((p) => p.id === id || p.codigo === id);
}


function generarId(): string {
  const mayor = productos.reduce((max, p) => {
    const coincidencia = /^FER-(\d+)$/.exec(p.id);
    return coincidencia ? Math.max(max, Number(coincidencia[1])) : max;
  }, 0);
  return `FER-${String(mayor + 1).padStart(3, '0')}`;
}

export function crearProducto(datos: ProductoNuevo): Producto {
  const codigoIngresado = datos.codigo.trim();

  if (codigoIngresado !== '' && obtenerProductoPorId(codigoIngresado)) {
    throw new Error('Ya existe un producto con ese código.');
  }

  const nuevoId = generarId();

  const nuevoProducto: Producto = {
    ...datos,
    id: nuevoId,
    codigo: codigoIngresado || nuevoId,
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