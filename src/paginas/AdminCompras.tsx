import { Link } from "react-router-dom";
import { obtenerCompras } from "../services/compraService";

function AdminCompras() {
  const compras = obtenerCompras();

  return (
    <main className="container py-5 flex-grow-1">
      <Link to="/admin" className="text-decoration-none small">
        <i className="bi bi-arrow-left me-1"></i>Volver al panel
      </Link>
      <h1 className="fw-bold text-dark my-3">Compras realizadas</h1>

      {compras.length === 0 ? (
        <div className="alert alert-light border" role="status">
          Todavía no hay compras registradas.
        </div>
      ) : (
        <div className="row g-4">
          {[...compras].reverse().map((compra) => (
            <div className="col-12 col-lg-6" key={compra.id}>
              <article className="card h-100 shadow-sm">
                <div className="card-header d-flex justify-content-between gap-2">
                  <strong>{compra.id}</strong>
                  <span>{new Date(compra.fecha).toLocaleString("es-CL")}</span>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush mb-3">
                    {compra.items.map((item) => (
                      <li className="list-group-item px-0 d-flex justify-content-between" key={item.id}>
                        <span>{item.nombre} x {item.cantidad}</span>
                        <span>${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-end fw-bold fs-5 mb-0">
                    Total: ${compra.total.toLocaleString("es-CL")}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminCompras;
