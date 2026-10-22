import type { Usuario } from "../../data/usuariosData";

interface TablaUsuariosProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onEliminar: (usuario: Usuario) => void;
}

// Organismo presentacional: lista los usuarios en una tabla. No modifica datos, solo avisa qué botón se pulsó.
function TablaUsuarios({ usuarios, onEditar, onEliminar }: TablaUsuariosProps) {
  if (usuarios.length === 0) {
    return (
      <div className="alert alert-light border text-center" role="status">
        No hay usuarios registrados.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle bg-white shadow-sm">
        <thead className="table-dark">
          <tr>
            <th scope="col">RUN</th>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Rol</th>
            <th scope="col">Región / Comuna</th>
            <th scope="col" className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`;
            return (
              <tr key={usuario.run}>
                <td>{usuario.run}</td>
                <td>{nombreCompleto}</td>
                <td>{usuario.correo}</td>
                <td>
                  <span className={`badge ${usuario.rol === "Administrador" ? "bg-dark" : "bg-secondary"}`}>
                    {usuario.rol}
                  </span>
                </td>
                <td>
                  {usuario.comuna}, {usuario.region}
                </td>
                <td className="text-center text-nowrap">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark me-2"
                    onClick={() => onEditar(usuario)}
                    aria-label={`Editar ${nombreCompleto}`}
                  >
                    <i className="bi bi-pencil"></i> Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onEliminar(usuario)}
                    aria-label={`Eliminar ${nombreCompleto}`}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaUsuarios;