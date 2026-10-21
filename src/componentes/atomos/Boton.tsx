import { Link } from "react-router-dom";

interface BotonProps {
  id: string;
}

// Botón que lleva al detalle del producto ajustado a tu ruta /producto/:id
function Boton({ id }: BotonProps) {
  return (
    <Link to={`/producto/${id}`} className="btn btn-primary btn-sm w-100">
      Ver producto
    </Link>
  );
}

export default Boton;