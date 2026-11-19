import { Link } from "react-router-dom";

function NoEncontrada() {
    return (
        <main className="container py-5 flex-grow-1 text-center">
            <i className="bi bi-exclamation-triangle fs-1 text-warning d-block mb-3"></i>
            <h1 className="fw-bold text-dark">Página no encontrada</h1>
            <p className="lead text-secondary mb-4">
                La dirección que buscas no existe o fue movida.
            </p>
            <Link to="/" className="btn btn-warning fw-bold text-dark px-4">
                Volver al inicio
            </Link>
        </main>
    );
}

export default NoEncontrada;
