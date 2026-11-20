import { useEffect, useState } from "react";
import {
  calcularTotalCarrito,
  cambiarCantidadCarrito,
  cargarCarrito,
  eliminarDelCarrito,
  EVENTO_CARRITO,
  obtenerCarrito,
  type ItemCarrito,
  vaciarCarrito,
} from "../services/carritoService";
import { useNavigate } from "react-router-dom";

function Carrito() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ItemCarrito[]>(() => obtenerCarrito());

  useEffect(() => {
    const actualizar = () => setItems(obtenerCarrito());
    window.addEventListener(EVENTO_CARRITO, actualizar);
    cargarCarrito().catch(() => undefined);
    return () => window.removeEventListener(EVENTO_CARRITO, actualizar);
  }, []);

  const avisarError = (error: unknown) => {
    window.alert(error instanceof Error ? error.message : "No se pudo completar la operación.");
  };

  const cambiarCantidad = async (item: ItemCarrito, cantidad: number) => {
    if (!Number.isInteger(cantidad) || cantidad < 1) return;
    try {
      await cambiarCantidadCarrito(item.id, cantidad);
    } catch (error) {
      avisarError(error);
    }
  };

  const quitar = async (item: ItemCarrito) => {
    try {
      await eliminarDelCarrito(item.id);
    } catch (error) {
      avisarError(error);
    }
  };

  const vaciar = async () => {
    try {
      await vaciarCarrito();
    } catch (error) {
      avisarError(error);
    }
  };

  const pagar = async () => {
    try {
      await vaciarCarrito();
      window.alert("Pago realizado. ¡Gracias por tu compra!");
      navigate("/");
    } catch (error) {
      avisarError(error);
    }
  };

  return (
    <main className="container py-5 flex-grow-1">
      <h1 className="fw-bold mb-4">Mi carrito</h1>

      {items.length === 0 ? (
        <div className="alert alert-light border" role="status">
          Tu carrito está vacío.
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>{item.nombre}</strong>
                      <div className="text-muted small">${item.precio.toLocaleString("es-CL")} c/u</div>
                    </td>
                    <td className="text-center">
                      <input
                        className="form-control mx-auto"
                        style={{ maxWidth: "90px" }}
                        type="number"
                        min="1"
                        value={item.cantidad}
                        aria-label={`Cantidad de ${item.nombre}`}
                        onChange={(e) => cambiarCantidad(item, Number(e.target.value))}
                      />
                    </td>
                    <td className="text-end">
                      ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => quitar(item)}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 border-top pt-3">
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={vaciar}>
                Vaciar carrito
              </button>
              <button type="button" className="btn btn-success fw-bold" onClick={pagar}>
                <i className="bi bi-credit-card me-1"></i>Pagar
              </button>
            </div>
            <strong className="fs-4">Total: ${calcularTotalCarrito(items).toLocaleString("es-CL")}</strong>
          </div>
        </>
      )}
    </main>
  );
}

export default Carrito;
