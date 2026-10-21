import { useEffect, useState } from "react";
import type { Producto } from "../data/productosData";
import { obtenerProductos } from "../services/productoService";
import CatalogoProductos from "../componentes/organismos/CatalogoProductos";

function Inicio() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    // Pide los 68 productos al servicio
    const datos = obtenerProductos();
    setProductos(datos);
  }, []);

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Ferretería Los Maestros</h1>
        <p className="text-muted">Catálogo completo de materiales y herramientas</p>
      </div>

      {/* Renderiza el buscador, los filtros y la grilla de productos */}
      <CatalogoProductos productos={productos} />
    </div>
  );
}

export default Inicio;