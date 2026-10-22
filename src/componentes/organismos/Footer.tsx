import { Link } from "react-router-dom";

const enlaces = [
    { ruta: "/", texto: "Inicio" },
    { ruta: "/productos", texto: "Productos" },
    { ruta: "/novedades", texto: "Novedades" },
    { ruta: "/nosotros", texto: "Nosotros" },
    { ruta: "/contactanos", texto: "Contacto" },
    { ruta: "/registrate", texto: "Registro" },
];

// Organismo: pie de página con descripción, navegación y datos de contacto.
function Footer() {
    return (
        <footer className="bg-dark text-light pt-4 mt-auto border-top border-warning">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <h5 className="fw-bold text-warning mb-3">Ferretería Los Maestros</h5>
                        <p className="small text-secondary">
                            Venta de materiales de construcción, herramientas, pinturas, gasfitería,
                            electricidad y artículos para el hogar.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h5 className="fw-bold text-white mb-3">Navegación</h5>
                        <ul className="list-unstyled small">
                            {enlaces.map((enlace) => (
                                <li key={enlace.ruta}>
                                    <Link to={enlace.ruta} className="text-secondary text-decoration-none">
                                        {enlace.texto}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h5 className="fw-bold text-white mb-3">Contacto</h5>
                        <p className="small text-secondary mb-1">
                            <i className="bi bi-geo-alt-fill text-warning me-2"></i>Santiago, Chile
                        </p>
                        <p className="small text-secondary mb-1">
                            <i className="bi bi-telephone-fill text-warning me-2"></i>+56 9 7652 1661
                        </p>
                        <p className="small text-secondary mb-1">
                            <i className="bi bi-envelope-fill text-warning me-2"></i>contacto@losmaestros.cl
                        </p>
                    </div>
                </div>

                <div className="text-center py-3 mt-4 border-top border-secondary">
                    <small className="text-secondary">
                        &copy; 2026 Ferretería Los Maestros. Todos los derechos reservados.
                    </small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;