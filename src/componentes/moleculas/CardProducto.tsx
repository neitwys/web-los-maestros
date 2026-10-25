import Boton from "../atomos/Boton";
import { agregarAlCarrito } from "../../services/carritoService";
import type { Producto } from "../../data/productosData";

interface CardProductoProps {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
  producto?: Producto;
}

function CardProducto({ id, titulo, categoria, descripcion, precio, imagen, producto }: CardProductoProps) {

  const rutaImagen = imagen.startsWith('/') ? imagen : `/${imagen}`;

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={rutaImagen} 
        className="card-img-top card-producto-img p-3" 
        alt={titulo} 
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <div className="card-body d-flex flex-column">
        <small className="text-uppercase text-muted fw-bold">{categoria}</small>
        <h5 className="card-title my-2">{titulo}</h5>
        <p className="card-text text-secondary small flex-grow-1">{descripcion}</p>
        <p className="texto-precio fs-5 fw-bold text-primary mt-auto">
          ${precio.toLocaleString("es-CL")}
        </p>
        <div className="mt-2">
          <Boton id={id} />
          <button
            type="button"
            className="btn btn-warning btn-sm w-100 mt-2 fw-bold"
            onClick={() =>
              agregarAlCarrito(
                producto ?? {
                  id,
                  nombre: titulo,
                  categoria,
                  descripcion,
                  precio,
                  imagen,
                  codigo: id,
                  subcategoria: "",
                  marca: "",
                  stock: 0,
                  unidad: "Unidad",
                }
              )
            }
          >
            <i className="bi bi-cart-plus me-1"></i>Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProducto;