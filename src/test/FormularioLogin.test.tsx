import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FormularioLogin from '../componentes/organismos/FormularioLogin';
import {
  iniciarSesion,
  type Sesion
} from '../services/sesionService';
import { errorCorreo, errorClave } from '../utils/validaciones';

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

describe('Pruebas unitarias para FormularioLogin', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Renderizado de la interfaz', () => {
    it('Renderiza los campos de correo y contraseña con sus etiquetas y placeholders por defecto', () => {
      const html = ReactDOMServer.renderToString(<FormularioLogin />);

      expect(html).toContain('Correo electrónico');
      expect(html).toContain('Contraseña');
      expect(html).toContain('correo@ejemplo.com');
    });

    it('Genera los IDs con el prefijo por defecto ("login")', () => {
      const html = ReactDOMServer.renderToString(<FormularioLogin />);

      expect(html).toContain('id="loginCorreo"');
      expect(html).toContain('id="loginPass"');
    });

    it('Genera los IDs con un prefijo personalizado cuando se pasa prefijoId', () => {
      const html = ReactDOMServer.renderToString(
        <FormularioLogin prefijoId="modal" />
      );

      expect(html).toContain('id="modalCorreo"');
      expect(html).toContain('id="modalPass"');
    });

    it('Renderiza el botón de envío con el texto "Ingresar" y clases CSS correspondientes', () => {
      const html = ReactDOMServer.renderToString(<FormularioLogin />);

      expect(html).toContain('type="submit"');
      expect(html).toContain('btn btn-warning');
      expect(html).toContain('Ingresar');
    });

    it('Acepta la prop opcional onIngresar sin errores de renderizado', () => {
      const mockOnIngresar = vi.fn();
      const html = ReactDOMServer.renderToString(
        <FormularioLogin onIngresar={mockOnIngresar} />
      );

      expect(html).toBeDefined();
    });
  });

  describe('Lógica de validaciones para inicio de sesión', () => {
    describe('errorCorreo', () => {
      it('Retorna error si el correo está vacío', () => {
        expect(errorCorreo('')).toBe('El correo es obligatorio.');
      });

      it('Retorna error si el correo no tiene formato válido', () => {
        expect(errorCorreo('usuario-sin-arroba')).toBe('Ingresa un correo válido (ej: correo@ejemplo.com).');
        expect(errorCorreo('correo@sin-dominio')).toBe('Ingresa un correo válido (ej: correo@ejemplo.com).');
      });

      it('Retorna string vacío si el correo es válido', () => {
        expect(errorCorreo('cliente@losmaestros.cl')).toBe('');
      });
    });

    describe('errorClave', () => {
      it('Retorna error si la contraseña está vacía', () => {
        expect(errorClave('')).toBe('La contraseña es obligatoria.');
      });

      it('Retorna error si la contraseña tiene menos de 4 caracteres', () => {
        expect(errorClave('123')).toBe('La contraseña debe tener entre 4 y 10 caracteres.');
      });

      it('Retorna string vacío si la contraseña es válida', () => {
        expect(errorClave('1234')).toBe('');
        expect(errorClave('clave1234')).toBe('');
      });
    });
  });

  describe('Servicio de inicio de sesión (iniciarSesion)', () => {
    it('Inicia sesión exitosamente con credenciales válidas', () => {
      const resultado = iniciarSesion('cliente@ejemplo.cl', '123456');
      expect(resultado.ok).toBe(true);
    });

    it('Rechaza el inicio de sesión con credenciales incorrectas', () => {
      const resultado = iniciarSesion('admin@losmaestros.cl', 'clavefalsa');
      expect(resultado.ok).toBe(false);
    });
  });

  describe('Estructura de la interfaz Sesion', () => {
    it('Permite construir un objeto Sesion conforme a la especificación de la aplicación', () => {
      const sesionDemo: Sesion = {
        correo: 'admin@losmaestros.cl',
        rol: 'Administrador',
        fecha: new Date().toISOString(),
      };

      expect(sesionDemo.correo).toBe('admin@losmaestros.cl');
    });
  });

});