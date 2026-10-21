import { useParams } from "react-router-dom";
import { productosData as productos } from "../data/productosData";
import BotonVolver from "../componentes/atomos/BotonVolver";

function DetalleProductos() {
    const { id } = useParams();
    const producto = productos.find( (p) => p.codigo === id)

    if (!producto) {
        return <p>Producto no encontrado</p>
    }

    return (
        <div>
            <h1>Detalle del producto</h1>
            <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ width: '300px' }}    
            />

            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>${producto.precio.toLocaleString('es-CL')}</p>
            
            <div className="mt-auto">
                <BotonVolver/>
            </div>
        </div>
    )
}
export default DetalleProductos

