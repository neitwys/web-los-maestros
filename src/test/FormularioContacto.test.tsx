import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FormularioContacto, { type DatosContacto } from '../componentes/organismos/FormularioContacto';
import { errorNombre, errorCorreo, errorTelefono, errorMensaje } from '../utils/validaciones';

describe('Pruebas unitarias para FormularioContacto', () => {

  // -------------------------------------------------------------
  // 1. PRUEBAS DE RENDERIZADO INICIAL DE LA INTERFAZ
  // -------------------------------------------------------------
  describe('Renderizado de la interfaz', () => {
    it('Renderiza los 4 campos del formulario con sus respectivas etiquetas y placeholders', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioContacto));

      // Comprueba que existan las etiquetas
      expect(html).toContain('Nombre');
      expect(html).toContain('Correo electrónico');
      expect(html).toContain('Teléfono (opcional)');
      expect(html).toContain('Mensaje');

      // Comprueba que existan los placeholders configurados
      expect(html).toContain('Tu nombre');
      expect(html).toContain('correo@ejemplo.com');
      expect(html).toContain('+56 9 1234 5678');
      expect(html).toContain('¿En qué podemos ayudarte?');
    });

    it('Renderiza los IDs de control correspondientes en los inputs', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioContacto));

      expect(html).toContain('id="cntNombre"');
      expect(html).toContain('id="cntCorreo"');
      expect(html).toContain('id="cntTelefono"');
      expect(html).toContain('id="cntMensaje"');
    });

    it('Renderiza el botón de envío con el texto y estilo adecuado', () => {
      const html = ReactDOMServer.renderToString(React.createElement(FormularioContacto));

      expect(html).toContain('type="submit"');
      expect(html).toContain('btn btn-warning');
      expect(html).toContain('Enviar mensaje');
    });

    it('Acepta la prop opcional onEnviar sin generar errores de ejecución', () => {
      const mockOnEnviar = vi.fn();
      const html = ReactDOMServer.renderToString(
        React.createElement(FormularioContacto, { onEnviar: mockOnEnviar })
      );

      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(100);
    });
  });

  // -------------------------------------------------------------
  // 2. PRUEBAS DE LA LÓGICA DE VALIDACIÓN (validaciones.ts)
  // -------------------------------------------------------------
  describe('Lógica de validaciones desacopladas', () => {
    describe('errorNombre', () => {
      it('Retorna mensaje de error si el nombre está vacío', () => {
        expect(errorNombre('')).toBe('El nombre es obligatorio.');
        expect(errorNombre('   ')).toBe('El nombre es obligatorio.');
      });

      it('Retorna error si el nombre tiene menos de 2 caracteres', () => {
        expect(errorNombre('A')).toBe('El nombre debe tener al menos 2 caracteres.');
      });

      it('Retorna string vacío cuando el nombre es válido', () => {
        expect(errorNombre('Juan Pérez')).toBe('');
      });
    });

    describe('errorCorreo', () => {
      it('Retorna error si el correo está vacío', () => {
        expect(errorCorreo('')).toBe('El correo es obligatorio.');
      });

      it('Retorna error si el formato de correo es inválido', () => {
        expect(errorCorreo('correo-invalido')).toBe('Ingrese un correo electrónico válido.');
        expect(errorCorreo('usuario@sin-dominio')).toBe('Ingrese un correo electrónico válido.');
      });

      it('Retorna string vacío cuando el correo es válido', () => {
        expect(errorCorreo('juan.perez@dominio.cl')).toBe('');
      });
    });

    describe('errorTelefono', () => {
      it('Permite un teléfono vacío al ser opcional', () => {
        expect(errorTelefono('')).toBe('');
      });

      it('Retorna error si el teléfono ingresado es muy corto', () => {
        expect(errorTelefono('12345')).toBe('Ingrese un número de teléfono válido.');
      });

      it('Retorna string vacío cuando el teléfono es válido', () => {
        expect(errorTelefono('+56912345678')).toBe('');
      });
    });

    describe('errorMensaje', () => {
      it('Retorna error si el mensaje está vacío', () => {
        expect(errorMensaje('')).toBe('El mensaje es obligatorio.');
      });

      it('Retorna error si el mensaje tiene menos de 10 caracteres', () => {
        expect(errorMensaje('Hola')).toBe('El mensaje debe tener al menos 10 caracteres.');
      });

      it('Retorna string vacío cuando el mensaje es válido', () => {
        expect(errorMensaje('Necesito una cotización de planchas de zinc.')).toBe('');
      });
    });
  });

  // -------------------------------------------------------------
  // 3. PRUEBA DE ESTRUCTURA DEL TIPO DatosContacto
  // -------------------------------------------------------------
  describe('Estructura de DatosContacto', () => {
    it('Permite instanciar un objeto DatosContacto con la interfaz esperada', () => {
      const datosEjemplo: DatosContacto = {
        nombre: 'Carlos Mendoza',
        correo: 'carlos@losmaestros.cl',
        telefono: '+56987654321',
        mensaje: 'Consulta sobre stock de sacos de cemento Bio Bio.'
      };

      expect(datosEjemplo.nombre).toBe('Carlos Mendoza');
      expect(datosEjemplo.correo).toBe('carlos@losmaestros.cl');
      expect(datosEjemplo.telefono).toBe('+56987654321');
      expect(datosEjemplo.mensaje).toBe('Consulta sobre stock de sacos de cemento Bio Bio.');
    });
  });

});