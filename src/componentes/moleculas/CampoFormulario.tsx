import Input from "../atomos/Input";

interface CampoFormularioProps {
  id: string;
  etiqueta: string;
  tipo?: "text" | "email" | "password" | "tel" | "date" | "search" | "textarea";
  valor: string;
  onCambiar: (valor: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  maxLength?: number;
  filas?: number;
  error?: string;            
  obligatorio?: boolean;     
  mostrarContador?: boolean; 
  deshabilitado?: boolean;
}

function CampoFormulario({
  id,
  etiqueta,
  tipo = "text",
  valor,
  onCambiar,
  onBlur,
  placeholder,
  maxLength,
  filas,
  error = "",
  obligatorio = false,
  mostrarContador = false,
  deshabilitado = false,
}: CampoFormularioProps) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-semibold">
        {etiqueta}
        {obligatorio && <span className="text-danger"> *</span>}
      </label>

      <Input
        id={id}
        tipo={tipo}
        valor={valor}
        onCambiar={onCambiar}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        filas={filas}
        invalido={error !== ""}
        deshabilitado={deshabilitado}
      />

      {error !== "" && <div className="invalid-feedback">{error}</div>}

      {mostrarContador && maxLength !== undefined && (
        <div className="form-text text-end">
          {valor.length}/{maxLength}
        </div>
      )}
    </div>
  );
}

export default CampoFormulario;