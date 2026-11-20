import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaProductos from "../componentes/organismos/TablaProductos";
import FormularioProducto from "../componentes/organismos/FormularioProducto";
import type { Producto } from "../data/productosData";
import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerCategorias,
    obtenerProductos,
    type ProductoNuevo,
} from "../services/productoService";

type Modo = { tipo: "lista" } | { tipo: "crear" } | { tipo: "editar"; producto: Producto };
type Aviso = { tipo: "success" | "danger"; texto: string };

function AdminProductos() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [categorias, setCategorias] = useState<string[]>([]);
    const [modo, setModo] = useState<Modo>({ tipo: "lista" });
    const [porEliminar, setPorEliminar] = useState<Producto | null>(null);
    const [aviso, setAviso] = useState<Aviso | null>(null);

    useEffect(() => {
        obtenerProductos()
            .then((datos) => setProductos(datos))
            .catch((error) =>
                setAviso({
                    tipo: "danger",
                    texto: error instanceof Error ? error.message : "No se pudieron cargar los productos.",
                })
            );
        obtenerCategorias()
            .then((datos) => setCategorias(datos))
            .catch(() => setCategorias([]));
    }, []);

    const refrescar = async () => {
        try {
            const datos = await obtenerProductos();
            setProductos(datos);
        } catch (error) {
            setAviso({
                tipo: "danger",
                texto: error instanceof Error ? error.message : "No se pudieron cargar los productos.",
            });
        }
    };

    const abrirCrear = () => {
        setAviso(null);
        setPorEliminar(null);
        setModo({ tipo: "crear" });
    };

    const abrirEditar = (producto: Producto) => {
        setAviso(null);
        setPorEliminar(null);
        setModo({ tipo: "editar", producto });
    };

    const cerrarFormulario = () => setModo({ tipo: "lista" });

    const guardar = async (datos: ProductoNuevo) => {
        try {
            if (modo.tipo === "editar") {
                const actualizado = await actualizarProducto(modo.producto.id, datos);
                setAviso({ tipo: "success", texto: `Producto "${actualizado.nombre}" actualizado correctamente.` });
            } else {
                const creado = await crearProducto(datos);
                setAviso({ tipo: "success", texto: `Producto "${creado.nombre}" creado con el código ${creado.codigo}.` });
            }
            cerrarFormulario();
            await refrescar();
        } catch (error) {
            setAviso({
                tipo: "danger",
                texto: error instanceof Error ? error.message : "No se pudo guardar el producto.",
            });
        }
    };

    const pedirConfirmacion = (producto: Producto) => {
        setAviso(null);
        cerrarFormulario();
        setPorEliminar(producto);
    };

    const confirmarEliminar = async () => {
        if (!porEliminar) return;
        const producto = porEliminar;
        try {
            await eliminarProducto(producto.id);
            setAviso({ tipo: "success", texto: `Producto "${producto.nombre}" eliminado.` });
            await refrescar();
        } catch (error) {
            setAviso({
                tipo: "danger",
                texto: error instanceof Error ? error.message : "No se pudo eliminar el producto.",
            });
        } finally {
            setPorEliminar(null);
        }
    };

    return (
        <main className="container py-5 flex-grow-1">
            <Link to="/admin" className="text-decoration-none small">
                <i className="bi bi-arrow-left me-1"></i>Volver al panel
            </Link>

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 my-3">
                <h1 className="fw-bold text-dark mb-0">Gestión de productos</h1>
                <button type="button" className="btn btn-warning fw-bold" onClick={abrirCrear}>
                    <i className="bi bi-plus-lg me-1"></i>Nuevo producto
                </button>
            </div>

            {aviso && (
                <div className={`alert alert-${aviso.tipo} alert-dismissible`} role="status">
                    {aviso.texto}
                    <button type="button" className="btn-close" aria-label="Cerrar aviso" onClick={() => setAviso(null)}></button>
                </div>
            )}

            {porEliminar && (
                <div className="alert alert-warning d-flex flex-wrap justify-content-between align-items-center gap-2" role="alertdialog">
                    <span>¿Seguro que quieres eliminar <strong>{porEliminar.nombre}</strong>? Esta acción no se puede deshacer.</span>
                    <div className="d-flex gap-2">
                        <button type="button" className="btn btn-danger btn-sm" onClick={confirmarEliminar}>
                            Sí, eliminar
                        </button>
                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setPorEliminar(null)}>
                            No, volver
                        </button>
                    </div>
                </div>
            )}

            {modo.tipo !== "lista" && (
                <div className="bg-white p-4 rounded shadow-sm border mb-4">
                    <h2 className="h5 fw-bold mb-3">
                        {modo.tipo === "editar" ? `Editar: ${modo.producto.nombre}` : "Nuevo producto"}
                    </h2>
                    <FormularioProducto
                        key={modo.tipo === "editar" ? modo.producto.id : "nuevo"}
                        producto={modo.tipo === "editar" ? modo.producto : undefined}
                        categorias={categorias}
                        onGuardar={guardar}
                        onCancelar={cerrarFormulario}
                    />
                </div>
            )}

            <p className="text-muted small">{productos.length} productos registrados</p>
            <TablaProductos productos={productos} onEditar={abrirEditar} onEliminar={pedirConfirmacion} />
        </main>
    );
}

export default AdminProductos;
