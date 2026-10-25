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
  errorTerminos
} from '../utils/validaciones';

describe('Pruebas unitarias para FormularioRegistro', () => {

  describe('Renderizado de la interfaz', () => {
    it('Renderiza las etiquetas de los 5 campos principales y el checkbox de términos', () => {
      const html = ReactDOMServer.renderToString(<FormularioRegistro />);

      expect(html).toContain('Nombre completo');
      expect(html).toContain('RUN');
      expect(html).toContain('Correo electrónico');
      expect(html).toContain('Contraseña');
      expect(html).toContain('Confirmar contraseña');
      expect(html).toContain('Acepto los términos y condiciones');
    });

    it('Renderiza los placeholders correspondientes en cada campo', () => {
      const html = ReactDOMServer.renderToString(<FormularioRegistro />);

      expect(html).toContain('Ej: Juan Pérez González');
      expect(html).toContain('12345678-K');
      expect(html).toContain('correo@ejemplo.com');
      expect(html).toContain('4 a 10 caracteres');
      expect(html).toContain('Repite tu contraseña');
    });

    it('Asigna correctamente los IDs de control a cada elemento del formulario', () => {
      const html = ReactDOMServer.renderToString(<FormularioRegistro />);

      expect(html).toContain('id="regNombre"');
      expect(html).toContain('id="regRun"');
      expect(html).toContain('id="regCorreo"');
      expect(html).toContain('id="regPass"');
      expect(html).toContain('id="regPassConfirm"');
      expect(html).toContain('id="regTerminos"');
    });

    it('Renderiza el botón de envío con el texto y estilo esperado', () => {
      const html = ReactDOMServer.renderToString(<FormularioRegistro />);

      expect(html).toContain('type="submit"');
      expect(html).toContain('btn btn-warning');
      expect(html).toContain('Registrarme');
    });

    it('Soporta la prop opcional onRegistrar sin arrojar errores de renderizado', () => {
      const mockOnRegistrar = vi.fn();
      const html = ReactDOMServer.renderToString(
        <FormularioRegistro onRegistrar={mockOnRegistrar} />
      );

      expect(html).toBeDefined();
    });
  });

  describe('Lógica de validaciones desacopladas (utils/validaciones)', () => {
    describe('errorNombre', () => {
      it('Retorna error si el nombre está vacío', () => {
        expect(errorNombre('')).toBe('El nombre es obligatorio.');
      });

      it('Retorna error si el nombre tiene menos de 2 caracteres', () => {
        expect(errorNombre('A')).toBe('El nombre debe tener al menos 2 caracteres.');
      });

      it('Retorna string vacío para un nombre válido', () => {
        expect(errorNombre('María González')).toBe('');
      });
    });

    describe('errorRun', () => {
      it('Retorna error si el RUN está vacío', () => {
        expect(errorRun('')).toBe('El RUN es obligatorio.');
      });

      it('Retorna error si el RUN tiene menos de 8 caracteres', () => {
        expect(errorRun('123456')).toBe('Ingresa un RUN chileno válido (ej: 12345678-K).');
      });

      it('Retorna string vacío para un RUN válido con módulo 11', () => {
        expect(errorRun('12345678-5')).toBe('');
        expect(errorRun('11111111-1')).toBe('');
      });
    });

    describe('errorCorreo', () => {
      it('Retorna error si el correo está vacío', () => {
        expect(errorCorreo('')).toBe('El correo es obligatorio.');
      });

      it('Retorna error si el formato es inválido', () => {
        expect(errorCorreo('usuario.com')).toBe('Ingresa un correo válido (ej: correo@ejemplo.com).');
        expect(errorCorreo('correo@sin-dominio')).toBe('Ingresa un correo válido (ej: correo@ejemplo.com).');
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
        expect(errorClave('123')).toBe('La contraseña debe tener entre 4 y 10 caracteres.');
      });

      it('Retorna string vacío para una contraseña válida', () => {
        expect(errorClave('clave123')).toBe('');
      });
    });

    describe('errorConfirmarClave', () => {
      it('Retorna error si la confirmación está vacía', () => {
        expect(errorConfirmarClave('clave123', '')).toBe('Debes confirmar la contraseña.');
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
        expect(errorTerminos(false)).toBe('Debes aceptar los términos para registrarte.');
      });

      it('Retorna string vacío cuando los términos son aceptados (true)', () => {
        expect(errorTerminos(true)).toBe('');
      });
    });
  });

  describe('Estructura del tipo DatosRegistro', () => {
    it('Permite instanciar un objeto DatosRegistro completo y válido', () => {
      const registroEjemplo: DatosRegistro = {
        nombre: 'Pedro Pascal',
        run: '12345678-5',
        correo: 'pedro@losmaestros.cl',
        clave: '123456',
        confirmarClave: '123456',
        terminos: true
      };

      expect(registroEjemplo.nombre).toBe('Pedro Pascal');
    });
  });

});