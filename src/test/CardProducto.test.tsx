// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CardProducto from "../componentes/moleculas/CardProducto";

test("renderiza el título, categoría, precio y la imagen correctamente", () => {
  render(
    <MemoryRouter>
      <CardProducto
        id="MC001"
        titulo="Cemento Polpaico gris 25 kg"
        categoria="Mat. Construcción"
        descripcion="Cemento Polpaico gris 25 kg - Marca Polpaico."
        precio={5990}
        imagen="img/polpaico.jpg"
      />
    </MemoryRouter>
  );

  // Comprobar el título y la categoría
  expect(screen.getByText("Cemento Polpaico gris 25 kg")).toBeDefined();
  expect(screen.getByText("Mat. Construcción")).toBeDefined();

  // Comprobar el precio formateado
  const precioTexto = screen.getByText("$5.990");
  expect(precioTexto.textContent).toContain("$5.990");

  // Comprobar que la imagen tenga el atributo alt correcto y formatee la ruta
  const imagen = screen.getByRole("img", { name: "Cemento Polpaico gris 25 kg" });
  expect(imagen.getAttribute("src")).toBe("/img/polpaico.jpg");
});

test("renderiza el botón de navegación dentro de la tarjeta", () => {
  render(
    <MemoryRouter>
      <CardProducto
        id="MC001"
        titulo="Cemento Polpaico gris 25 kg"
        categoria="Mat. Construcción"
        descripcion="Descripción de prueba"
        precio={5990}
        imagen="img/polpaico.jpg"
      />
    </MemoryRouter>
  );

  // Verificar que el enlace hijo (Boton) esté presente con la ruta al ID correcto
  const enlace = screen.getByRole("link", { name: "Ver producto" });
  expect(enlace.getAttribute("href")).toBe("/producto/MC001");
});