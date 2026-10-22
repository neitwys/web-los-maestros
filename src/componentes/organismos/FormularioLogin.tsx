import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import { errorCorreo, errorClave } from "../../utils/validaciones";
import { iniciarSesion, type Sesion } from "../../services/sesionService";

interface FormularioLoginProps {
  // Se llama cuando el inicio de sesión fue exitoso. Quien lo usa decide adónde navegar.
  onIngresar?: (sesion: Sesion) => void;
  // Prefijo para los id de los campos (evita ids repetidos si el formulario aparece dos veces)
  prefijoId?: string;
}

// Organismo: formulario de inicio de sesión (estado con useState + validación + servicio de sesión).
function FormularioLogin({ onIngresar, prefijoId = "login" }: FormularioLoginProps) {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [errores, setErrores] = useState({ correo: "", clave: "" });
  const [errorLogin, setErrorLogin] = useState("");

  const cambiarCorreo = (valor: string) => {
    setCorreo(valor);
    setErrorLogin("");
    if (errores.correo !== "") setErrores((previo) => ({ ...previo, correo: errorCorreo(valor) }));
  };

  const cambiarClave = (valor: string) => {
    setClave(valor);
    setErrorLogin("");
    if (errores.clave !== "") setErrores((previo) => ({ ...previo, clave: errorClave(valor) }));
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevosErrores = { correo: errorCorreo(correo), clave: errorClave(clave) };
    setErrores(nuevosErrores);
    if (nuevosErrores.correo !== "" || nuevosErrores.clave !== "") return;

    // Los campos tienen formato válido: ahora el servicio revisa las credenciales
    const resultado = iniciarSesion(correo, clave);
    if (!resultado.ok) {
      setErrorLogin(resultado.error);
      return;
    }

    setCorreo("");
    setClave("");
    setErrorLogin("");
    onIngresar?.(resultado.sesion);
  };

  return (
    <form onSubmit={enviar} noValidate>
      <CampoFormulario
        id={`${prefijoId}Correo`}
        etiqueta="Correo electrónico"
        tipo="email"
        valor={correo}
        onCambiar={cambiarCorreo}
        onBlur={() => setErrores((previo) => ({ ...previo, correo: errorCorreo(correo) }))}
        placeholder="correo@ejemplo.com"
        maxLength={100}
        error={errores.correo}
      />

      <CampoFormulario
        id={`${prefijoId}Pass`}
        etiqueta="Contraseña"
        tipo="password"
        valor={clave}
        onCambiar={cambiarClave}
        onBlur={() => setErrores((previo) => ({ ...previo, clave: errorClave(clave) }))}
        placeholder="Contraseña"
        maxLength={10}
        error={errores.clave}
      />

      {errorLogin !== "" && (
        <div className="alert alert-danger py-2 small" role="alert">
          {errorLogin}
        </div>
      )}

      <button type="submit" className="btn btn-warning fw-bold w-100">
        Ingresar
      </button>
    </form>
  );
}

export default FormularioLogin;