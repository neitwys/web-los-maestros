interface CardnovedadProps {
  titulo: string;
  categoria: string;
  colorCategoria: "warning" | "danger" | "success";
  fecha: string;
  resumen: string;
  imagen: string;
  onLeer: () => void; // Se llama al pulsar "Leer artículo completo"
}

// Molécula: tarjeta de una novedad. Solo muestra datos; quien la usa decide qué pasa al pulsar el botón.
function Cardnovedad({ titulo, categoria, colorCategoria, fecha, resumen, imagen, onLeer }: CardnovedadProps) {
  // Asegura que la ruta comience con '/' si proviene de la carpeta public
  const rutaImagen = imagen.startsWith("/") ? imagen : `/${imagen}`;
  const claseEtiqueta = colorCategoria === "warning" ? "bg-warning text-dark" : `bg-${colorCategoria}`;

  return (
    <div className="card h-100 shadow-sm border-0 overflow-hidden">
      <img
        src={rutaImagen}
        alt={titulo}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className={`badge ${claseEtiqueta}`}>{categoria}</span>
          <small className="text-muted">
            <i className="bi bi-calendar3 me-1"></i>
            {fecha}
          </small>
        </div>

        <h5 className="card-title fw-bold">{titulo}</h5>
        <p className="card-text text-secondary small flex-grow-1">{resumen}</p>

        <button type="button" className="btn btn-outline-dark btn-sm w-100 fw-bold mt-3" onClick={onLeer}>
          <i className="bi bi-book me-1"></i> Leer artículo completo
        </button>
      </div>
    </div>
  );
}

export default Cardnovedad;