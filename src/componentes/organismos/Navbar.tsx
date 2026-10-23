import { NavLink, Link } from "react-router-dom";

const enlaces = [
    { ruta: "/", texto: "Inicio" },
    { ruta: "/productos", texto: "Productos" },
    { ruta: "/calculadora", texto: "Calculadora" },
    { ruta: "/novedades", texto: "Novedades" },
    { ruta: "/nosotros", texto: "Nosotros" },
    { ruta: "/contactanos", texto: "Contáctanos" },
];

function Navbar() {
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

                    <div className="d-flex gap-2">
                        <Link className="btn btn-outline-dark btn-sm" to="/login">
                            <i className="bi bi-person me-1"></i>Iniciar sesión
                        </Link>
                        <Link className="btn btn-warning btn-sm fw-bold" to="/registrate">
                            Regístrate
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;