import type { Producto } from "../../data/productosData";

interface CardCalculoProps {
  producto: Producto;
  unidades: number;
  totalCLP: number;
  detalles: string;
  onAgregarALista: (prod: Producto, cantidad: number) => void;
}

function CardCalculo({
  producto,
  unidades,
  totalCLP,
  detalles,
  onAgregarALista,
}: CardCalculoProps) {
  const rutaImagen = producto.imagen.startsWith("/")
    ? producto.imagen
    : `/${producto.imagen}`;

  return (
    <div className="mt-4 p-3 bg-light rounded border border-warning">
      <h5 className="fw-bold text-dark">Resultado del Cálculo:</h5>
      <p className="text-secondary small">{detalles}</p>

      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between bg-white p-3 rounded border gap-3 mt-3">
        <img
          src={rutaImagen}
          alt={producto.nombre}
          style={{ width: "90px", height: "90px", objectFit: "contain" }}
        />
        <div className="flex-grow-1 text-center text-md-start">
          <h6 className="fw-bold mb-1">{producto.nombre}</h6>
          <small className="text-muted d-block">
            Marca: {producto.marca} | Formato: {producto.unidad}
          </small>
          <span className="badge bg-warning text-dark mt-1">
            Cantidad Requerida: {unidades} {producto.unidad}(s)
          </span>
        </div>
        <div className="text-center text-md-end">
          <span className="text-muted small d-block">Costo Total Estimado</span>
          <span className="fs-5 fw-bold text-success d-block mb-2">
            \${totalCLP.toLocaleString("es-CL")} CLP
          </span>
          <button
            className="btn btn-outline-dark btn-sm fw-bold"
            onClick={() => onAgregarALista(producto, unidades)}
          >
            + Añadir a mi lista
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCalculo;