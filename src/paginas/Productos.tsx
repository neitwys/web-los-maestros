import CardProducto from "../componentes/moleculas/CardProducto"
import productos from "../data/ProductosData"

function Productos() {
    return (
        <div>
            <h1>Productos</h1>
            
            <div className="d-flex gap-3 flex-wrap">
                {productos.map( (producto) => (
                    <CardProducto
                        key={producto.codigo}
                        codigo={producto.codigo}
                        nombre={producto.nombre}
                        categoria={producto.categoria}
                        subcategoria={producto.subcategoria}
                        marca={producto.marca}
                        precio={producto.precioVenta}
                        stock={producto.stock}
                        unidad={producto.unidad}
                        descripcion={`Cód: ${producto.codigo}`}
                        imagen={producto.imagen || "https://via.placeholder.com/150"}
                    />
                ))}
            </div>
        </div>
    )
}

export default Productos