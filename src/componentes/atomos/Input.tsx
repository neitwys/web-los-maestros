interface InputProps {
  id: string;
  tipo?: "text" | "email" | "password" | "tel" | "date" | "search" | "textarea";
  valor: string;
  onCambiar: (valor: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  maxLength?: number;
  filas?: number;          // Solo se usa cuando tipo es "textarea"
  invalido?: boolean;      // Marca el campo en rojo (clase is-invalid de Bootstrap)
  deshabilitado?: boolean;
}

// Átomo: campo de texto controlado. No valida ni guarda estado, solo muestra y avisa los cambios.
function Input({
  id,
  tipo = "text",
  valor,
  onCambiar,
  onBlur,
  placeholder,
  maxLength,
  filas = 4,
  invalido = false,
  deshabilitado = false,
}: InputProps) {
  const clases = `form-control${invalido ? " is-invalid" : ""}`;

  if (tipo === "textarea") {
    return (
      <textarea
        id={id}
        className={clases}
        rows={filas}
        value={valor}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={deshabilitado}
        aria-invalid={invalido}
        onChange={(e) => onCambiar(e.target.value)}
        onBlur={onBlur}
      />
    );
  }

  return (
    <input
      id={id}
      type={tipo}
      className={clases}
      value={valor}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={deshabilitado}
      aria-invalid={invalido}
      onChange={(e) => onCambiar(e.target.value)}
      onBlur={onBlur}
    />
  );
}

export default Input;