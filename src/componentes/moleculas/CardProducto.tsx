import { useLocation, useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton";
import { agregarAlCarrito } from "../../services/carritoService";
import { obtenerSesion } from "../../services/sesionService";

interface CardProductoProps {
  id: string;
  titulo: string;
  categoria: string;
  descripcion: string;
  precio: number;
  imagen: string;
  unidad?: string;
}

function CardProducto({ id, titulo, categoria, descripcion, precio, imagen, unidad }: CardProductoProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const rutaImagen = imagen.startsWith('/') ? imagen : `/${imagen}`;

  const comprar = async () => {
    if (!obtenerSesion()) {
      navigate("/login", {
        state: {
          mensaje: "Inicia sesión o crea tu cuenta para agregar productos al carrito.",
          desde: location.pathname,
        },
      });
      return;
    }

    try {
      await agregarAlCarrito(id);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo agregar el producto.");
    }
  };

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
          {unidad && <small className="text-muted fs-6 fw-normal"> / {unidad}</small>}
        </p>
        <div className="mt-2">
          <Boton id={id} />
          <button
            type="button"
            className="btn btn-warning btn-sm w-100 mt-2 fw-bold"
            onClick={comprar}
          >
            <i className="bi bi-cart-plus me-1"></i>Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProducto;