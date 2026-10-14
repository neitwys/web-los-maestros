interface Producto {
    codigo: string;
    categoria: string;
    subcategoria: string;
    nombre: string;
    marca: string;
    unidad: string;
    precioCompra: number;
    precioVenta: number;
    stock: number;
    stockMinimo: number;
    descripcion: string;
    imagen?: string;
}

const productos: Producto[] = [
    {
        codigo: "MC001",
        categoria: "Mat. Construcción",
        subcategoria: "Cementos",
        nombre: "Cemento Polpaico gris 25 kg",
        marca: "Polpaico",
        unidad: "Saco",
        precioCompra: 3_200,
        precioVenta: 5_990,
        stock: 80,
        stockMinimo: 20,
        descripcion: "Cemento gris de alta resistencia para construcción."
    }
]
export default productos