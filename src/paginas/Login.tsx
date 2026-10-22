import { Link, useNavigate } from "react-router-dom";
import FormularioLogin from "../componentes/organismos/FormularioLogin";
import type { Sesion } from "../services/sesionService";

function Login() {
    const navigate = useNavigate();

    // El formulario solo avisa que el ingreso fue válido; la página decide adónde ir según el rol
    const alIngresar = (sesion: Sesion) => {
        navigate(sesion.rol === "Administrador" ? "/admin" : "/");
    };

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
                        <div className="text-center mb-4">
                            <i className="bi bi-person-circle text-warning display-4"></i>
                            <h1 className="h2 fw-bold text-dark mt-2">Iniciar sesión</h1>
                            <p className="text-muted small">
                                Ingresa con tu correo y contraseña para continuar.
                            </p>
                        </div>

                        <FormularioLogin prefijoId="pagLogin" onIngresar={alIngresar} />

                        <p className="text-center small text-muted mt-4 mb-0">
                            ¿No tienes cuenta?{" "}
                            <Link to="/registrate" className="text-dark fw-bold">
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;