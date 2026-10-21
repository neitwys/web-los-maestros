import CardProducto from "../moleculas/CardProducto";
import type { Producto } from "../../data/productosData";

interface ListaProductosProps {
  productos: Producto[];
}

function ListaProductos({ productos }: ListaProductosProps) {
  if (!productos || productos.length === 0) {
    return (
      <div className="alert alert-warning text-center my-4" role="alert">
        No se encontraron productos en el catálogo.
      </div>
    );
  }

  return (
    <div className="row g-4">
      {productos.map((p) => (
        <div key={p.id} className="col-12 col-sm-6 col-lg-4">
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
  );
}

export default ListaProductos;