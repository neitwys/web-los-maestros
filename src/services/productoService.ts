import type { Producto } from "../data/productosData";
import { ErrorApi, llamarApi } from "./api";

export type ProductoNuevo = Omit<Producto, "id">;

interface ProductoApi {
  id: number;
  codigo: string;
  nombre: string;
  marca: string;
  unidad: string;
  descripcion: string | null;
  precio: number;
  stock: number;
  imagenUrl: string | null;
  categoriaNombre: string;
}

interface CategoriaApi {
  id: number;
  nombre: string;
}

const RUTA = "/catalogo/productos";

function aProducto(p: ProductoApi): Producto {
  return {
    id: String(p.id),
    codigo: p.codigo,
    nombre: p.nombre,
    categoria: p.categoriaNombre,
    marca: p.marca,
    unidad: p.unidad,
    descripcion: p.descripcion ?? "",
    precio: p.precio,
    stock: p.stock,
    imagen: p.imagenUrl ?? "",
  };
}

async function aCuerpo(datos: ProductoNuevo) {
  const categorias = await llamarApi<CategoriaApi[]>("/catalogo/categorias/listar");
  const categoria = categorias.find((c) => c.nombre === datos.categoria);
  if (!categoria) throw new ErrorApi(400, "La categoría seleccionada no existe.");

  return {
    codigo: datos.codigo,
    nombre: datos.nombre,
    marca: datos.marca,
    unidad: datos.unidad,
    descripcion: datos.descripcion,
    precio: datos.precio,
    stock: datos.stock,
    imagenUrl: datos.imagen,
    categoriaId: categoria.id,
    activo: true,
  };
}

export async function obtenerProductos(): Promise<Producto[]> {
  const productos = await llamarApi<ProductoApi[]>(`${RUTA}/listar`);
  return productos.map(aProducto);
}

export async function obtenerProductoPorId(id: string): Promise<Producto | undefined> {
  try {
    return aProducto(await llamarApi<ProductoApi>(`${RUTA}/buscar/${id}`));
  } catch (error) {
    if (error instanceof ErrorApi && error.estado === 404) return undefined;
    throw error;
  }
}

export async function obtenerCategorias(): Promise<string[]> {
  const categorias = await llamarApi<CategoriaApi[]>("/catalogo/categorias/listar");
  return categorias.map((c) => c.nombre);
}

export async function crearProducto(datos: ProductoNuevo): Promise<Producto> {
  const creado = await llamarApi<ProductoApi>(`${RUTA}/crear`, {
    metodo: "POST",
    cuerpo: await aCuerpo(datos),
  });
  return aProducto(creado);
}

export async function actualizarProducto(id: string, datos: ProductoNuevo): Promise<Producto> {
  const actualizado = await llamarApi<ProductoApi>(`${RUTA}/actualizar/${id}`, {
    metodo: "PUT",
    cuerpo: await aCuerpo(datos),
  });
  return aProducto(actualizado);
}

export function eliminarProducto(id: string): Promise<void> {
  return llamarApi<void>(`${RUTA}/eliminar/${id}`, { metodo: "DELETE" });
}
