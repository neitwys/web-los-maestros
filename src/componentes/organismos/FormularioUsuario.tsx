import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import CampoSelect from "../moleculas/CampoSelect";
import type { RolUsuario, Usuario } from "../../data/usuariosData";
import { obtenerComunas, regionesData } from "../../data/regionesData";
import {
  errorClave,
  errorCorreo,
  errorNombre,
  errorRun,
  errorTextoObligatorio,
} from "../../utils/validaciones";

interface FormularioUsuarioProps {
  usuario?: Usuario;                       // Si viene, el formulario está en modo edición
  onGuardar: (datos: Usuario) => void;     // Se llama solo con datos válidos
  onCancelar?: () => void;
}

interface Valores {
  run: string;
  nombre: string;
  apellidos: string;
  correo: string;
  clave: string;
  rol: string;
  fechaNac: string;
  region: string;
  comuna: string;
  direccion: string;
}

type Campo = keyof Valores;
type Errores = Record<Campo, string>;

const ROLES: RolUsuario[] = ["Administrador", "Cliente"];
const NOMBRES_REGIONES = regionesData.map((r) => r.region);

const valoresVacios: Valores = {
  run: "", nombre: "", apellidos: "", correo: "", clave: "", rol: "",
  fechaNac: "", region: "", comuna: "", direccion: "",
};

const sinErrores: Errores = { ...valoresVacios };

function desdeUsuario(u?: Usuario): Valores {
  if (!u) return valoresVacios;
  return { ...u, clave: "", fechaNac: u.fechaNac ?? "" };
}

// La fecha de nacimiento es opcional, pero si se ingresa no puede ser futura
function errorFechaNac(valor: string): string {
  if (valor === "") return "";
  const hoy = new Date().toISOString().slice(0, 10);
  return valor > hoy ? "La fecha de nacimiento no puede ser futura." : "";
}

function calcularError(campo: Campo, v: Valores, editando: boolean): string {
  switch (campo) {
    case "run":
      return errorRun(v.run);
    case "nombre":
      return errorNombre(v.nombre);
    case "apellidos":
      return errorTextoObligatorio(v.apellidos, "Apellidos", 100);
    case "correo":
      return errorCorreo(v.correo);
    case "clave":
      return !editando ? errorClave(v.clave) : v.clave === "" ? "" : errorClave(v.clave);
    case "rol":
      return errorTextoObligatorio(v.rol, "Rol", 20);
    case "fechaNac":
      return errorFechaNac(v.fechaNac);
    case "region":
      return errorTextoObligatorio(v.region, "Región", 60);
    case "comuna":
      return errorTextoObligatorio(v.comuna, "Comuna", 60);
    case "direccion":
      return errorTextoObligatorio(v.direccion, "Dirección", 100);
  }
}

// Organismo: formulario para crear (sin "usuario") o editar (con "usuario") un usuario.
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
    // Al cambiar la región, la comuna elegida deja de ser válida y se vuelve a elegir
    if (campo === "region") nuevos.comuna = "";

    setValores(nuevos);
    setHayErrores(false);

    if (errores[campo] !== "") validarCampo(campo, nuevos);
    if (campo === "region") setErrores((previo) => ({ ...previo, comuna: "" }));
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const campos = Object.keys(valoresVacios) as Campo[];
    const nuevosErrores = { ...sinErrores };
    campos.forEach((campo) => {
      nuevosErrores[campo] = calcularError(campo, valores, editando);
    });
    setErrores(nuevosErrores);

    if (campos.some((campo) => nuevosErrores[campo] !== "")) {
      setHayErrores(true);
      return;
    }

    const datos: Usuario = {
      run: valores.run.trim(),
      nombre: valores.nombre.trim(),
      apellidos: valores.apellidos.trim(),
      correo: valores.correo.trim().toLowerCase(),
      ...(valores.clave !== "" ? { clave: valores.clave.trim() } : {}),
      rol: valores.rol as RolUsuario,
      region: valores.region,
      comuna: valores.comuna,
      direccion: valores.direccion.trim(),
    };
    if (valores.fechaNac !== "") datos.fechaNac = valores.fechaNac;

    onGuardar(datos);

    // Al crear, el formulario queda limpio para ingresar otro usuario
    if (!editando) setValores(valoresVacios);
  };

  // Atajo para no repetir las props comunes de cada campo
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
          <CampoFormulario {...campo("run")} etiqueta="RUN" placeholder="12345678-K" maxLength={10}
            deshabilitado={editando} obligatorio />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("nombre")} etiqueta="Nombre" maxLength={50} obligatorio />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("apellidos")} etiqueta="Apellidos" maxLength={100} obligatorio />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6">
          <CampoFormulario {...campo("correo")} etiqueta="Correo electrónico" tipo="email"
            placeholder="correo@ejemplo.com" maxLength={100} obligatorio />
        </div>
        <div className="col-12 col-md-3">
          <CampoSelect {...campo("rol")} etiqueta="Rol" opciones={ROLES} textoVacio="Seleccione rol..." obligatorio />
        </div>
        <div className="col-12 col-md-3">
          <CampoFormulario {...campo("fechaNac")} etiqueta="Fecha de nacimiento (opcional)" tipo="date" />
        </div>
      </div>

      <CampoFormulario
        {...campo("clave")}
        etiqueta={editando ? "Nueva contraseña (opcional)" : "Contraseña"}
        tipo="password"
        placeholder={editando ? "Dejar vacío para conservarla" : "4 a 10 caracteres"}
        maxLength={10}
        obligatorio={!editando}
      />

      <div className="row">
        <div className="col-12 col-md-6">
          <CampoSelect {...campo("region")} etiqueta="Región" opciones={NOMBRES_REGIONES}
            textoVacio="Seleccione región..." obligatorio />
        </div>
        <div className="col-12 col-md-6">
          <CampoSelect {...campo("comuna")} etiqueta="Comuna" opciones={obtenerComunas(valores.region)}
            textoVacio="Seleccione comuna..." deshabilitado={valores.region === ""} obligatorio />
        </div>
      </div>

      <CampoFormulario {...campo("direccion")} etiqueta="Dirección" maxLength={100} obligatorio />

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