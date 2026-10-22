import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FormularioRegistro from "../componentes/organismos/FormularioRegistro";

function Registrate() {
    const navigate = useNavigate();
    const temporizador = useRef<number | undefined>(undefined);

    // Si el usuario sale de la página antes de los 2 segundos, se cancela la redirección
    useEffect(() => {
        return () => window.clearTimeout(temporizador.current);
    }, []);

    // El formulario solo avisa que el registro fue válido; la página decide qué hacer después
    const alRegistrar = () => {
        temporizador.current = window.setTimeout(() => navigate("/"), 2000);
    };

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8 col-xl-7">
                    <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
                        <div className="text-center mb-4">
                            <i className="bi bi-person-plus-fill text-warning display-4"></i>
                            <h1 className="h2 fw-bold text-dark mt-2">Crea tu cuenta</h1>
                            <p className="text-muted small">
                                Únete a nuestra comunidad para acceder a promociones exclusivas y
                                guardar tus compras.
                            </p>
                        </div>

                        <FormularioRegistro onRegistrar={alRegistrar} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Registrate;