import { describe, it, expect } from 'vitest';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ListaProductos from '../componentes/organismos/ListaProductos';
import type { Producto } from '../data/productosData';

describe('Pruebas unitarias para ListaProductos', () => {

  const productosPrueba: Producto[] = [
    {
      id: 'p-101',
      codigo: 'MC001',
      nombre: 'Saco de Cemento Bio Bio 25kg',
      categoria: 'Mat. Construcción',
      subcategoria: 'Cementos',
      marca: 'Bio Bio',
      precio: 5490,
      stock: 50,
      unidad: 'Saco',
      descripcion: 'Cemento para hormigones de alta calidad.',
      imagen: 'cemento-biobio.png',
    },
    {
      id: 'p-102',
      codigo: 'HER001',
      nombre: 'Taladro Inalámbrico 18V',
      categoria: 'Herramientas',
      subcategoria: 'Eléctricas',
      marca: 'Makita',
      precio: 45990,
      stock: 15,
      unidad: 'Unidad',
      descripcion: 'Incluye 2 baterías de litio y maletín de transporte.',
      imagen: 'taladro-18v.png',
    },
    {
      id: 'p-103',
      codigo: 'PNT001',
      nombre: 'Esmalte Sintético Negro 1L',
      categoria: 'Pinturas',
      subcategoria: 'Esmaltes',
      marca: 'Sipa',
      precio: 12990,
      stock: 30,
      unidad: 'Tarro',
      descripcion: 'Acabado brillante para metales y maderas.',
      imagen: 'esmalte-negro.png',
    },
  ];

  // -------------------------------------------------------------
  // 1. PRUEBAS DE ESTADO VACÍO (SIN PRODUCTOS)
  // -------------------------------------------------------------
  describe('Manejo de catálogo vacío', () => {
    it('Muestra un mensaje de alerta cuando el arreglo de productos está vacío', () => {
      const html = ReactDOMServer.renderToString(
        React.createElement(ListaProductos, { productos: [] })
      );

      expect(html).toContain('No se encontraron productos en el catálogo.');
      expect(html).toContain('alert alert-warning text-center my-4');
      expect(html).toContain('role="alert"');
    });

    it('Muestra el mensaje de alerta si la prop productos es un arreglo sin elementos', () => {
      const htmlEmpty = ReactDOMServer.renderToString(
        React.createElement(ListaProductos, { productos: [] })
      );

      expect(htmlEmpty).toContain('No se encontraron productos en el catálogo.');
    });
  });

  // -------------------------------------------------------------
  // 2. PRUEBAS DE RENDERIZADO CON LISTA DE PRODUCTOS
  // -------------------------------------------------------------
  describe('Renderizado de la lista de productos', () => {
    it('Renderiza la grilla contenedora con la clase row g-4', () => {
      const html = ReactDOMServer.renderToString(
        React.createElement(ListaProductos, { productos: productosPrueba })
      );

      expect(html).toContain('class="row g-4"');
    });

    it('Renderiza las columnas col-12 col-sm-6 col-lg-4 para cada producto', () => {
      const html = ReactDOMServer.renderToString(
        React.createElement(ListaProductos, { productos: productosPrueba })
      );

      expect(html).toContain('col-12 col-sm-6 col-lg-4');
      
      const coincidenciaColumnas = html.match(/col-12 col-sm-6 col-lg-4/g);
      expect(coincidenciaColumnas).not.toBeNull();
      expect(coincidenciaColumnas?.length).toBe(3);
    });

    it('Renderiza la información de todos los productos pasados en las tarjetas CardProducto', () => {
      const html = ReactDOMServer.renderToString(
        React.createElement(ListaProductos, { productos: productosPrueba })
      );

      // Títulos
      expect(html).toContain('Saco de Cemento Bio Bio 25kg');
      expect(html).toContain('Taladro Inalámbrico 18V');
      expect(html).toContain('Esmalte Sintético Negro 1L');

      // Categorías
      expect(html).toContain('Mat. Construcción');
      expect(html).toContain('Herramientas');
      expect(html).toContain('Pinturas');

      // Precios formateados
      expect(html).toContain('5.490');
      expect(html).toContain('45.990');
      expect(html).toContain('12.990');

      // Imágenes
      expect(html).toContain('/cemento-biobio.png');
      expect(html).toContain('/taladro-18v.png');
      expect(html).toContain('/esmalte-negro.png');
    });

    it('Funciona correctamente con una lista de un solo producto', () => {
      const unProducto: Producto[] = [productosPrueba[0]];
      const html = ReactDOMServer.renderToString(
        React.createElement(ListaProductos, { productos: unProducto })
      );

      expect(html).toContain('Saco de Cemento Bio Bio 25kg');
      expect(html).not.toContain('Taladro Inalámbrico 18V');
    });
  });

});