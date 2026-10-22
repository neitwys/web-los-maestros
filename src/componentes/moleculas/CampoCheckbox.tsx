import Checkbox from "../atomos/Checkbox";

interface CampoCheckboxProps {
  id: string;
  etiqueta: string;
  marcado: boolean;
  onCambiar: (marcado: boolean) => void;
  error?: string;          // Mensaje de error. Si viene vacío, el campo se ve normal
  deshabilitado?: boolean;
}

// Molécula: casilla (átomo Checkbox) + etiqueta + mensaje de error.
function CampoCheckbox({
  id,
  etiqueta,
  marcado,
  onCambiar,
  error = "",
  deshabilitado = false,
}: CampoCheckboxProps) {
  return (
    <div className="form-check mb-3">
      <Checkbox
        id={id}
        marcado={marcado}
        onCambiar={onCambiar}
        invalido={error !== ""}
        deshabilitado={deshabilitado}
      />

      <label htmlFor={id} className="form-check-label">
        {etiqueta}
      </label>

      {error !== "" && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default CampoCheckbox;