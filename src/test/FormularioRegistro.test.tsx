import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FormularioRegistro, { type DatosRegistro } from '../componentes/organismos/FormularioRegistro';
import {
  errorNombre,
  errorRun,
  errorCorreo,
  errorClave,
  errorConfirmarClave,
  errorTerminos,
} from '../utils/validaciones';

describe('Pruebas unitarias para FormularioRegistro', () => {

  // -------------------------------------------------------------
  // 1. PRUEBAS DE RENDERIZADO INICIAL
  // -------------------------------------------------------------
  describe('Renderizado de la interfaz', () => {
    it('Renderiza las etiquetas de los 5 campos principales y el checkbox de términos', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioRegistro));

      expect(html).toContain('Nombre completo');
      expect(html).toContain('RUN');
      expect(html).toContain('Correo electrónico');
      expect(html).toContain('Contraseña');
      expect(html).toContain('Confirmar contraseña');
      expect(html).toContain('Acepto los términos y condiciones');
    });

    it('Renderiza los placeholders correspondientes en cada campo', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioRegistro));

      expect(html).toContain('Ej: Juan Pérez González');
      expect(html).toContain('12345678-K');
      expect(html).toContain('correo@ejemplo.com');
      expect(html).toContain('4 a 10 caracteres');
      expect(html).toContain('Repite tu contraseña');
    });

    it('Asigna correctamente los IDs de control a cada elemento del formulario', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioRegistro));

      expect(html).toContain('id="regNombre"');
      expect(html).toContain('id="regRun"');
      expect(html).toContain('id="regCorreo"');
      expect(html).toContain('id="regPass"');
      expect(html).toContain('id="regPassConfirm"');
      expect(html).toContain('id="regTerminos"');
    });

    it('Renderiza el botón de envío con el texto y estilo esperado', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioRegistro));

      expect(html).toContain('type="submit"');
      expect(html).toContain('btn btn-warning fw-bold w-100');
      expect(html).toContain('Registrarme');
    });

    it('Soporta la prop opcional onRegistrar sin arrojar errores de renderizado', () => {
      const mockOnRegistrar = vi.fn();
      const html = ReactDOMServer.renderToString(
        React.createElement(FormularioRegistro, { onRegistrar: mockOnRegistrar })
      );

      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(100);
    });
  });

  // -------------------------------------------------------------
  // 2. PRUEBAS DE LAS FUNCIONES DE VALIDACIÓN INDIVIDUALES
  // -------------------------------------------------------------
  describe('Lógica de validaciones desacopladas (utils/validaciones)', () => {
    
    describe('errorNombre', () => {
      it('Retorna error si el nombre está vacío', () => {
        expect(errorNombre('')).toBe('El nombre es obligatorio.');
        expect(errorNombre('   ')).toBe('El nombre es obligatorio.');
      });

      it('Retorna error si el nombre tiene menos de 2 caracteres', () => {
        expect(errorNombre('J')).toBe('El nombre debe tener al menos 2 caracteres.');
      });

      it('Retorna string vacío para un nombre válido', () => {
        expect(errorNombre('María José')).toBe('');
      });
    });

    describe('errorRun', () => {
      it('Retorna error si el RUN está vacío', () => {
        expect(errorRun('')).toBe('El RUN es obligatorio.');
        expect(errorRun('   ')).toBe('El RUN es obligatorio.');
      });

      it('Retorna error si el RUN tiene menos de 8 caracteres', () => {
        expect(errorRun('123456')).toBe('Ingrese un RUN válido.');
      });

      it('Retorna string vacío para un RUN válido', () => {
        expect(errorRun('19876543-2')).toBe('');
        expect(errorRun('12345678-K')).toBe('');
      });
    });

    describe('errorCorreo', () => {
      it('Retorna error si el correo está vacío', () => {
        expect(errorCorreo('')).toBe('El correo es obligatorio.');
      });

      it('Retorna error si el formato es inválido', () => {
        expect(errorCorreo('usuario.com')).toBe('Ingrese un correo electrónico válido.');
        expect(errorCorreo('correo@sin-dominio')).toBe('Ingrese un correo electrónico válido.');
      });

      it('Retorna string vacío para un correo válido', () => {
        expect(errorCorreo('usuario@losmaestros.cl')).toBe('');
      });
    });

    describe('errorClave', () => {
      it('Retorna error si la contraseña está vacía', () => {
        expect(errorClave('')).toBe('La contraseña es obligatoria.');
      });

      it('Retorna error si la contraseña tiene menos de 4 caracteres', () => {
        expect(errorClave('123')).toBe('La contraseña debe tener al menos 4 caracteres.');
      });

      it('Retorna string vacío para una contraseña válida', () => {
        expect(errorClave('clave123')).toBe('');
      });
    });

    describe('errorConfirmarClave', () => {
      it('Retorna error si la confirmación está vacía', () => {
        expect(errorConfirmarClave('clave123', '')).toBe('Debe confirmar su contraseña.');
      });

      it('Retorna error si la confirmación no coincide con la clave', () => {
        expect(errorConfirmarClave('clave123', 'claveDiferente')).toBe('Las contraseñas no coinciden.');
      });

      it('Retorna string vacío cuando ambas contraseñas coinciden', () => {
        expect(errorConfirmarClave('clave123', 'clave123')).toBe('');
      });
    });

    describe('errorTerminos', () => {
      it('Retorna error si no se han aceptado los términos (false)', () => {
        expect(errorTerminos(false)).toBe('Debe aceptar los términos y condiciones.');
      });

      it('Retorna string vacío cuando los términos son aceptados (true)', () => {
        expect(errorTerminos(true)).toBe('');
      });
    });
  });

  // -------------------------------------------------------------
  // 3. ESTRUCTURA Y TIPO DatosRegistro
  // -------------------------------------------------------------
  describe('Estructura del tipo DatosRegistro', () => {
    it('Permite instanciar un objeto DatosRegistro completo y válido', () => {
      const registroEjemplo: DatosRegistro = {
        nombre: 'Gonzalo Morales',
        run: '18765432-1',
        correo: 'gonzalo@ejemplo.cl',
        clave: 'pass2026',
        confirmarClave: 'pass2026',
        terminos: true,
      };

      expect(registroEjemplo.nombre).toBe('Gonzalo Morales');
      expect(registroEjemplo.run).toBe('18765432-1');
      expect(registroEjemplo.correo).toBe('gonzalo@ejemplo.cl');
      expect(registroEjemplo.clave).toBe('pass2026');
      expect(registroEjemplo.confirmarClave).toBe('pass2026');
      expect(registroEjemplo.terminos).toBe(true);
    });
  });

});