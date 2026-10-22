import type { Producto } from "../../data/productosData";

interface TablaProductosProps {
  productos: Producto[];
  onEditar: (producto: Producto) => void;
  onEliminar: (producto: Producto) => void;
}

// Organismo presentacional: lista los productos en una tabla. No modifica datos, solo avisa qué botón se pulsó.
function TablaProductos({ productos, onEditar, onEliminar }: TablaProductosProps) {
  if (productos.length === 0) {
    return (
      <div className="alert alert-light border text-center" role="status">
        No hay productos registrados.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle bg-white shadow-sm">
        <thead className="table-dark">
          <tr>
            <th scope="col">Imagen</th>
            <th scope="col">Código</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categoría</th>
            <th scope="col" className="text-end">Precio</th>
            <th scope="col" className="text-end">Stock</th>
            <th scope="col" className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <img
                  src={producto.imagen.startsWith("/") ? producto.imagen : `/${producto.imagen}`}
                  alt={producto.nombre}
                  width={48}
                  height={48}
                  style={{ objectFit: "contain" }}
                />
              </td>
              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td className="text-end">${producto.precio.toLocaleString("es-CL")}</td>
              <td className="text-end">{producto.stock}</td>
              <td className="text-center text-nowrap">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-dark me-2"
                  onClick={() => onEditar(producto)}
                  aria-label={`Editar ${producto.nombre}`}
                >
                  <i className="bi bi-pencil"></i> Editar
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onEliminar(producto)}
                  aria-label={`Eliminar ${producto.nombre}`}
                >
                  <i className="bi bi-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaProductos;