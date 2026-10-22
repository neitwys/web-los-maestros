import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { errorNombre, errorCorreo, errorTelefono, errorMensaje } from "../../utils/validaciones";

export interface DatosContacto {
  nombre: string;
  correo: string;
  telefono: string;
  mensaje: string;
}

interface FormularioContactoProps {
  // Se llama solo cuando todos los campos son válidos. La página decide qué hacer con los datos.
  onEnviar?: (datos: DatosContacto) => void;
}

type Campo = keyof DatosContacto;

const validadores: Record<Campo, (valor: string) => string> = {
  nombre: errorNombre,
  correo: errorCorreo,
  telefono: errorTelefono,
  mensaje: errorMensaje,
};

const vacio: DatosContacto = { nombre: "", correo: "", telefono: "", mensaje: "" };

// Organismo: formulario de contacto (estado con useState + validaciones por campo).
function FormularioContacto({ onEnviar }: FormularioContactoProps) {
  const [datos, setDatos] = useState<DatosContacto>(vacio);
  const [errores, setErrores] = useState<DatosContacto>(vacio);
  const [estado, setEstado] = useState<"inicial" | "error" | "exito">("inicial");

  // Valida un solo campo y guarda su mensaje de error ("" si está correcto)
  const validarCampo = (campo: Campo, valor: string) => {
    setErrores((previo) => ({ ...previo, [campo]: validadores[campo](valor) }));
  };

  const cambiarCampo = (campo: Campo, valor: string) => {
    setDatos((previo) => ({ ...previo, [campo]: valor }));
    setEstado("inicial");
    // Si el campo ya mostraba un error, se revalida mientras el usuario corrige
    if (errores[campo] !== "") validarCampo(campo, valor);
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevosErrores: DatosContacto = {
      nombre: errorNombre(datos.nombre),
      correo: errorCorreo(datos.correo),
      telefono: errorTelefono(datos.telefono),
      mensaje: errorMensaje(datos.mensaje),
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((mensaje) => mensaje !== "");
    if (hayErrores) {
      setEstado("error");
      return;
    }

    onEnviar?.(datos);
    setDatos(vacio);
    setEstado("exito");
  };

  return (
    <form onSubmit={enviar} noValidate>
      <CampoFormulario
        id="cntNombre"
        etiqueta="Nombre"
        valor={datos.nombre}
        onCambiar={(v) => cambiarCampo("nombre", v)}
        onBlur={() => validarCampo("nombre", datos.nombre)}
        placeholder="Tu nombre"
        maxLength={50}
        error={errores.nombre}
        obligatorio
      />

      <CampoFormulario
        id="cntCorreo"
        etiqueta="Correo electrónico"
        tipo="email"
        valor={datos.correo}
        onCambiar={(v) => cambiarCampo("correo", v)}
        onBlur={() => validarCampo("correo", datos.correo)}
        placeholder="correo@ejemplo.com"
        maxLength={100}
        error={errores.correo}
        obligatorio
      />

      <CampoFormulario
        id="cntTelefono"
        etiqueta="Teléfono (opcional)"
        tipo="tel"
        valor={datos.telefono}
        onCambiar={(v) => cambiarCampo("telefono", v)}
        onBlur={() => validarCampo("telefono", datos.telefono)}
        placeholder="+56 9 1234 5678"
        maxLength={12}
        error={errores.telefono}
      />

      <CampoFormulario
        id="cntMensaje"
        etiqueta="Mensaje"
        tipo="textarea"
        valor={datos.mensaje}
        onCambiar={(v) => cambiarCampo("mensaje", v)}
        onBlur={() => validarCampo("mensaje", datos.mensaje)}
        placeholder="¿En qué podemos ayudarte?"
        maxLength={500}
        mostrarContador
        error={errores.mensaje}
        obligatorio
      />

      {estado === "error" && (
        <div className="alert alert-danger" role="alert">
          Por favor verifica los campos resaltados en rojo.
        </div>
      )}
      {estado === "exito" && (
        <div className="alert alert-success" role="alert">
          ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
        </div>
      )}

      <button type="submit" className="btn btn-warning fw-bold w-100">
        Enviar mensaje
      </button>
    </form>
  );
}

export default FormularioContacto;