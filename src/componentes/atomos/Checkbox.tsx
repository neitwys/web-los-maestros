interface CheckboxProps {
  id: string;
  marcado: boolean;
  onCambiar: (marcado: boolean) => void;
  invalido?: boolean;      // Marca el campo en rojo (clase is-invalid de Bootstrap)
  deshabilitado?: boolean;
}

// Átomo: casilla de verificación controlada. No guarda estado, solo avisa si fue marcada o desmarcada.
function Checkbox({ id, marcado, onCambiar, invalido = false, deshabilitado = false }: CheckboxProps) {
  return (
    <input
      id={id}
      type="checkbox"
      className={`form-check-input${invalido ? " is-invalid" : ""}`}
      checked={marcado}
      disabled={deshabilitado}
      aria-invalid={invalido}
      onChange={(e) => onCambiar(e.target.checked)}
    />
  );
}

export default Checkbox;