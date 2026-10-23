import { describe, it, expect } from "vitest";
import {
  validarRutChileno,
  validarEmail,
  validarLongitud,
  errorNombre,
  errorRun,
  errorCorreo,
  errorClave,
  errorConfirmarClave,
  errorTelefono,
  errorMensaje,
  errorTerminos,
  errorTextoObligatorio,
  errorPrecio,
  errorStock,
} from "../utils/validaciones";

describe("Pruebas unitarias de validaciones.ts", () => {
  describe("validarRutChileno", () => {
    it("debe retornar true para un RUN chileno válido", () => {
      expect(validarRutChileno("11.111.111-1")).toBe(true);
      expect(validarRutChileno("12345678-5")).toBe(true);
      expect(validarRutChileno("111111111")).toBe(true);
    });

    it("debe retornar false para un RUN inválido o formato incorrecto", () => {
      expect(validarRutChileno("11111111-9")).toBe(false);
      expect(validarRutChileno("123")).toBe(false);
      expect(validarRutChileno("")).toBe(false);
    });
  });

  describe("validarEmail", () => {
    it("debe retornar true para un correo válido dentro del largo permitido", () => {
      expect(validarEmail("correo@ejemplo.com")).toBe(true);
      expect(validarEmail("usuario@losmaestros.cl")).toBe(true);
    });

    it("debe retornar false para correos con formato inválido o sobrepasando maxLen", () => {
      expect(validarEmail("correosin-arroba.com")).toBe(false);
      expect(validarEmail("usuario@")).toBe(false);
      expect(validarEmail("a".repeat(101) + "@ejemplo.com", 100)).toBe(false);
    });
  });

  describe("validarLongitud", () => {
    it("debe validar correctamente el rango de caracteres", () => {
      expect(validarLongitud("Herramienta", 2, 20)).toBe(true);
      expect(validarLongitud("A", 2, 20)).toBe(false);
      expect(validarLongitud("Texto largo que excede", 2, 10)).toBe(false);
    });
  });

  describe("errorNombre", () => {
    it("debe validar el nombre con los mensajes exactos", () => {
      expect(errorNombre("")).toBe("El nombre es obligatorio.");
      expect(errorNombre("A")).toBe("El nombre debe tener al menos 2 caracteres.");
      expect(errorNombre("a".repeat(51))).toBe("El nombre no puede superar los 50 caracteres.");
      expect(errorNombre("Juan123")).toBe("El nombre solo puede contener letras.");
      expect(errorNombre("Juan Pérez")).toBe("");
    });
  });

  describe("errorRun", () => {
    it("debe validar el RUN con los mensajes exactos", () => {
      expect(errorRun("")).toBe("El RUN es obligatorio.");
      expect(errorRun("123456")).toBe("Ingresa un RUN chileno válido (ej: 12345678-K).");
      expect(errorRun("12345678-5")).toBe("");
    });
  });

  describe("errorCorreo", () => {
    it("debe validar el correo con los mensajes exactos", () => {
      expect(errorCorreo("")).toBe("El correo es obligatorio.");
      expect(errorCorreo("a".repeat(101))).toBe("El correo no puede superar los 100 caracteres.");
      expect(errorCorreo("correo_invalido")).toBe("Ingresa un correo válido (ej: correo@ejemplo.com).");
      expect(errorCorreo("correo@ejemplo.com")).toBe("");
    });
  });

  describe("errorClave", () => {
    it("debe validar la contraseña con los mensajes exactos", () => {
      expect(errorClave("")).toBe("La contraseña es obligatoria.");
      expect(errorClave("123")).toBe("La contraseña debe tener entre 4 y 10 caracteres.");
      expect(errorClave("12345678901")).toBe("La contraseña debe tener entre 4 y 10 caracteres.");
      expect(errorClave("1234")).toBe("");
    });
  });

  describe("errorConfirmarClave", () => {
    it("debe validar la confirmación de la contraseña", () => {
      expect(errorConfirmarClave("1234", "")).toBe("Debes confirmar la contraseña.");
      expect(errorConfirmarClave("1234", "1235")).toBe("Las contraseñas no coinciden.");
      expect(errorConfirmarClave("1234", "1234")).toBe("");
    });
  });

  describe("errorTelefono", () => {
    it("debe permitir teléfono vacío y validar formato si se ingresa", () => {
      expect(errorTelefono("")).toBe("");
      expect(errorTelefono("   ")).toBe("");
      expect(errorTelefono("123")).toBe("Ingresa un teléfono válido (ej: +56 9 1234 5678).");
      expect(errorTelefono("+56912345678")).toBe("");
    });
  });

  describe("errorMensaje", () => {
    it("debe validar la longitud del mensaje", () => {
      expect(errorMensaje("")).toBe("El mensaje es obligatorio.");
      expect(errorMensaje("Hola")).toBe("El mensaje debe tener al menos 10 caracteres.");
      expect(errorMensaje("a".repeat(501))).toBe("El mensaje no puede superar los 500 caracteres.");
      expect(errorMensaje("Mensaje largo válido para el formulario de contacto.")).toBe("");
    });
  });

  describe("errorTerminos", () => {
    it("debe validar la aceptación de los términos", () => {
      expect(errorTerminos(false)).toBe("Debes aceptar los términos para registrarte.");
      expect(errorTerminos(true)).toBe("");
    });
  });

  describe("Validaciones de productos (zona admin)", () => {
    it("errorTextoObligatorio debe retornar mensaje de obligatorio o límite sobrepasado", () => {
      expect(errorTextoObligatorio("", "Código", 10)).toBe('El campo "Código" es obligatorio.');
      expect(errorTextoObligatorio("a".repeat(11), "Código", 10)).toBe('El campo "Código" no puede superar los 10 caracteres.');
      expect(errorTextoObligatorio("MC001", "Código", 10)).toBe("");
    });

    it("errorPrecio debe validar que sea un número entero mayor a 0", () => {
      expect(errorPrecio("")).toBe("El precio es obligatorio.");
      expect(errorPrecio("10.5")).toBe("El precio debe ser un número entero, sin puntos ni signos.");
      expect(errorPrecio("abc")).toBe("El precio debe ser un número entero, sin puntos ni signos.");
      expect(errorPrecio("0")).toBe("El precio debe ser mayor que 0.");
      expect(errorPrecio("5990")).toBe("");
    });

    it("errorStock debe validar que sea un número entero mayor o igual a 0", () => {
      expect(errorStock("")).toBe("El stock es obligatorio.");
      expect(errorStock("-5")).toBe("El stock debe ser un número entero igual o mayor que 0.");
      expect(errorStock("10.5")).toBe("El stock debe ser un número entero igual o mayor que 0.");
      expect(errorStock("0")).toBe("");
      expect(errorStock("10")).toBe("");
    });
  });
});