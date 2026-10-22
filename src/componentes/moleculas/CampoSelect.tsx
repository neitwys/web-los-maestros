import Select from "../atomos/Select";

interface CampoSelectProps {
  id: string;
  etiqueta: string;
  valor: string;
  opciones: string[];
  onCambiar: (valor: string) => void;
  onBlur?: () => void;
  textoVacio?: string;     // Primera opción sin valor. Ej: "Seleccione región..."
  error?: string;          // Mensaje de error. Si viene vacío, el campo se ve normal
  obligatorio?: boolean;   // Agrega el asterisco (*) a la etiqueta
  deshabilitado?: boolean;
}

// Molécula: etiqueta + lista desplegable (átomo Select) + mensaje de error.
function CampoSelect({
  id,
  etiqueta,
  valor,
  opciones,
  onCambiar,
  onBlur,
  textoVacio,
  error = "",
  obligatorio = false,
  deshabilitado = false,
}: CampoSelectProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {etiqueta}
        {obligatorio && <span className="text-danger"> *</span>}
      </label>

      <Select
        id={id}
        valor={valor}
        opciones={opciones}
        onCambiar={onCambiar}
        onBlur={onBlur}
        textoVacio={textoVacio}
        invalido={error !== ""}
        deshabilitado={deshabilitado}
      />

      {error !== "" && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default CampoSelect;