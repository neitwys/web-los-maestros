import { describe, it, expect } from 'vitest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import CardProducto from '../componentes/moleculas/CardProducto';

describe('Pruebas unitarias para <CardProducto />', () => {
  const propsDemo = {
    id: 'MC001',
    titulo: 'Cemento Polpaico 25kg',
    categoria: 'Mat. Construcción',
    descripcion: 'Cemento Polpaico gris 25kg',
    precio: 5990,
    imagen: 'img/polpaico.jpg',
  };

  const renderCard = (props = propsDemo) =>
    ReactDOMServer.renderToString(
      <MemoryRouter>
        <CardProducto {...props} />
      </MemoryRouter>
    );

  it('renderiza correctamente el título, categoría y descripción del producto', () => {
    const html = renderCard(propsDemo);

    expect(html).toContain('Cemento Polpaico 25kg');
    expect(html).toContain('Mat. Construcción');
    expect(html).toContain('Cemento Polpaico gris 25kg');
  });

  it('antepone "/" a la ruta de la imagen si esta no comienza con un slash', () => {
    const html = renderCard(propsDemo);

    expect(html).toContain('src="/img/polpaico.jpg"');
  });

  it('mantiene la ruta de la imagen intacta si ya comienza con un slash "/"', () => {
    const propsConSlash = { ...propsDemo, imagen: '/img/polpaico.jpg' };
    const html = renderCard(propsConSlash);

    expect(html).toContain('src="/img/polpaico.jpg"');
  });

  it('formatea el precio correctamente en formato pesos chilenos (es-CL)', () => {
    const html = renderCard(propsDemo);

    expect(html).toContain('5.990');
  });
});