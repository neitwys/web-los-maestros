import Boton from "../atomos/Boton";

interface CardProps {
    codigo: string;
    nombre: string;
    categoria: string;
    subcategoria: string;
    marca: string;
    precio: number;
    stock: number;
    unidad: string;
    descripcion: string;
    imagen: string;
}

function CardProducto({ codigo, nombre, categoria, 
                        subcategoria, marca, precio, 
                        stock, unidad, descripcion, imagen }: CardProps) {
    return (
        <div className="card" style={{ width: '21rem' }}>
            <img 
                src={imagen} 
                className="card-img-top" 
                alt={nombre} 
                style={{ height: '200px', objectFit: 'contain' }}
            />

            <div className="card-body" d-flex flex-column>
                <h5 className="card-title">{nombre}</h5>
                <p className="card-text">{descripcion}</p>
                <p className="card-text"><strong>Marca:</strong> {marca}</p>
                <p className="card-text"><strong>Categoría:</strong> {categoria} - {subcategoria}</p>
                <p className="card-text"><strong>Precio:</strong> ${precio.toLocaleString('es-CL')} por {unidad}</p>
                <p className="card-text"><strong>Stock:</strong> {stock} unidades</p>
                <div className="mt-auto"> <Boton id={codigo} /> </div>
            </div>
        </div>
    )
}
export default CardProducto