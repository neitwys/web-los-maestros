interface SelectProps {
  id: string;
  valor: string;
  opciones: string[];
  onCambiar: (valor: string) => void;
  onBlur?: () => void;
  textoVacio?: string;     // Texto de la primera opción (sin valor). Ej: "Seleccione región..."
  invalido?: boolean;      // Marca el campo en rojo (clase is-invalid de Bootstrap)
  deshabilitado?: boolean;
}

// Átomo: lista desplegable controlada. No guarda estado, solo muestra las opciones y avisa el cambio.
function Select({
  id,
  valor,
  opciones,
  onCambiar,
  onBlur,
  textoVacio,
  invalido = false,
  deshabilitado = false,
}: SelectProps) {
  return (
    <select
      id={id}
      className={`form-select${invalido ? " is-invalid" : ""}`}
      value={valor}
      disabled={deshabilitado}
      aria-invalid={invalido}
      onChange={(e) => onCambiar(e.target.value)}
      onBlur={onBlur}
    >
      {textoVacio && <option value="">{textoVacio}</option>}
      {opciones.map((opcion) => (
        <option key={opcion} value={opcion}>
          {opcion}
        </option>
      ))}
    </select>
  );
}

export default Select;