import { useState } from "react";
import type { Producto } from "../../data/productosData";
import BuscadorProductos from "../moleculas/BuscadorProductos";
import FiltroCategorias from "../moleculas/FiltroCategorias";
import ListaProductos from "./ListaProductos";

// Categorías alineadas exactamente con productosData.ts
const CATEGORIAS = [
  "Todos",
  "Mat. Construcción",
  "Pinturas",
  "Herramientas",
  "Gasfitería",
  "Electricidad",
  "Tornillería",
  "Madera",
  "Seguridad",
  "Jardín"
];

interface CatalogoProductosProps {
  productos: Producto[];
}

function CatalogoProductos({ productos = [] }: CatalogoProductosProps) {
  const [categoria, setCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const texto = busqueda.trim().toLowerCase();

  const visibles = productos.filter((p) => {
    const catProd = (p.categoria || "").toLowerCase().trim();
    const catFiltro = categoria.toLowerCase().trim();

    const coincideCategoria =
      categoria === "Todos" ||
      catProd === catFiltro ||
      catProd.includes(catFiltro) ||
      catFiltro.includes(catProd);

    const coincideTexto =
      texto === "" ||
      (p.nombre || "").toLowerCase().includes(texto) ||
      (p.descripcion || "").toLowerCase().includes(texto) ||
      (p.marca || "").toLowerCase().includes(texto);

    return coincideCategoria && coincideTexto;
  });

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-5">
          <BuscadorProductos valor={busqueda} onCambiar={setBusqueda} />
        </div>
        <div className="col-12 col-md-7">
          <FiltroCategorias categorias={CATEGORIAS} activa={categoria} onCambiar={setCategoria} />
        </div>
      </div>

      <ListaProductos productos={visibles} />
    </>
  );
}

export default CatalogoProductos;