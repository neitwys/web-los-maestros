import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CLAVE_SESION, ErrorApi, llamarApi } from '../services/api';

function responder(estado: number, cuerpo?: unknown) {
  return vi.fn().mockResolvedValue(
    new Response(cuerpo === undefined ? null : JSON.stringify(cuerpo), { status: estado })
  );
}

describe('Capa de API (llamarApi)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('location', { assign: vi.fn() });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('Devuelve el JSON de una respuesta correcta', async () => {
    vi.stubGlobal('fetch', responder(200, [{ id: 1 }]));

    expect(await llamarApi('/catalogo/productos/listar')).toEqual([{ id: 1 }]);
  });

  it('Envía el token de la sesión en el encabezado Authorization', async () => {
    localStorage.setItem(CLAVE_SESION, JSON.stringify({ token: 'abc.def.ghi' }));
    const fetchMock = responder(200, {});
    vi.stubGlobal('fetch', fetchMock);

    await llamarApi('/carrito/carritos/buscar/usuario/1');

    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe('Bearer abc.def.ghi');
  });

  it('Lanza ErrorApi con el mensaje que manda el backend', async () => {
    vi.stubGlobal('fetch', responder(403, { estado: 403, mensaje: 'No tienes permiso para acceder a este recurso' }));

    await expect(llamarApi('/catalogo/productos/crear', { metodo: 'POST', cuerpo: {} })).rejects.toMatchObject({
      estado: 403,
      message: 'No tienes permiso para acceder a este recurso',
    });
  });

  it('Cierra la sesión guardada cuando el backend responde 401', async () => {
    localStorage.setItem(CLAVE_SESION, JSON.stringify({ token: 'vencido' }));
    vi.stubGlobal('fetch', responder(401, { estado: 401, mensaje: 'Token inválido o expirado' }));

    await expect(llamarApi('/carrito/carritos/buscar/usuario/1')).rejects.toBeInstanceOf(ErrorApi);

    expect(localStorage.getItem(CLAVE_SESION)).toBeNull();
  });
});
