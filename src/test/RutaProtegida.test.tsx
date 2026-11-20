import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RutaProtegida from '../componentes/organismos/RutaProtegida';
import { CLAVE_SESION } from '../services/api';
import { crearToken } from './ayudas';

function mostrarAdmin() {
  render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route path="/admin" element={<RutaProtegida rolRequerido="ADMIN"><p>Panel de administración</p></RutaProtegida>} />
        <Route path="/login" element={<p>Pantalla de login</p>} />
        <Route path="/" element={<p>Pantalla de inicio</p>} />
      </Routes>
    </MemoryRouter>
  );
}

function iniciarComo(rol: 'ADMIN' | 'CLIENTE') {
  localStorage.setItem(CLAVE_SESION, JSON.stringify({ token: crearToken(3600), id: 1, correo: 'usuario@losmaestros.cl', rol, nombre: 'Usuario', fecha: '2026-11-20T00:00:00Z' }));
}

describe('Acceso a las pantallas de administración', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Lleva al login a quien no ha iniciado sesión', () => {
    mostrarAdmin();

    expect(screen.getByText('Pantalla de login')).toBeInTheDocument();
  });

  it('Deja a un cliente fuera del panel y lo manda al inicio', () => {
    iniciarComo('CLIENTE');
    mostrarAdmin();

    expect(screen.queryByText('Panel de administración')).not.toBeInTheDocument();
    expect(screen.getByText('Pantalla de inicio')).toBeInTheDocument();
  });
});
