import { describe, it, expect, beforeEach } from 'vitest';
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  reiniciarProductos,
  type ProductoNuevo,
} from '../services/productoService';

describe('Pruebas unitarias para productoService', () => {
  
  beforeEach(() => {
    reiniciarProductos();
  });

 
  describe('obtenerProductos', () => {
    it('Devuelve la lista inicial de productos', () => {
      const productos = obtenerProductos();
      expect(Array.isArray(productos)).toBe(true);
      expect(productos.length).toBeGreaterThan(0);
      expect(productos[0].id).toBe('MC001');
    });

    it('Devuelve una copia del arreglo sin mutar el estado interno directo', () => {
      const copia1 = obtenerProductos();
      copia1.pop();
      const copia2 = obtenerProductos();
      expect(copia2.length).toBeGreaterThan(copia1.length);
    });
  });


  describe('obtenerProductoPorId', () => {
    it('Encuentra un producto por su id', () => {
      const producto = obtenerProductoPorId('MC001');
      expect(producto).toBeDefined();
      expect(producto?.nombre).toBe('Cemento Polpaico gris 25 kg');
    });

    it('Encuentra un producto por su código', () => {
      const producto = obtenerProductoPorId('MC002');
      expect(producto).toBeDefined();
      expect(producto?.nombre).toBe('Cemento Melón blanco 25 kg');
    });

    it('Devuelve undefined si el id o código no existe', () => {
      const producto = obtenerProductoPorId('ID-INEXISTENTE');
      expect(producto).toBeUndefined();
    });
  });

  
  describe('crearProducto', () => {
    const nuevoProductoDatos: ProductoNuevo = {
      codigo: 'PNT-100',
      nombre: 'Pintura Látex Blanca 1 Galón',
      categoria: 'Pinturas',
      subcategoria: 'Látex',
      marca: 'Sipa',
      precio: 18990,
      stock: 25,
      unidad: 'Galón',
      descripcion: 'Pintura de gran cubrimiento para interiores y exteriores.',
      imagen: 'img/latex-blanco.jpg',
    };

    it('Crea y agrega un nuevo producto correctamente con ID generado (FER-001)', () => {
      const creado = crearProducto(nuevoProductoDatos);

      expect(creado.id).toBe('FER-001');
      expect(creado.codigo).toBe('PNT-100');
      expect(creado.nombre).toBe('Pintura Látex Blanca 1 Galón');

      const buscado = obtenerProductoPorId('FER-001');
      expect(buscado).toBeDefined();
      expect(buscado?.codigo).toBe('PNT-100');
    });

    it('Genera un ID incremental cuando ya existen IDs con prefijo FER-', () => {
      crearProducto(nuevoProductoDatos); 
      const segundo = crearProducto({
        ...nuevoProductoDatos,
        codigo: 'PNT-101',
      }); 

      expect(segundo.id).toBe('FER-002');
    });

    it('Si el código ingresado está vacío, usa el ID generado como código', () => {
      const sinCodigo = { ...nuevoProductoDatos, codigo: '   ' };
      const creado = crearProducto(sinCodigo);

      expect(creado.id).toBe('FER-001');
      expect(creado.codigo).toBe('FER-001');
    });

    it('Lanza un error si ya existe un producto con el mismo código', () => {
      crearProducto(nuevoProductoDatos);

      expect(() => {
        crearProducto({
          ...nuevoProductoDatos,
          nombre: 'Otra Pintura',
        });
      }).toThrow('Ya existe un producto con ese código.');
    });
  });

  // -------------------------------------------------------------
  // 4. ACTUALIZAR PRODUCTO
  // -------------------------------------------------------------
  describe('actualizarProducto', () => {
    it('Actualiza las propiedades de un producto existente', () => {
      const actualizado = actualizarProducto('MC001', {
        precio: 6490,
        stock: 100,
      });

      expect(actualizado).toBeDefined();
      expect(actualizado?.precio).toBe(6490);
      expect(actualizado?.stock).toBe(100);

      // Verificar persistencia en la consulta posterior
      const guardado = obtenerProductoPorId('MC001');
      expect(guardado?.precio).toBe(6490);
      expect(guardado?.stock).toBe(100);
    });

    it('Devuelve undefined si el producto a actualizar no existe', () => {
      const resultado = actualizarProducto('NO-EXISTE', { precio: 9990 });
      expect(resultado).toBeUndefined();
    });
  });

  // -------------------------------------------------------------
  // 5. ELIMINAR PRODUCTO
  // -------------------------------------------------------------
  describe('eliminarProducto', () => {
    it('Elimina un producto existente y devuelve true', () => {
      const exito = eliminarProducto('MC001');
      expect(exito).toBe(true);

      const buscado = obtenerProductoPorId('MC001');
      expect(buscado).toBeUndefined();
    });

    it('Devuelve false si el id no corresponde a ningún producto', () => {
      const exito = eliminarProducto('NO-EXISTE');
      expect(exito).toBe(false);
    });
  });

  // -------------------------------------------------------------
  // 6. REINICIAR PRODUCTOS
  // -------------------------------------------------------------
  describe('reiniciarProductos', () => {
    it('Restaura el catálogo de productos a su estado inicial', () => {
      eliminarProducto('MC001');
      expect(obtenerProductoPorId('MC001')).toBeUndefined();

      reiniciarProductos();
      expect(obtenerProductoPorId('MC001')).toBeDefined();
    });
  });
});