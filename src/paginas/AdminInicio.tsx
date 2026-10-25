import { Link, useNavigate } from "react-router-dom";
import { obtenerProductos } from "../services/productoService";
import { obtenerUsuarios } from "../services/usuarioService";
import { cerrarSesion, obtenerSesion } from "../services/sesionService";
import { obtenerCompras } from "../services/compraService";

function AdminInicio() {
    const navigate = useNavigate();
    const sesion = obtenerSesion();

    const totalProductos = obtenerProductos().length;
    const totalUsuarios = obtenerUsuarios().length;
    const totalCompras = obtenerCompras().length;

    const salir = () => {
        cerrarSesion();
        navigate("/");
    };

    const secciones = [
        {
            ruta: "/admin/productos",
            icono: "bi-box-seam",
            titulo: "Gestión de productos",
            detalle: `${totalProductos} productos en el catálogo`,
        },
        {
            ruta: "/admin/usuarios",
            icono: "bi-people",
            titulo: "Gestión de usuarios",
            detalle: `${totalUsuarios} usuarios registrados`,
        },
        {
            ruta: "/admin/compras",
            icono: "bi-receipt",
            titulo: "Compras realizadas",
            detalle: `${totalCompras} compras registradas`,
        },
    ];

    return (
        <main className="container py-5 flex-grow-1">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                <div>
                    <h1 className="fw-bold text-dark mb-0">Panel de administración</h1>
                    <p className="text-muted mb-0">Sesión iniciada como {sesion?.correo}</p>
                </div>
                <button type="button" className="btn btn-outline-dark" onClick={salir}>
                    <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
                </button>
            </div>

            <div className="row g-4">
                {secciones.map((seccion) => (
                    <div className="col-12 col-md-6" key={seccion.ruta}>
                        <Link to={seccion.ruta} className="text-decoration-none">
                            <div className="card h-100 shadow-sm border-0 border-start border-4 border-warning">
                                <div className="card-body d-flex align-items-center gap-3 p-4">
                                    <i className={`bi ${seccion.icono} display-5 text-warning`}></i>
                                    <div>
                                        <h2 className="h5 fw-bold text-dark mb-1">{seccion.titulo}</h2>
                                        <p className="text-muted mb-0">{seccion.detalle}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default AdminInicio;