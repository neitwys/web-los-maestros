import { describe, expect, it, vi } from "vitest";
import {
  agregarAlCarrito,
  eliminarDelCarrito,
  EVENTO_CARRITO,
  obtenerCarrito,
} from "../services/carritoService";
import { obtenerCompras, registrarCompra } from "../services/compraService";
import type { Producto } from "../data/productosData";

const productoMock: Producto = {
  id: "PT001",
  codigo: "PT001",
  nombre: "Pintura látex interior 1 galón blanco",
  categoria: "Pinturas",
  subcategoria: "Látex",
  marca: "Sipa",
  precio: 9990,
  stock: 40,
  unidad: "Galón",
  descripcion: "Pintura látex interior 1 galón blanco",
  imagen: "img/pinturalatex1g.webp",
};

describe("Flujo de carrito y compras", () => {
  it("agrega un producto y notifica el cambio al Navbar", () => {
    const listener = vi.fn();
    window.addEventListener(EVENTO_CARRITO, listener);

    agregarAlCarrito(productoMock, 2);

    expect(obtenerCarrito()).toEqual([{ ...productoMock, cantidad: 2 }]);
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(EVENTO_CARRITO, listener);
  });

  it("consolida cantidades cuando se agrega dos veces el mismo producto", () => {
    agregarAlCarrito(productoMock, 2);
    agregarAlCarrito(productoMock, 3);

    expect(obtenerCarrito()).toHaveLength(1);
    expect(obtenerCarrito()[0].cantidad).toBe(5);
  });

  it("permite volver a agregar un producto después de eliminarlo", () => {
    agregarAlCarrito(productoMock, 1);
    eliminarDelCarrito(productoMock.id);
    expect(obtenerCarrito()).toEqual([]);

    agregarAlCarrito(productoMock, 4);

    expect(obtenerCarrito()).toEqual([{ ...productoMock, cantidad: 4 }]);
  });

  it("guarda los productos pagados para que Admin pueda consultarlos", () => {
    agregarAlCarrito(productoMock, 2);

    const compra = registrarCompra(obtenerCarrito());
    const compras = obtenerCompras();

    expect(compras).toHaveLength(1);
    expect(compras[0]).toEqual(compra);
    expect(compras[0].items).toEqual([{ ...productoMock, cantidad: 2 }]);
    expect(compras[0].total).toBe(19980);
  });
});
