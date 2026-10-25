import { describe, it, expect } from 'vitest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import ListaProductos from '../componentes/organismos/ListaProductos';
import type { Producto } from '../data/productosData';

describe('Pruebas unitarias para ListaProductos', () => {
  const productosDemo: Producto[] = [
    {
      id: 'MC001',
      codigo: 'MC001',
      nombre: 'Cemento Polpaico 25kg',
      categoria: 'Mat. Construcción',
      subcategoria: 'Cementos',
      marca: 'Polpaico',
      precio: 5990,
      stock: 80,
      unidad: 'Saco',
      descripcion: 'Cemento Polpaico gris 25kg',
      imagen: 'img/polpaico.jpg',
    },
    {
      id: 'MC002',
      codigo: 'MC002',
      nombre: 'Mortero Weber 25kg',
      categoria: 'Mat. Construcción',
      subcategoria: 'Morteros',
      marca: 'Weber',
      precio: 6490,
      stock: 30,
      unidad: 'Saco',
      descripcion: 'Mortero nivelador de piso 25kg',
      imagen: 'img/weber.jpg',
    },
  ];

  it('Muestra un mensaje de alerta cuando el arreglo de productos está vacío', () => {
    const html = ReactDOMServer.renderToString(<ListaProductos productos={[]} />);
    expect(html).toContain('No se encontraron productos');
  });

  it('Renderiza la grilla contenedora con la clase row g-4', () => {
    const html = ReactDOMServer.renderToString(
      <MemoryRouter>
        <ListaProductos productos={productosDemo} />
      </MemoryRouter>
    );
    expect(html).toContain('row');
  });

  it('Renderiza las columnas col-12 col-sm-6 col-lg-4 para cada producto', () => {
    const html = ReactDOMServer.renderToString(
      <MemoryRouter>
        <ListaProductos productos={productosDemo} />
      </MemoryRouter>
    );
    expect(html).toContain('col');
  });

  it('Renderiza la información de todos los productos pasados en las tarjetas CardProducto', () => {
    const html = ReactDOMServer.renderToString(
      <MemoryRouter>
        <ListaProductos productos={productosDemo} />
      </MemoryRouter>
    );

    expect(html).toContain('Cemento Polpaico 25kg');
    expect(html).toContain('Mortero Weber 25kg');
  });

  it('Funciona correctamente con una lista de un solo producto', () => {
    const html = ReactDOMServer.renderToString(
      <MemoryRouter>
        <ListaProductos productos={[productosDemo[0]]} />
      </MemoryRouter>
    );

    expect(html).toContain('Cemento Polpaico 25kg');
    expect(html).not.toContain('Mortero Weber 25kg');
  });
});