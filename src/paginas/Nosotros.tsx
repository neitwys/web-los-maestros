const valores = [
    {
        icono: "bi-lightbulb",
        titulo: "Innovación",
        texto: "Buscamos siempre nuevas formas de mejorar nuestros servicios y catálogo.",
    },
    {
        icono: "bi-shield-check",
        titulo: "Confianza",
        texto: "Garantizar productos de alta durabilidad y un trato transparente con la comunidad.",
    },
    {
        icono: "bi-people",
        titulo: "Compromiso",
        texto: "Acompañar al cliente antes, durante y después de cada compra.",
    },
];

const equipo = [
    {
        nombre: "José Castro",
        rol: "Desarrollador Frontend",
        claseRol: "bg-secondary",
        descripcion: "Encargado de la maquetación HTML, diseño de vistas y componentes Bootstrap.",
        imagen: "/img/usuario.jpg",
    },
    {
        nombre: "Juan Carlos Hernández",
        rol: "Programador TypeScript",
        claseRol: "bg-warning text-dark",
        descripcion: "Lógica de filtrado de productos, validaciones de formularios y LocalStorage.",
        imagen: "/img/usuario.jpg",
    },
    {
        nombre: "Sebastián Díaz",
        rol: "Diseñador UI/UX",
        claseRol: "bg-secondary",
        descripcion: "Estructura responsive, integración de marcas, estilos CSS y usabilidad.",
        imagen: "/img/usuario.jpg",
    },
];

function Nosotros() {
    return (
        <main className="container py-5 flex-grow-1">
            <h1 className="text-center fw-bold text-dark mb-4">Sobre Ferretería Los Maestros</h1>

            <div className="row align-items-center mb-5 g-4">
                <div className="col-md-6">
                    <h2 className="fw-bold text-warning-emphasis">Nuestra Misión</h2>
                    <p className="lead text-secondary">
                        Ofrecer a cada cliente herramientas, materiales y soluciones de calidad que
                        faciliten sus proyectos de construcción y reparación. Buscamos ser un aliado
                        confiable, entregando atención cercana, precios justos y asesoría práctica
                        para que cada idea se convierta en realidad.
                    </p>
                </div>
                <div className="col-md-6">
                    <img
                        src="/img/imagen 2 carrusel.png"
                        className="img-fluid rounded shadow-sm w-100 object-fit-cover"
                        style={{ maxHeight: "320px" }}
                        alt="Local físico Ferretería Los Maestros"
                    />
                </div>
            </div>

            <div className="row mb-5">
                <h2 className="text-center fw-bold mb-4">Nuestros Valores</h2>
                {valores.map((valor) => (
                    <div className="col-md-4 mb-3" key={valor.titulo}>
                        <div className="card h-100 shadow-sm border-0 text-center p-3">
                            <div className="card-body">
                                <i className={`bi ${valor.icono} fs-1 text-warning mb-3 d-block`}></i>
                                <h5 className="card-title fw-bold">{valor.titulo}</h5>
                                <p className="card-text text-muted">{valor.texto}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4 mb-5">
                <div className="col-md-6">
                    <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-4 border-warning">
                        <h3 className="fw-bold mb-3">¿Quiénes Somos?</h3>
                        <p className="text-secondary mb-0">
                            Somos una ferretería dedicada a brindar soluciones prácticas y confiables
                            para tus proyectos de construcción, reparación y mejoramiento del hogar.
                            Nos caracteriza la cercanía con nuestros clientes, ofreciendo productos de
                            calidad, asesoría personalizada y precios justos. Creemos que cada
                            herramienta y material es una oportunidad para construir, crear y mejorar.
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="p-4 bg-white rounded shadow-sm h-100 border-start border-4 border-dark">
                        <h3 className="fw-bold mb-3">Nuestra Historia</h3>
                        <p className="text-secondary mb-0">
                            Nuestra ferretería nació como un pequeño negocio familiar, impulsado por la
                            pasión de apoyar a la comunidad en sus proyectos. Con el tiempo, fuimos
                            creciendo gracias a la confianza de nuestros clientes y al compromiso de
                            ofrecer siempre productos de calidad. Hoy seguimos manteniendo ese espíritu
                            inicial, combinando tradición con tecnología.
                        </p>
                    </div>
                </div>
            </div>

            <section className="my-5">
                <h2 className="text-center fw-bold mb-2">Equipo Desarrollador</h2>
                <p className="text-center text-muted mb-4">
                    Estudiantes a cargo del diseño y desarrollo de este proyecto web
                </p>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {equipo.map((integrante) => (
                        <div className="col" key={integrante.nombre}>
                            <div className="card h-100 border-0 shadow-sm text-center p-3">
                                <img
                                    src={integrante.imagen}
                                    alt={integrante.nombre}
                                    className="card-img-top mx-auto"
                                    style={{ width: "100%", maxHeight: "260px", objectFit: "cover" }}
                                />
                                <div className="card-body p-2">
                                    <h5 className="card-title fw-bold mb-1">{integrante.nombre}</h5>
                                    <span className={`badge ${integrante.claseRol} mb-2`}>{integrante.rol}</span>
                                    <p className="card-text text-muted small">{integrante.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Nosotros;