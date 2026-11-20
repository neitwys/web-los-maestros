import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { agregarAlCarrito, calcularTotalCarrito, obtenerCarrito } from '../services/carritoService';
import { CLAVE_SESION } from '../services/api';
import { crearToken } from './ayudas';

const respuestaCarrito = {
  items: [{ productoId: 1, nombreProducto: 'Cemento Polpaico gris 25 kg', precioUnitario: 5990, cantidad: 2, subtotal: 11980 }],
};

describe('Carrito del usuario', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('Agrega al carrito del usuario de la sesión y calcula el total', async () => {
    const sesion = { token: crearToken(3600), id: 2, correo: 'cliente@losmaestros.cl', rol: 'CLIENTE', nombre: 'Cliente', fecha: '2026-11-20T00:00:00Z' };
    localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(respuestaCarrito), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await agregarAlCarrito('1', 2);

    expect(fetchMock.mock.calls[0][0]).toContain('/carrito/carritos/usuario/2/agregar');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ productoId: 1, cantidad: 2 });
    expect(obtenerCarrito()).toEqual([{ id: '1', nombre: 'Cemento Polpaico gris 25 kg', precio: 5990, cantidad: 2 }]);
    expect(calcularTotalCarrito()).toBe(11980);
  });

  it('No llama al backend si no hay una sesión iniciada', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(agregarAlCarrito('1')).rejects.toThrow('Debes iniciar sesión para usar el carrito.');
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
