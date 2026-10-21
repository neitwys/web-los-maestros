import { useEffect, useState } from "react";
import type { Producto } from "../data/productosData";
import { obtenerProductos } from "../services/productoService";
import CatalogoProductos from "../componentes/organismos/CatalogoProductos";

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    // Obtiene los productos cargados en la ferretería
    const datos = obtenerProductos();
    setProductos(datos);
  }, []);

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Catálogo de Productos</h1>
        <p className="text-muted">
          Encuentra todo en materiales de construcción, herramientas, pinturas y más
        </p>
      </div>

      {/* Renderiza el buscador, filtro de categorías y la grilla con los productos */}
      <CatalogoProductos productos={productos} />
    </div>
  );
}

export default Productos;