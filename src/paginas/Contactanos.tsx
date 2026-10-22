import FormularioContacto from "../componentes/organismos/FormularioContacto";

function Contactanos() {
    return (
        <main className="container py-5">
            <div className="row g-4 justify-content-center">
                <div className="col-12 col-lg-6">
                    <div className="bg-white p-4 p-md-5 rounded shadow-sm border">
                        <h1 className="h3 fw-bold mb-3">
                            <i className="bi bi-envelope-paper-fill text-warning me-2"></i>
                            Envíanos tu consulta
                        </h1>
                        <p className="text-muted small mb-4">
                            Escríbenos y nuestro equipo te responderá a la brevedad.
                        </p>

                        <FormularioContacto />
                    </div>
                </div>

                <div className="col-12 col-lg-5">
                    <div className="bg-white p-4 rounded shadow-sm border">
                        <h2 className="h5 fw-bold mb-3">
                            <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                            Ubicación y atención
                        </h2>
                        <p className="small text-muted">
                            <i className="bi bi-building me-2"></i>
                            Casa Matriz: Av. Alemania 1234, Santiago
                        </p>
                        <p className="small text-muted">
                            <i className="bi bi-clock me-2"></i>
                            Lunes a Viernes: 8:00 hrs - 18:30 hrs
                        </p>
                        <p className="small text-muted mb-0">
                            <i className="bi bi-telephone me-2"></i>
                            Mesa Central: +56 9 7652 1661
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Contactanos;