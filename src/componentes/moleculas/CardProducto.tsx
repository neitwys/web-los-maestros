import Boton from "../atomos/Boton";

interface CardProps {
    id: number;
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

function CardProducto({ id, nombre, categoria, subcategoria, marca, precio, stock, unidad, descripcion, imagen }: CardProps) {
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
                <p className="card-text"><strong>Categoría:</strong> {categoria} - {subcategoria}</p>q
                <p className="card-text"><strong>Precio:</strong> ${precio.toFixed(2)} por {unidad}</p>
                <p className="card-text"><strong>Stock:</strong> {stock} unidades</p>
                <div className="mt-auto"> <Boton id={id} /> </div>
            </div>
        </div>
    )
}