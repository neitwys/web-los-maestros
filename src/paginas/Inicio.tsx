import { Link } from "react-router-dom";
import Hero, { type Diapositiva } from "../componentes/organismos/Hero";
import CardProducto from "../componentes/moleculas/CardProducto";
import { obtenerProductos } from "../services/productoService";

const diapositivas: Diapositiva[] = [
    {
        imagen: "/img/logo.png",
        imagenTablet: "/img/logo.png",
        imagenMovil: "/img/logo_no_fondo.png",
        alt: "Fachada Ferretería Los Maestros",
    },
    {
        imagen: "/img/local fisico.png",
        imagenTablet: "/img/local fisico.png",
        imagenMovil: "/img/imagen 2 carrusel.png",
        alt: "Local físico de Ferretería Los Maestros",
    },
];

const CANTIDAD_DESTACADOS = 4;

function Inicio() {
    // Los destacados son los primeros productos del catálogo (como en la página original)
    const destacados = obtenerProductos().slice(0, CANTIDAD_DESTACADOS);

    return (
        <>
            <Hero diapositivas={diapositivas} />

            <section className="container py-5 flex-grow-1">
                <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4 border-bottom pb-2">
                    <div>
                        <h2 className="fw-bold text-dark m-0">Tenemos una gran variedad de productos.</h2>
                        <p className="text-muted m-0">
                            Selección especial de artículos disponibles en nuestra tienda.
                        </p>
                    </div>
                    <Link to="/productos" className="btn btn-sm btn-outline-dark fw-bold">
                        Ver catálogo completo &rarr;
                    </Link>
                </div>

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                    {destacados.map((p) => (
                        <div className="col" key={p.id}>
                            <CardProducto
                                id={p.id}
                                titulo={p.nombre}
                                categoria={p.categoria}
                                descripcion={p.descripcion}
                                precio={p.precio}
                                imagen={p.imagen}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Inicio;