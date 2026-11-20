import { useEffect, useState } from "react";
import type { Producto } from "../data/productosData";
import { obtenerProductos } from "../services/productoService";
import CatalogoProductos from "../componentes/organismos/CatalogoProductos";

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch((e) => setError(e instanceof Error ? e.message : "No se pudieron cargar los productos."));
  }, []);

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Catálogo de Productos</h1>
        <p className="text-muted">
          Encuentra todo en materiales de construcción, herramientas, pinturas y más
        </p>
      </div>

      
      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <CatalogoProductos productos={productos} />
    </div>
  );
}

export default Productos;