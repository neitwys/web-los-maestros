import { describe, it, expect, beforeEach } from 'vitest';
import {
  iniciarSesion,
  obtenerSesion,
  cerrarSesion,
  CORREO_ADMIN,
} from '../services/sesionService';


const storageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: storageMock,
    writable: true,
  });
}

describe('Pruebas unitarias para sesionService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('iniciarSesion', () => {
    it('Inicia sesión correctamente como Administrador con clave correcta', () => {
      const resultado = iniciarSesion(CORREO_ADMIN, '1234');

      expect(resultado.ok).toBe(true);
      if (resultado.ok) {
        expect(resultado.sesion.correo).toBe('admin@losmaestros.cl');
        expect(resultado.sesion.rol).toBe('Administrador');
        expect(resultado.sesion.fecha).toBeDefined();
      }

      
      const sesionGuardada = obtenerSesion();
      expect(sesionGuardada).not.toBeNull();
      expect(sesionGuardada?.rol).toBe('Administrador');
    });

    it('Rechaza el inicio de sesión de Administrador con contraseña incorrecta', () => {
      const resultado = iniciarSesion(CORREO_ADMIN, 'claveInvalida');

      expect(resultado.ok).toBe(false);
      if (!resultado.ok) {
        expect(resultado.error).toBe('Contraseña de administrador incorrecta.');
      }

      
      expect(obtenerSesion()).toBeNull();
    });

    it('Inicia sesión correctamente como Cliente con clave válida', () => {
      const resultado = iniciarSesion('cliente@ejemplo.cl', 'miClave123');

      expect(resultado.ok).toBe(true);
      if (resultado.ok) {
        expect(resultado.sesion.correo).toBe('cliente@ejemplo.cl');
        expect(resultado.sesion.rol).toBe('Cliente');
      }

      const sesionGuardada = obtenerSesion();
      expect(sesionGuardada?.correo).toBe('cliente@ejemplo.cl');
      expect(sesionGuardada?.rol).toBe('Cliente');
    });

    it('Rechaza inicio de sesión como Cliente si la clave no cumple validaciones', () => {
      const resultado = iniciarSesion('cliente@ejemplo.cl', '123'); 

      expect(resultado.ok).toBe(false);
      if (!resultado.ok) {
        expect(resultado.error).toBe('La contraseña debe tener entre 4 y 10 caracteres.');
      }

      expect(obtenerSesion()).toBeNull();
    });

    it('Limpia espacios en blanco y convierte el correo a minúsculas', () => {
      const resultado = iniciarSesion('   CLIENTE@EJEMPLO.CL  ', 'miClave123');

      expect(resultado.ok).toBe(true);
      if (resultado.ok) {
        expect(resultado.sesion.correo).toBe('cliente@ejemplo.cl');
      }
    });
  });


  describe('obtenerSesion', () => {
    it('Devuelve null si no existe una sesión guardada', () => {
      expect(obtenerSesion()).toBeNull();
    });

    it('Devuelve la sesión activa correctamente si existe en localStorage', () => {
      iniciarSesion('usuario@test.cl', 'clave123');

      const sesion = obtenerSesion();
      expect(sesion).not.toBeNull();
      expect(sesion?.correo).toBe('usuario@test.cl');
    });

    it('Devuelve null si el contenido guardado en localStorage está dañado o no es JSON válido', () => {
      localStorage.setItem('sesionActiva', '{json_invalido_corrupto');

      expect(obtenerSesion()).toBeNull();
    });
  });

  describe('cerrarSesion', () => {
    it('Elimina la sesión activa de localStorage', () => {
      iniciarSesion('usuario@test.cl', 'clave123');
      expect(obtenerSesion()).not.toBeNull();

      cerrarSesion();

      expect(obtenerSesion()).toBeNull();
      expect(localStorage.getItem('sesionActiva')).toBeNull();
    });
  });
});