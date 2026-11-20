import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import type { Usuario } from "../../data/usuariosData";
import {
  errorClave,
  errorCorreo,
  errorNombre,
  errorRun,
  errorTelefonoObligatorio,
  errorTextoObligatorio,
} from "../../utils/validaciones";

export interface DatosUsuario {
  run: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  clave: string;
}

interface FormularioUsuarioProps {
  usuario?: Usuario;
  onGuardar: (datos: DatosUsuario) => void | Promise<void>;
  onCancelar?: () => void;
}

interface Valores {
  run: string;
  correo: string;
  rol: string;
  nombre: string;
  apellido: string;
  telefono: string;
  clave: string;
}

type Campo = keyof Valores;
type Errores = Record<Campo, string>;

const sinErrores: Errores = {
  run: "", correo: "", rol: "", nombre: "", apellido: "", telefono: "", clave: "",
};

function desdeUsuario(u?: Usuario): Valores {
  if (!u) return { ...sinErrores };
  return {
    run: u.run,
    correo: u.correo,
    rol: u.rol,
    nombre: u.nombre,
    apellido: u.apellido ?? "",
    telefono: u.telefono,
    clave: "",
  };
}

function calcularError(campo: Campo, v: Valores, editando: boolean): string {
  switch (campo) {
    case "run":
      return errorRun(v.run);
    case "correo":
      return errorCorreo(v.correo);
    case "rol":
      return "";
    case "nombre":
      return errorNombre(v.nombre);
    case "apellido":
      return v.apellido.trim() === "" ? "" : errorTextoObligatorio(v.apellido, "Apellido", 100);
    case "telefono":
      return errorTelefonoObligatorio(v.telefono);
    case "clave":
      return editando ? "" : errorClave(v.clave);
  }
}

function FormularioUsuario({ usuario, onGuardar, onCancelar }: FormularioUsuarioProps) {
  const editando = usuario !== undefined;
  const [valores, setValores] = useState<Valores>(() => desdeUsuario(usuario));
  const [errores, setErrores] = useState<Errores>(sinErrores);
  const [hayErrores, setHayErrores] = useState(false);

  const validarCampo = (campo: Campo, actuales: Valores = valores) => {
    setErrores((previo) => ({ ...previo, [campo]: calcularError(campo, actuales, editando) }));
  };

  const cambiarCampo = (campo: Campo, valor: string) => {
    const nuevos = { ...valores, [campo]: valor };
    setValores(nuevos);
    setHayErrores(false);
    if (errores[campo] !== "") validarCampo(campo, nuevos);
  };

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const campos = Object.keys(sinErrores) as Campo[];
    const nuevosErrores = { ...sinErrores };
    campos.forEach((campo) => {
      nuevosErrores[campo] = calcularError(campo, valores, editando);
    });
    setErrores(nuevosErrores);

    if (campos.some((campo) => nuevosErrores[campo] !== "")) {
      setHayErrores(true);
      return;
    }

    await onGuardar({
      run: valores.run.trim(),
      nombre: valores.nombre.trim(),
      apellido: valores.apellido.trim(),
      correo: valores.correo.trim(),
      telefono: valores.telefono.trim(),
      clave: valores.clave,
    });

    if (!editando) setValores(desdeUsuario());
  };

  const campo = (nombre: Campo) => ({
    id: `usr-${nombre}`,
    valor: valores[nombre],
    onCambiar: (v: string) => cambiarCampo(nombre, v),
    onBlur: () => validarCampo(nombre),
    error: errores[nombre],
  });

  return (
    <form onSubmit={enviar} noValidate>
      <div className="row">
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("run")} etiqueta="RUN" placeholder="12345678-5" maxLength={12} deshabilitado={editando} obligatorio />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("nombre")} etiqueta="Nombre" maxLength={50} obligatorio />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("apellido")} etiqueta="Apellido (opcional)" maxLength={100} />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <CampoFormulario {...campo("correo")} etiqueta="Correo electrónico" tipo="email" maxLength={100} deshabilitado={editando} obligatorio />
        </div>
        {editando ? (
          <div className="col-12 col-md-3">
            <CampoFormulario {...campo("rol")} etiqueta="Rol" deshabilitado obligatorio />
          </div>
        ) : (
          <div className="col-12 col-md-3">
            <CampoFormulario {...campo("clave")} etiqueta="Contraseña" tipo="password" placeholder="6 a 50 caracteres" maxLength={50} obligatorio />
          </div>
        )}
        <div className="col-12 col-md-3">
          <CampoFormulario {...campo("telefono")} etiqueta="Teléfono" placeholder="Ej: +56912345678" maxLength={20} obligatorio />
        </div>
      </div>

      {hayErrores && (
        <div className="alert alert-danger" role="alert">
          Por favor verifica los campos resaltados en rojo.
        </div>
      )}

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-warning fw-bold">
          {editando ? "Guardar cambios" : "Crear usuario"}
        </button>
        {onCancelar && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioUsuario;
