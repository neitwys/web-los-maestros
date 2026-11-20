import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaUsuarios from "../componentes/organismos/TablaUsuarios";
import FormularioUsuario, { type DatosUsuario } from "../componentes/organismos/FormularioUsuario";
import type { Usuario } from "../data/usuariosData";
import { actualizarUsuario, eliminarUsuario, obtenerUsuarios, registrarUsuario } from "../services/usuarioService";
import { obtenerSesion } from "../services/sesionService";

type Modo = { tipo: "lista" } | { tipo: "crear" } | { tipo: "editar"; usuario: Usuario };
type Aviso = { tipo: "success" | "danger"; texto: string };

function AdminUsuario() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [modo, setModo] = useState<Modo>({ tipo: "lista" });
    const [porEliminar, setPorEliminar] = useState<Usuario | null>(null);
    const [aviso, setAviso] = useState<Aviso | null>(null);

    useEffect(() => {
        obtenerUsuarios()
            .then((datos) => setUsuarios(datos))
            .catch((error) =>
                setAviso({
                    tipo: "danger",
                    texto: error instanceof Error ? error.message : "No se pudieron cargar los usuarios.",
                })
            );
    }, []);

    const refrescar = async () => {
        try {
            const datos = await obtenerUsuarios();
            setUsuarios(datos);
        } catch (error) {
            setAviso({
                tipo: "danger",
                texto: error instanceof Error ? error.message : "No se pudieron cargar los usuarios.",
            });
        }
    };

    const abrirCrear = () => {
        setAviso(null);
        setPorEliminar(null);
        setModo({ tipo: "crear" });
    };

    const abrirEditar = (usuario: Usuario) => {
        setAviso(null);
        setPorEliminar(null);
        setModo({ tipo: "editar", usuario });
    };

    const cerrarFormulario = () => setModo({ tipo: "lista" });

    const guardar = async (datos: DatosUsuario) => {
        try {
            if (modo.tipo === "editar") {
                await actualizarUsuario(modo.usuario.id, {
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    telefono: datos.telefono,
                });
                setAviso({ tipo: "success", texto: `Usuario "${datos.nombre}" actualizado correctamente.` });
            } else {
                await registrarUsuario({
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    run: datos.run,
                    correo: datos.correo,
                    contrasena: datos.clave,
                    telefono: datos.telefono,
                });
                setAviso({ tipo: "success", texto: `Usuario "${datos.nombre}" creado correctamente.` });
            }
            cerrarFormulario();
            await refrescar();
        } catch (error) {
            setAviso({
                tipo: "danger",
                texto: error instanceof Error ? error.message : "No se pudo guardar el usuario.",
            });
        }
    };

    const pedirConfirmacion = (usuario: Usuario) => {
        cerrarFormulario();

        if (usuario.correo === obtenerSesion()?.correo) {
            setPorEliminar(null);
            setAviso({ tipo: "danger", texto: "No puedes eliminar tu propia cuenta mientras tienes la sesión iniciada." });
            return;
        }

        setAviso(null);
        setPorEliminar(usuario);
    };

    const confirmarEliminar = async () => {
        if (!porEliminar) return;
        const usuario = porEliminar;
        const nombre = usuario.apellido ? `${usuario.nombre} ${usuario.apellido}` : usuario.nombre;
        try {
            await eliminarUsuario(usuario.id);
            setAviso({ tipo: "success", texto: `Usuario "${nombre}" eliminado.` });
            await refrescar();
        } catch (error) {
            setAviso({
                tipo: "danger",
                texto: error instanceof Error ? error.message : "No se pudo eliminar el usuario.",
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
                <h1 className="fw-bold text-dark mb-0">Gestión de usuarios</h1>
                <button type="button" className="btn btn-warning fw-bold" onClick={abrirCrear}>
                    <i className="bi bi-plus-lg me-1"></i>Nuevo usuario
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
                    <span>
                        ¿Seguro que quieres eliminar a{" "}
                        <strong>{porEliminar.apellido ? `${porEliminar.nombre} ${porEliminar.apellido}` : porEliminar.nombre}</strong>?
                        Esta acción no se puede deshacer.
                    </span>
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
                        {modo.tipo === "editar"
                            ? `Editar: ${modo.usuario.apellido ? `${modo.usuario.nombre} ${modo.usuario.apellido}` : modo.usuario.nombre}`
                            : "Nuevo usuario"}
                    </h2>
                    <FormularioUsuario
                        key={modo.tipo === "editar" ? modo.usuario.id : "nuevo"}
                        usuario={modo.tipo === "editar" ? modo.usuario : undefined}
                        onGuardar={guardar}
                        onCancelar={cerrarFormulario}
                    />
                </div>
            )}

            <p className="text-muted small">{usuarios.length} usuarios registrados</p>
            <TablaUsuarios usuarios={usuarios} onEditar={abrirEditar} onEliminar={pedirConfirmacion} />
        </main>
    );
}

export default AdminUsuario;
