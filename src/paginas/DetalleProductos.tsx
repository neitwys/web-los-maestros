import { useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/productoService";
import BotonVolver from "../componentes/atomos/BotonVolver";

function DetalleProductos() {
    const { id } = useParams();
    const producto = id ? obtenerProductoPorId(id) : undefined;

    if (!producto) {
        return (
            <div className="container py-5 text-center">
                <h1 className="h3 mb-3">Producto no encontrado</h1>
                <BotonVolver />
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h1 className="h3 mb-4">Detalle del producto</h1>

            <div className="row g-4">
                <div className="col-12 col-md-5 text-center">
                    <img
                        src={`/${producto.imagen}`}
                        alt={producto.nombre}
                        className="img-fluid rounded border"
                        style={{ maxHeight: "350px", objectFit: "contain" }}
                    />
                </div>

                <div className="col-12 col-md-7">
                    <span className="badge text-bg-warning mb-2">{producto.categoria}</span>
                    <h2 className="h4">{producto.nombre}</h2>
                    <p className="text-muted mb-1">Marca: {producto.marca}</p>
                    <p className="text-muted">Código: {producto.codigo}</p>
                    <p>{producto.descripcion}</p>
                    <p className="fs-3 fw-bold">${producto.precio.toLocaleString("es-CL")}</p>
                    <p>
                        {producto.stock > 0
                            ? `Stock disponible: ${producto.stock} (${producto.unidad})`
                            : "Sin stock"}
                    </p>

                    <BotonVolver />
                </div>
            </div>
        </div>
    );
}

export default DetalleProductos;