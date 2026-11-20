import type { Usuario } from "../../data/usuariosData";

interface TablaUsuariosProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onEliminar: (usuario: Usuario) => void;
}

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
            <th scope="col">Teléfono</th>
            <th scope="col">Rol</th>
            <th scope="col" className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            const nombreCompleto = usuario.apellido ? `${usuario.nombre} ${usuario.apellido}` : usuario.nombre;
            return (
              <tr key={usuario.id}>
                <td>{usuario.run}</td>
                <td>{nombreCompleto}</td>
                <td>{usuario.correo}</td>
                <td>{usuario.telefono}</td>
                <td>
                  <span className={`badge ${usuario.rol === "ADMIN" ? "bg-dark" : "bg-secondary"}`}>
                    {usuario.rol}
                  </span>
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
