import { describe, it, expect, vi } from 'vitest';
import ReactDOMServer from 'react-dom/server';
import TablaProductos from '../componentes/organismos/TablaProductos';
import type { Producto } from '../data/productosData';

describe('Pruebas unitarias para TablaProductos', () => {

  
  const mockEditar = vi.fn();
  const mockEliminar = vi.fn();

  
  const listaProductos: Producto[] = [
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

  it('Muestra mensaje "No hay productos registrados." cuando la lista está vacía', () => {
    const html = ReactDOMServer.renderToString(
      <TablaProductos
        productos={[]}
        onEditar={mockEditar}
        onEliminar={mockEliminar}
      />
    );

    expect(html).toContain('No hay productos registrados.');
  });

  it('Renderiza las columnas "Imagen", "Código", "Nombre", "Categoría", "Precio", "Stock" y "Acciones"', () => {
    const html = ReactDOMServer.renderToString(
      <TablaProductos
        productos={listaProductos}
        onEditar={mockEditar}
        onEliminar={mockEliminar}
      />
    );

    expect(html).toContain('Imagen');
    expect(html).toContain('Código');
    expect(html).toContain('Nombre');
    expect(html).toContain('Categoría');
    expect(html).toContain('Precio');
    expect(html).toContain('Stock');
    expect(html).toContain('Acciones');
  });

  it('Muestra los datos de los productos y los botones "Editar" y "Eliminar"', () => {
    const html = ReactDOMServer.renderToString(
      <TablaProductos
        productos={listaProductos}
        onEditar={mockEditar}
        onEliminar={mockEliminar}
      />
    );

    expect(html).toContain('Cemento Polpaico 25kg');
    expect(html).toContain('Mortero Weber 25kg');
    expect(html).toContain('5.990');
    expect(html).toContain('6.490');

    expect(html).toContain('Editar');
    expect(html).toContain('Eliminar');
    expect(html).toContain('aria-label="Editar Cemento Polpaico 25kg"');
    expect(html).toContain('aria-label="Eliminar Cemento Polpaico 25kg"');
  });
});
