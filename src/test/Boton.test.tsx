// @vitest-environment jsdom
import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Boton from "../componentes/atomos/Boton";

test("el botón muestra el texto Ver producto", () => {
  render(
    <MemoryRouter>
      <Boton id="MC001" />
    </MemoryRouter>
  );

  const boton = screen.getByText("Ver producto");
  expect(boton.textContent).toBe("Ver producto");
});

test("el botón genera el enlace correcto según el id", () => {
  render(
    <MemoryRouter>
      <Boton id="MC001" />
    </MemoryRouter>
  );

  const enlace = screen.getByRole("link", { name: "Ver producto" });
  expect(enlace.getAttribute("href")).toBe("/producto/MC001");
});