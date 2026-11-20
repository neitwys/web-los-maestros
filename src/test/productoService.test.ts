import { afterEach, describe, expect, it, vi } from 'vitest';
import { obtenerProductoPorId, obtenerProductos } from '../services/productoService';

const productoApi = {
  id: 1,
  codigo: 'MC001',
  nombre: 'Cemento Polpaico gris 25 kg',
  marca: 'Polpaico',
  unidad: 'Saco',
  descripcion: null,
  precio: 5990,
  stock: 80,
  imagenUrl: 'img/polpaico.jpg',
  categoriaId: 1,
  categoriaNombre: 'Mat. Construcción',
};

describe('Servicio de productos', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('Convierte los productos del backend al formato que usa la tienda', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify([productoApi]), { status: 200 })));

    const [producto] = await obtenerProductos();

    expect(producto).toEqual({
      id: '1',
      codigo: 'MC001',
      nombre: 'Cemento Polpaico gris 25 kg',
      categoria: 'Mat. Construcción',
      marca: 'Polpaico',
      unidad: 'Saco',
      descripcion: '',
      precio: 5990,
      stock: 80,
      imagen: 'img/polpaico.jpg',
    });
  });

  it('Devuelve undefined cuando el producto no existe (404)', async () => {
    const cuerpo = { estado: 404, mensaje: 'Producto no encontrado con ID: 999' };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(cuerpo), { status: 404 })));

    expect(await obtenerProductoPorId('999')).toBeUndefined();
  });
});
