import React, { useState } from "react";
import { productosData } from "../data/productosData";
import type { Producto } from "../data/productosData";
import ResultadoCalculoCard from "../componentes/moleculas/CardCalculo";

type TipoCalculo = "pintura" | "mortero" | "ladrillos" | "osb" | "antihumedad" | "nivelador";

export function Calculadora() {
  const [tipoCalculo, setTipoCalculo] = useState<TipoCalculo>("pintura");
  const [metrosCuadrados, setMetrosCuadrados] = useState<number>(10);
  const [resultado, setResultado] = useState<{
    producto: Producto;
    unidades: number;
    totalCLP: number;
    detalles: string;
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (metrosCuadrados <= 0) return;

    let prod: Producto | undefined;
    let unidades = 0;
    let detalles = "";

    switch (tipoCalculo) {
      case "pintura":
        prod = productosData.find((p) => p.id === "PT001");
        if (prod) {
          unidades = Math.ceil(metrosCuadrados / 35);
          detalles = `Para pintar ${metrosCuadrados} m² a 2 manos, necesitas aprox. ${unidades} galón(es).`;
        }
        break;

      case "mortero":
        prod = productosData.find((p) => p.id === "MC003");
        if (prod) {
          unidades = Math.ceil(metrosCuadrados / 5);
          detalles = `Para pegar cerámica en ${metrosCuadrados} m², necesitas aprox. ${unidades} saco(s) de mortero cola.`;
        }
        break;

      case "ladrillos":
        prod = productosData.find((p) => p.id === "MC007");
        if (prod) {
          unidades = Math.ceil(metrosCuadrados * 38);
          detalles = `Para un muro de ${metrosCuadrados} m², necesitas aprox. ${unidades} unidades de ladrillo fiscal.`;
        }
        break;

      case "osb":
        prod = productosData.find((p) => p.id === "MD005");
        if (prod) {
          unidades = Math.ceil(metrosCuadrados / 2.97);
          detalles = `Para cubrir ${metrosCuadrados} m² de muro o tabique, necesitas aprox. ${unidades} plancha(s) de OSB.`;
        }
        break;

      case "antihumedad":
        prod = productosData.find((p) => p.id === "PT006");
        if (prod) {
          unidades = Math.ceil(metrosCuadrados / 25);
          detalles = `Para impermeabilizar o proteger ${metrosCuadrados} m², necesitas aprox. ${unidades} galón(es).`;
        }
        break;

      case "nivelador":
        prod = productosData.find((p) => p.id === "MC004");
        if (prod) {
          unidades = Math.ceil(metrosCuadrados / 3);
          detalles = `Para nivelar ${metrosCuadrados} m² de piso, necesitas aprox. ${unidades} saco(s) de mortero nivelador.`;
        }
        break;
    }

    if (prod) {
      setResultado({
        producto: prod,
        unidades,
        totalCLP: unidades * prod.precio,
        detalles,
      });
    }
  };

  const agregarALista = (prod: Producto, cantidad: number) => {
    const seleccionados = JSON.parse(
      localStorage.getItem("miListaSeleccion") || localStorage.getItem("carrito") || "[]"
    );
    const existe = seleccionados.some((item: any) => item.id === prod.id || item.codigo === prod.codigo);

    if (!existe) {
      seleccionados.push({ ...prod, cantidad });
      localStorage.setItem("miListaSeleccion", JSON.stringify(seleccionados));
      localStorage.setItem("carrito", JSON.stringify(seleccionados));
      alert(`Se agregaron ${cantidad} unidad(es) de "${prod.nombre}" a tu lista.`);
    } else {
      alert("El producto ya se encuentra en tu lista de selección.");
    }
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Calculadora de Materiales</h1>
        <p className="text-muted">
          Calcula la cantidad exacta de insumos que necesitas para tu proyecto o remodelación.
        </p>
      </div>

      <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="card-header bg-warning text-dark text-center py-3">
          <h4 className="fw-bold mb-0">Herramienta de Cálculo Los Maestros</h4>
        </div>
        <div className="card-body p-4">
          <form onSubmit={calcular} className="row g-3">
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Tipo de Trabajo</label>
              <select
                className="form-select"
                value={tipoCalculo}
                onChange={(e) => {
                  setTipoCalculo(e.target.value as TipoCalculo);
                  setResultado(null);
                }}
              >
                <option value="pintura">Pintar Paredes (Pintura Látex)</option>
                <option value="mortero">Pegar Cerámica (Mortero Cola)</option>
                <option value="ladrillos">Construir Muro (Ladrillo Fiscal N°5)</option>
                <option value="osb">Tabiquería / Revestimiento (Plancha OSB 9mm)</option>
                <option value="antihumedad">Protección Antihumedad (Pintura Especial)</option>
                <option value="nivelador">Nivelación de Piso (Mortero Nivelador)</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Superficie Estimada (m²)</label>
              <div className="input-group">
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  value={metrosCuadrados}
                  onChange={(e) => setMetrosCuadrados(Number(e.target.value))}
                  required
                />
                <span className="input-group-text">m²</span>
              </div>
            </div>

            <div className="col-12 text-center mt-4">
              <button type="submit" className="btn btn-warning fw-bold text-dark px-4">
                Calcular Materiales
              </button>
            </div>
          </form>

          {resultado && (
            <ResultadoCalculoCard
              producto={resultado.producto}
              unidades={resultado.unidades}
              totalCLP={resultado.totalCLP}
              detalles={resultado.detalles}
              onAgregarALista={agregarALista}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculadora;