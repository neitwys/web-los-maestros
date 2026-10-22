import { useEffect } from "react";
import { Link } from "react-router-dom";
import type { Novedad } from "../../data/novedadesData";

interface ModalNovedadProps {
  novedad: Novedad | null; // Si es null, el modal está cerrado
  onCerrar: () => void;
}

// Organismo: ventana modal con el artículo completo. Se abre o cierra según la prop "novedad".
function ModalNovedad({ novedad, onCerrar }: ModalNovedadProps) {
  // Mientras el modal está abierto: se cierra con la tecla Escape y se bloquea el scroll de la página
  useEffect(() => {
    if (!novedad) return;

    const alPresionarTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
    };

    document.addEventListener("keydown", alPresionarTecla);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", alPresionarTecla);
      document.body.classList.remove("modal-open");
    };
  }, [novedad, onCerrar]);

  if (!novedad) return null;

  const rutaImagen = novedad.imagen.startsWith("/") ? novedad.imagen : `/${novedad.imagen}`;
  const claseEtiqueta =
    novedad.colorCategoria === "warning" ? "bg-warning text-dark" : `bg-${novedad.colorCategoria}`;

  return (
    <>
      <div
        className="modal d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tituloModalNovedad"
        tabIndex={-1}
        onClick={onCerrar}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="tituloModalNovedad">
                {novedad.titulo}
              </h5>
              <button type="button" className="btn-close" aria-label="Cerrar ventana" onClick={onCerrar}></button>
            </div>

            <div className="modal-body">
              <img
                src={rutaImagen}
                alt={novedad.titulo}
                className="img-fluid rounded mb-3 w-100"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />

              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className={`badge ${claseEtiqueta}`}>{novedad.categoria}</span>
                <small className="text-muted">Publicado el {novedad.fechaPublicacion}</small>
              </div>

              {novedad.secciones.map((seccion, indice) => (
                <div className="mb-3" key={indice}>
                  {seccion.subtitulo && <h6 className="fw-bold">{seccion.subtitulo}</h6>}
                  <p className="mb-0">{seccion.texto}</p>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCerrar}>
                Cerrar
              </button>
              <Link to={novedad.rutaEnlace} className="btn btn-warning fw-bold" onClick={onCerrar}>
                {novedad.textoEnlace}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop show"></div>
    </>
  );
}

export default ModalNovedad;