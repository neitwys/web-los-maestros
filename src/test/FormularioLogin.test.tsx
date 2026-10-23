import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FormularioLogin from '../componentes/organismos/FormularioLogin';
import { errorCorreo, errorClave } from '../utils/validaciones';
import { iniciarSesion, type Sesion } from '../services/sesionService';

describe('Pruebas unitarias para FormularioLogin', () => {

  // -------------------------------------------------------------
  // 1. PRUEBAS DE RENDERIZADO INICIAL
  // -------------------------------------------------------------
  describe('Renderizado de la interfaz', () => {
    it('Renderiza los campos de correo y contraseña con sus etiquetas y placeholders por defecto', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioLogin));

      // Etiquetas
      expect(html).toContain('Correo electrónico');
      expect(html).toContain('Contraseña');

      // Placeholders
      expect(html).toContain('correo@ejemplo.com');
      expect(html).toContain('Contraseña');
    });

    it('Genera los IDs con el prefijo por defecto ("login")', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioLogin));

      expect(html).toContain('id="loginCorreo"');
      expect(html).toContain('id="loginPass"');
    });

    it('Genera los IDs con un prefijo personalizado cuando se pasa prefijoId', () => {
      const html = ReactDOMServer.renderToString(
        React.createElement(FormularioLogin, { prefijoId: 'modalLogin' })
      );

      expect(html).toContain('id="modalLoginCorreo"');
      expect(html).toContain('id="modalLoginPass"');
    });

    it('Renderiza el botón de envío con el texto "Ingresar" y clases CSS correspondientes', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioLogin));

      expect(html).toContain('type="submit"');
      expect(html).toContain('btn btn-primary w-100 mt-3');
      expect(html).toContain('Ingresar');
    });

    it('Acepta la prop opcional onIngresar sin errores de renderizado', () => {
      const mockOnIngresar = vi.fn();
      const html = ReactDOMServer.renderToString(
        React.createElement(FormularioLogin, { onIngresar: mockOnIngresar })
      );

      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(100);
    });
  });

  // -------------------------------------------------------------
  // 2. PRUEBAS DE LAS FUNCIONES DE VALIDACIÓN (errorCorreo y errorClave)
  // -------------------------------------------------------------
  describe('Lógica de validaciones para inicio de sesión', () => {
    describe('errorCorreo', () => {
      it('Retorna error si el correo está vacío', () => {
        expect(errorCorreo('')).toBe('El correo es obligatorio.');
        expect(errorCorreo('   ')).toBe('El correo es obligatorio.');
      });

      it('Retorna error si el correo no tiene formato válido', () => {
        expect(errorCorreo('usuario-sin-arroba')).toBe('Ingrese un correo electrónico válido.');
        expect(errorCorreo('correo@sin-dominio')).toBe('Ingrese un correo electrónico válido.');
      });

      it('Retorna string vacío si el correo es válido', () => {
        expect(errorCorreo('cliente@ferreteria.cl')).toBe('');
      });
    });

    describe('errorClave', () => {
      it('Retorna error si la contraseña está vacía', () => {
        expect(errorClave('')).toBe('La contraseña es obligatoria.');
        expect(errorClave('   ')).toBe('La contraseña es obligatoria.');
      });

      it('Retorna error si la contraseña tiene menos de 4 caracteres', () => {
        expect(errorClave('123')).toBe('La contraseña debe tener al menos 4 caracteres.');
      });

      it('Retorna string vacío si la contraseña es válida', () => {
        expect(errorClave('1234')).toBe('');
        expect(errorClave('miClaveSegura123')).toBe('');
      });
    });
  });

  // -------------------------------------------------------------
  // 3. PRUEBAS PARA EL SERVICIO DE SESIÓN (sesionService)
  // -------------------------------------------------------------
  describe('Servicio de inicio de sesión (iniciarSesion)', () => {
    it('Inicia sesión exitosamente con credenciales válidas', () => {
      const resultado = iniciarSesion('usuario@ejemplo.com', '1234');

      expect(resultado.ok).toBe(true);
      expect(resultado.sesion).toBeDefined();
      expect(resultado.sesion?.correo).toBe('usuario@ejemplo.com');
      expect(resultado.sesion?.rol).toBe('Cliente');
      expect(resultado.sesion?.fecha).toBeDefined();
    });

    it('Rechaza el inicio de sesión con credenciales incorrectas', () => {
      const resultado = iniciarSesion('correo@incorrecto.cl', 'clavefalsa');

      expect(resultado.ok).toBe(false);
      expect(resultado.sesion).toBeUndefined();
      expect(resultado.error).toBe('Correo o contraseña incorrectos.');
    });
  });

  // -------------------------------------------------------------
  // 4. ESTRUCTURA Y TIPO Sesion
  // -------------------------------------------------------------
  describe('Estructura de la interfaz Sesion', () => {
    it('Permite construir un objeto Sesion conforme a la especificación de la aplicación', () => {
      const sesionPrueba: Sesion = {
        correo: 'ana.gomez@empresa.cl',
        rol: 'Administrador',
        fecha: '2026-10-23T12:00:00.000Z',
      };

      expect(sesionPrueba.correo).toBe('ana.gomez@empresa.cl');
      expect(sesionPrueba.rol).toBe('Administrador');
      expect(sesionPrueba.fecha).toBe('2026-10-23T12:00:00.000Z');
    });
  });

});