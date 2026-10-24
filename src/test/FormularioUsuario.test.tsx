import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FormularioUsuario from '../componentes/organismos/FormularioUsuario';
import type { Usuario } from '../data/usuariosData';

describe('Pruebas unitarias para FormularioUsuario', () => {

  // Declaración del mock para onGuardar
  const mockOnGuardar = vi.fn();

  const usuarioEjemplo: Usuario = {
    run: '111111111',
    nombre: 'Admin',
    apellidos: 'Los Maestros',
    correo: 'admin@losmaestros.cl',
    rol: 'Administrador',
    region: 'Metropolitana de Santiago',
    comuna: 'Santiago',
    direccion: 'Av. Central 100',
  };

  it('Renderiza los campos del formulario en modo creación ("Crear usuario")', () => {
    const html = ReactDOMServer.renderToString(
      <FormularioUsuario onGuardar={mockOnGuardar} />
    );

    expect(html).toContain('RUN');
    expect(html).toContain('Nombre');
    expect(html).toContain('Apellidos');
    expect(html).toContain('Correo electrónico');
    expect(html).toContain('Rol');
    expect(html).toContain('Región');
    expect(html).toContain('Comuna');
    expect(html).toContain('Dirección');
    expect(html).toContain('Crear usuario');
  });

  it('Carga los datos del usuario cuando se pasa la prop "usuario" para edición ("Guardar cambios")', () => {
    const html = ReactDOMServer.renderToString(
      <FormularioUsuario usuario={usuarioEjemplo} onGuardar={mockOnGuardar} />
    );

    expect(html).toContain('Guardar cambios');
    expect(html).toContain('value="111111111"');
    expect(html).toContain('value="Admin"');
    expect(html).toContain('value="admin@losmaestros.cl"');
  });

  it('Inhabilita el campo RUN en modo edición cuando "usuario" está presente', () => {
    const html = ReactDOMServer.renderToString(
      <FormularioUsuario usuario={usuarioEjemplo} onGuardar={mockOnGuardar} />
    );

    expect(html).toContain('disabled=""');
  });

  it('Renderiza el botón "Cancelar" cuando se provee la prop onCancelar', () => {
    const mockCancelar = vi.fn();

    const html = ReactDOMServer.renderToString(
      <FormularioUsuario onGuardar={mockOnGuardar} onCancelar={mockCancelar} />
    );

    expect(html).toContain('Cancelar');
  });
});