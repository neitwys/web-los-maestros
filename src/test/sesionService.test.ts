import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { iniciarSesion, obtenerSesion } from '../services/sesionService';
import { CLAVE_SESION } from '../services/api';
import { crearToken } from './ayudas';

const sesionBase = { id: 2, correo: 'cliente@losmaestros.cl', rol: 'CLIENTE', nombre: 'Cliente', fecha: '2026-11-20T00:00:00Z' };

describe('Sesión de usuario', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('Guarda el token y el rol que devuelve el backend al iniciar sesión', async () => {
    const token = crearToken(3600);
    const respuesta = { token, usuario: { id: 2, nombre: 'Cliente', correo: 'cliente@losmaestros.cl', rol: 'CLIENTE' } };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify(respuesta), { status: 200 })));

    const resultado = await iniciarSesion('cliente@losmaestros.cl', 'cliente123');

    expect(resultado.ok).toBe(true);
    expect(obtenerSesion()).toMatchObject({ token, rol: 'CLIENTE', id: 2 });
  });

  it('Descarta la sesión cuando el token ya venció', () => {
    localStorage.setItem(CLAVE_SESION, JSON.stringify({ ...sesionBase, token: crearToken(-60) }));

    expect(obtenerSesion()).toBeNull();
    expect(localStorage.getItem(CLAVE_SESION)).toBeNull();
  });

  it('Descarta una sesión con un rol inventado en el navegador', () => {
    localStorage.setItem(CLAVE_SESION, JSON.stringify({ ...sesionBase, rol: 'SUPERADMIN', token: crearToken(3600) }));

    expect(obtenerSesion()).toBeNull();
  });
});
