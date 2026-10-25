import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    calcularCantidadCarrito,
    calcularTotalCarrito,
    EVENTO_CARRITO,
    obtenerCarrito,
} from "../../services/carritoService";
import { cerrarSesion, EVENTO_SESION, obtenerSesion, type Sesion } from "../../services/sesionService";

const enlaces = [
    { ruta: "/", texto: "Inicio" },
    { ruta: "/productos", texto: "Productos" },
    { ruta: "/calculadora", texto: "Calculadora" },
    { ruta: "/novedades", texto: "Novedades" },
    { ruta: "/nosotros", texto: "Nosotros" },
    { ruta: "/contactanos", texto: "Contáctanos" },
];

function Navbar() {
    const navigate = useNavigate();
    const [carrito, setCarrito] = useState(() => obtenerCarrito());
    const [sesion, setSesion] = useState<Sesion | null>(() => obtenerSesion());

    useEffect(() => {
        const actualizar = () => setCarrito(obtenerCarrito());
        window.addEventListener(EVENTO_CARRITO, actualizar);
        return () => window.removeEventListener(EVENTO_CARRITO, actualizar);
    }, []);

    useEffect(() => {
        const actualizarSesion = () => setSesion(obtenerSesion());
        window.addEventListener(EVENTO_SESION, actualizarSesion);
        return () => window.removeEventListener(EVENTO_SESION, actualizarSesion);
    }, []);

    const cerrar = () => {
        cerrarSesion();
        navigate("/", { replace: true });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-warning border-3">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/img/logo_no_fondo.png" alt="Ferretería Los Maestros" height="60" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuPrincipal"
                    aria-controls="menuPrincipal"
                    aria-expanded="false"
                    aria-label="Abrir menú"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menuPrincipal">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {enlaces.map((enlace) => (
                            <li className="nav-item" key={enlace.ruta}>
                                <NavLink
                                    className={({ isActive }) => `nav-link${isActive ? " active fw-bold" : ""}`}
                                    to={enlace.ruta}
                                    end={enlace.ruta === "/"}
                                >
                                    {enlace.texto}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex flex-wrap align-items-center gap-2">
                        {sesion ? (
                            <>
                                <span className="navbar-text fw-semibold py-0">
                                    Hola, {sesion.nombre || sesion.correo}
                                </span>
                                {sesion.rol === "Administrador" && (
                                    <Link className="btn btn-outline-dark btn-sm" to="/admin">
                                        Panel admin
                                    </Link>
                                )}
                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={cerrar}>
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="btn btn-outline-dark btn-sm" to="/login">
                                    <i className="bi bi-person me-1"></i>Iniciar sesión
                                </Link>
                                <Link className="btn btn-warning btn-sm fw-bold" to="/registrate">
                                    Regístrate
                                </Link>
                            </>
                        )}
                        <Link className="btn btn-outline-success btn-sm fw-bold" to="/carrito">
                            <i className="bi bi-cart3 me-1"></i>
                            Carrito ({calcularCantidadCarrito(carrito)}) · $
                            {calcularTotalCarrito(carrito).toLocaleString("es-CL")}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;