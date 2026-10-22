import { useState } from "react";
import { Link } from "react-router-dom";
import TablaProductos from "../componentes/organismos/TablaProductos";
import FormularioProducto from "../componentes/organismos/FormularioProducto";
import type { Producto } from "../data/productosData";
import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerProductos,
    type ProductoNuevo,
} from "../services/productoService";

type Modo = { tipo: "lista" } | { tipo: "crear" } | { tipo: "editar"; producto: Producto };
type Aviso = { tipo: "success" | "danger"; texto: string };

function AdminProductos() {
    const [productos, setProductos] = useState<Producto[]>(() => obtenerProductos());
    const [modo, setModo] = useState<Modo>({ tipo: "lista" });
    const [porEliminar, setPorEliminar] = useState<Producto | null>(null);
    const [aviso, setAviso] = useState<Aviso | null>(null);

    // Vuelve a leer la lista desde el servicio para que la tabla refleje el cambio
    const refrescar = () => setProductos(obtenerProductos());

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

    const guardar = (datos: ProductoNuevo) => {
        try {
            if (modo.tipo === "editar") {
                const actualizado = actualizarProducto(modo.producto.id, datos);
                if (!actualizado) throw new Error("No se encontró el producto a modificar.");
                setAviso({ tipo: "success", texto: `Producto "${actualizado.nombre}" actualizado correctamente.` });
            } else {
                const creado = crearProducto(datos);
                setAviso({ tipo: "success", texto: `Producto "${creado.nombre}" creado con el código ${creado.codigo}.` });
            }
            refrescar();
            cerrarFormulario();
        } catch (error) {
            setAviso({ tipo: "danger", texto: error instanceof Error ? error.message : "No se pudo guardar el producto." });
        }
    };

    const pedirConfirmacion = (producto: Producto) => {
        setAviso(null);
        cerrarFormulario();
        setPorEliminar(producto);
    };

    const confirmarEliminar = () => {
        if (!porEliminar) return;
        const eliminado = eliminarProducto(porEliminar.id);
        setAviso(
            eliminado
                ? { tipo: "success", texto: `Producto "${porEliminar.nombre}" eliminado.` }
                : { tipo: "danger", texto: "No se pudo eliminar el producto." }
        );
        setPorEliminar(null);
        refrescar();
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
                    {/* La key hace que el formulario se reinicie al cambiar de producto */}
                    <FormularioProducto
                        key={modo.tipo === "editar" ? modo.producto.id : "nuevo"}
                        producto={modo.tipo === "editar" ? modo.producto : undefined}
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