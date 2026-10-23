
import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import CardCalculo from "../componentes/moleculas/CardCalculo";
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

test("renderiza los detalles del cálculo y los datos del producto correctamente", () => {
  const funcionAgregarMock = vi.fn();

  render(
    <CardCalculo
      producto={productoMock}
      unidades={2}
      totalCLP={19980}
      detalles="Para pintar 50 m² a 2 manos, necesitas aprox. 2 galón(es)."
      onAgregarALista={funcionAgregarMock}
    />
  );


  expect(screen.getByText("Resultado del Cálculo:")).toBeDefined();
  expect(
    screen.getByText("Para pintar 50 m² a 2 manos, necesitas aprox. 2 galón(es).")
  ).toBeDefined();


  const nombreProducto = screen.getByText("Pintura látex interior 1 galón blanco");
  expect(nombreProducto.textContent).toBe("Pintura látex interior 1 galón blanco");
});

test("llama a la función onAgregarALista cuando se presiona el botón", () => {
  const funcionAgregarMock = vi.fn();

  render(
    <CardCalculo
      producto={productoMock}
      unidades={3}
      totalCLP={29970}
      detalles="Prueba de click"
      onAgregarALista={funcionAgregarMock}
    />
  );

  const botonAgregar = screen.getByRole("button", { name: "+ Añadir a mi lista" });
  fireEvent.click(botonAgregar);


  expect(funcionAgregarMock).toHaveBeenCalledWith(productoMock, 3);
});