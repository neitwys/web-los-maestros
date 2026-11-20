import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoCheckbox from "../moleculas/CampoCheckbox";
import {
  errorNombre,
  errorRun,
  errorCorreo,
  errorTelefonoObligatorio,
  errorClave,
  errorConfirmarClave,
  errorTerminos,
} from "../../utils/validaciones";

export interface DatosRegistro {
  nombre: string;
  run: string;
  correo: string;
  telefono: string;
  clave: string;
  confirmarClave: string;
  terminos: boolean;
}

interface FormularioRegistroProps {
  // Se llama solo cuando todos los campos son válidos. La página decide qué hacer (ej: redirigir).
  onRegistrar?: (datos: DatosRegistro) => void | Promise<void>;
}

type Campo = keyof DatosRegistro;
type Errores = Record<Campo, string>;

const datosVacios: DatosRegistro = {
  nombre: "",
  run: "",
  correo: "",
  telefono: "",
  clave: "",
  confirmarClave: "",
  terminos: false,
};

const sinErrores: Errores = {
  nombre: "",
  run: "",
  correo: "",
  telefono: "",
  clave: "",
  confirmarClave: "",
  terminos: "",
};

// Devuelve el mensaje de error de un campo ("" si está correcto) según los datos actuales
function calcularError(campo: Campo, datos: DatosRegistro): string {
  switch (campo) {
    case "nombre":
      return errorNombre(datos.nombre);
    case "run":
      return errorRun(datos.run);
    case "correo":
      return errorCorreo(datos.correo);
    case "telefono":
      return errorTelefonoObligatorio(datos.telefono);
    case "clave":
      return errorClave(datos.clave);
    case "confirmarClave":
      return errorConfirmarClave(datos.clave, datos.confirmarClave);
    case "terminos":
      return errorTerminos(datos.terminos);
  }
}

// Organismo: formulario de registro (estado con useState + validaciones por campo).
function FormularioRegistro({ onRegistrar }: FormularioRegistroProps) {
  const [datos, setDatos] = useState<DatosRegistro>(datosVacios);
  const [errores, setErrores] = useState<Errores>(sinErrores);
  const [estado, setEstado] = useState<"inicial" | "error" | "exito">("inicial");
  const [errorServidor, setErrorServidor] = useState("");

  const validarCampo = (campo: Campo, actuales: DatosRegistro = datos) => {
    setErrores((previo) => ({ ...previo, [campo]: calcularError(campo, actuales) }));
  };

  const cambiarCampo = <K extends Campo>(campo: K, valor: DatosRegistro[K]) => {
    const nuevos = { ...datos, [campo]: valor };
    setDatos(nuevos);
    setEstado("inicial");

    // Si el campo ya mostraba un error, se revalida mientras el usuario corrige
    if (errores[campo] !== "") validarCampo(campo, nuevos);
    // Al cambiar la contraseña, también se revisa de nuevo la confirmación
    if (campo === "clave" && errores.confirmarClave !== "") validarCampo("confirmarClave", nuevos);
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const campos = Object.keys(datosVacios) as Campo[];
    const nuevosErrores = { ...sinErrores };
    campos.forEach((campo) => {
      nuevosErrores[campo] = calcularError(campo, datos);
    });
    setErrores(nuevosErrores);

    const hayErrores = campos.some((campo) => nuevosErrores[campo] !== "");
    if (hayErrores) {
      setEstado("error");
      return;
    }

    try {
      await onRegistrar?.(datos);
    } catch (error) {
      setErrorServidor(error instanceof Error ? error.message : "No se pudo completar el registro.");
      setEstado("error");
      return;
    }

    setErrorServidor("");
    setDatos(datosVacios);
    setEstado("exito");
  };

  return (
    <form onSubmit={enviar} noValidate>
      <CampoFormulario
        id="regNombre"
        etiqueta="Nombre completo"
        valor={datos.nombre}
        onCambiar={(v) => cambiarCampo("nombre", v)}
        onBlur={() => validarCampo("nombre")}
        placeholder="Ej: Juan Pérez González"
        maxLength={50}
        mostrarContador
        error={errores.nombre}
        obligatorio
      />

      <CampoFormulario
        id="regRun"
        etiqueta="RUN"
        valor={datos.run}
        onCambiar={(v) => cambiarCampo("run", v)}
        onBlur={() => validarCampo("run")}
        placeholder="12345678-K"
        maxLength={10}
        error={errores.run}
        obligatorio
      />

      <CampoFormulario
        id="regCorreo"
        etiqueta="Correo electrónico"
        tipo="email"
        valor={datos.correo}
        onCambiar={(v) => cambiarCampo("correo", v)}
        onBlur={() => validarCampo("correo")}
        placeholder="correo@ejemplo.com"
        maxLength={100}
        mostrarContador
        error={errores.correo}
        obligatorio
      />

      <CampoFormulario
        id="regTelefono"
        etiqueta="Teléfono"
        tipo="tel"
        valor={datos.telefono}
        onCambiar={(v) => cambiarCampo("telefono", v)}
        onBlur={() => validarCampo("telefono")}
        placeholder="+56 9 1234 5678"
        maxLength={15}
        error={errores.telefono}
        obligatorio
      />

      <div className="row">
        <div className="col-12 col-md-6">
          <CampoFormulario
            id="regPass"
            etiqueta="Contraseña"
            tipo="password"
            valor={datos.clave}
            onCambiar={(v) => cambiarCampo("clave", v)}
            onBlur={() => validarCampo("clave")}
            placeholder="6 a 50 caracteres"
            maxLength={50}
            error={errores.clave}
            obligatorio
          />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario
            id="regPassConfirm"
            etiqueta="Confirmar contraseña"
            tipo="password"
            valor={datos.confirmarClave}
            onCambiar={(v) => cambiarCampo("confirmarClave", v)}
            onBlur={() => validarCampo("confirmarClave")}
            placeholder="Repite tu contraseña"
            maxLength={50}
            error={errores.confirmarClave}
            obligatorio
          />
        </div>
      </div>

      <CampoCheckbox
        id="regTerminos"
        etiqueta="Acepto los términos y condiciones"
        marcado={datos.terminos}
        onCambiar={(marcado) => cambiarCampo("terminos", marcado)}
        error={errores.terminos}
      />

      {estado === "error" && (
        <div className="alert alert-danger" role="alert">
          {errorServidor !== "" ? errorServidor : "Por favor verifica los campos resaltados en rojo."}
        </div>
      )}
      {estado === "exito" && (
        <div className="alert alert-success" role="alert">
          ¡Registro completado con éxito!
        </div>
      )}

      <button type="submit" className="btn btn-warning fw-bold w-100">
        Registrarme
      </button>
    </form>
  );
}

export default FormularioRegistro;