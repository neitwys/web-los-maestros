import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CatalogoProductos from '../componentes/organismos/CatalogoProductos';
import type { Producto } from '../data/productosData';

// Datos de prueba alineados con el tipo Producto
const productosMock: Producto[] = [
  {
    id: '1',
    codigo: 'HER001',
    nombre: 'Martillo de Uña',
    categoria: 'Herramientas',
    subcategoria: 'Manuales',
    marca: 'Stanley',
    precio: 12990,
    stock: 10,
    unidad: 'Unidad',
    descripcion: 'Martillo de acero forjado con mango ergonómico',
    imagen: 'img/martillo.jpg'
  },
  {
    id: '2',
    codigo: 'PIN001',
    nombre: 'Pintura Esmalte Blanco',
    categoria: 'Pinturas',
    subcategoria: 'Esmalte',
    marca: 'Sipa',
    precio: 24990,
    stock: 5,
    unidad: 'Galón',
    descripcion: 'Pintura esmalte al agua brillante',
    imagen: 'img/pintura.jpg'
  },
  {
    id: '3',
    codigo: 'HER002',
    nombre: 'Taladro Percutor 750W',
    categoria: 'Herramientas',
    subcategoria: 'Eléctricas',
    marca: 'Bosch',
    precio: 45990,
    stock: 8,
    unidad: 'Unidad',
    descripcion: 'Taladro eléctrico ideal para concreto y madera',
    imagen: 'img/taladro.jpg'
  }
];

describe('Pruebas unitarias para <CatalogoProductos />', () => {

  it('1. Renderiza correctamente el buscador y la lista inicial de productos', () => {
    render(<CatalogoProductos productos={productosMock} />);

    expect(screen.getByText('Martillo de Uña')).toBeInTheDocument();
    expect(screen.getByText('Pintura Esmalte Blanco')).toBeInTheDocument();
    expect(screen.getByText('Taladro Percutor 750W')).toBeInTheDocument();
  });

  it('2. Filtra productos al escribir en el campo de búsqueda (por nombre)', () => {
    render(<CatalogoProductos productos={productosMock} />);

    const buscadorInput = screen.getByRole('textbox');
    fireEvent.change(buscadorInput, { target: { value: 'Martillo' } });

    expect(screen.getByText('Martillo de Uña')).toBeInTheDocument();
    expect(screen.queryByText('Pintura Esmalte Blanco')).not.toBeInTheDocument();
    expect(screen.queryByText('Taladro Percutor 750W')).not.toBeInTheDocument();
  });

  it('3. Filtra la lista al buscar por coincidencia en la marca o descripción', () => {
    render(<CatalogoProductos productos={productosMock} />);

    const buscadorInput = screen.getByRole('textbox');
    fireEvent.change(buscadorInput, { target: { value: 'Bosch' } });

    expect(screen.getByText('Taladro Percutor 750W')).toBeInTheDocument();
    expect(screen.queryByText('Martillo de Uña')).not.toBeInTheDocument();
  });

  it('4. Filtra los productos al hacer clic en un botón de categoría', () => {
    render(<CatalogoProductos productos={productosMock} />);

    const botonPinturas = screen.getByRole('button', { name: /Pinturas/i });
    fireEvent.click(botonPinturas);

    expect(screen.getByText('Pintura Esmalte Blanco')).toBeInTheDocument();
    expect(screen.queryByText('Martillo de Uña')).not.toBeInTheDocument();
    expect(screen.queryByText('Taladro Percutor 750W')).not.toBeInTheDocument();
  });

  it('5. Aplica filtro combinado de Categoría y Buscador simultáneamente', () => {
    render(<CatalogoProductos productos={productosMock} />);

    const botonHerramientas = screen.getByRole('button', { name: /Herramientas/i });
    fireEvent.click(botonHerramientas);

    const buscadorInput = screen.getByRole('textbox');
    fireEvent.change(buscadorInput, { target: { value: 'Taladro' } });

    expect(screen.getByText('Taladro Percutor 750W')).toBeInTheDocument();
    expect(screen.queryByText('Martillo de Uña')).not.toBeInTheDocument();
    expect(screen.queryByText('Pintura Esmalte Blanco')).not.toBeInTheDocument();
  });

  it('6. Oculta todos los productos cuando la búsqueda no encuentra coincidencias', () => {
    render(<CatalogoProductos productos={productosMock} />);

    const buscadorInput = screen.getByRole('textbox');
    fireEvent.change(buscadorInput, { target: { value: 'Inexistente123' } });

    expect(screen.queryByText('Martillo de Uña')).not.toBeInTheDocument();
    expect(screen.queryByText('Pintura Esmalte Blanco')).not.toBeInTheDocument();
  });

  it('7. Funciona con lista vacía por defecto', () => {
    render(<CatalogoProductos productos={[]} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Todos')).toBeInTheDocument();
  });

});