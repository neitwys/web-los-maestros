export function validarRutChileno(rut: string): boolean {
  const limpio = rut.replace(/\./g, "").replace("-", "").trim().toUpperCase();
  if (limpio.length < 8 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  if (!/^[0-9]+$/.test(cuerpo)) return false;

  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo.charAt(i), 10);
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

  return dv === dvEsperado;
}

/** Valida el formato de un correo y que no supere el largo máximo. */
export function validarEmail(correo: string, maxLen = 100): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valor = correo.trim();
  return valor.length > 0 && valor.length <= maxLen && regex.test(valor);
}

/** Valida que el largo del texto (sin espacios en los extremos) esté entre min y max. */
export function validarLongitud(texto: string, min: number, max: number): boolean {
  const largo = texto.trim().length;
  return largo >= min && largo <= max;
}

/* ===== Mensajes de error específicos =====
   Cada función devuelve el mensaje de error, o "" si el valor es válido. */

export function errorNombre(valor: string): string {
  const nombre = valor.trim();
  if (nombre === "") return "El nombre es obligatorio.";
  if (nombre.length < 2) return "El nombre debe tener al menos 2 caracteres.";
  if (nombre.length > 50) return "El nombre no puede superar los 50 caracteres.";
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) return "El nombre solo puede contener letras.";
  return "";
}

export function errorRun(valor: string): string {
  if (valor.trim() === "") return "El RUN es obligatorio.";
  if (!validarRutChileno(valor)) return "Ingresa un RUN chileno válido (ej: 12345678-K).";
  return "";
}

export function errorCorreo(valor: string): string {
  const correo = valor.trim();
  if (correo === "") return "El correo es obligatorio.";
  if (correo.length > 100) return "El correo no puede superar los 100 caracteres.";
  if (!validarEmail(correo)) return "Ingresa un correo válido (ej: correo@ejemplo.com).";
  return "";
}

export function errorClave(valor: string): string {
  const clave = valor.trim();
  if (clave === "") return "La contraseña es obligatoria.";
  if (clave.length < 4 || clave.length > 10) return "La contraseña debe tener entre 4 y 10 caracteres.";
  return "";
}

export function errorConfirmarClave(clave: string, confirmacion: string): string {
  if (confirmacion.trim() === "") return "Debes confirmar la contraseña.";
  if (clave.trim() !== confirmacion.trim()) return "Las contraseñas no coinciden.";
  return "";
}

/** El teléfono es opcional: solo se valida si el usuario escribió algo. */
export function errorTelefono(valor: string): string {
  const telefono = valor.replace(/\s/g, "");
  if (telefono === "") return "";
  if (!/^\+?[0-9]{8,11}$/.test(telefono)) return "Ingresa un teléfono válido (ej: +56 9 1234 5678).";
  return "";
}

export function errorMensaje(valor: string): string {
  const mensaje = valor.trim();
  if (mensaje === "") return "El mensaje es obligatorio.";
  if (mensaje.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
  if (mensaje.length > 500) return "El mensaje no puede superar los 500 caracteres.";
  return "";
}

export function errorTerminos(aceptado: boolean): string {
  return aceptado ? "" : "Debes aceptar los términos para registrarte.";
}


/* ===== Validaciones de productos (zona admin) ===== */

/** Campo de texto obligatorio con largo máximo. "etiqueta" es el nombre del campo en el mensaje. */
export function errorTextoObligatorio(valor: string, etiqueta: string, max: number): string {
  const texto = valor.trim();
  if (texto === "") return `El campo "${etiqueta}" es obligatorio.`;
  if (texto.length > max) return `El campo "${etiqueta}" no puede superar los ${max} caracteres.`;
  return "";
}

/** El precio debe ser un número entero mayor que 0 (pesos chilenos, sin decimales). */
export function errorPrecio(valor: string): string {
  const precio = valor.trim();
  if (precio === "") return "El precio es obligatorio.";
  if (!/^[0-9]+$/.test(precio)) return "El precio debe ser un número entero, sin puntos ni signos.";
  if (Number(precio) <= 0) return "El precio debe ser mayor que 0.";
  return "";
}

/** El stock debe ser un número entero igual o mayor que 0. */
export function errorStock(valor: string): string {
  const stock = valor.trim();
  if (stock === "") return "El stock es obligatorio.";
  if (!/^[0-9]+$/.test(stock)) return "El stock debe ser un número entero igual o mayor que 0.";
  return "";
}