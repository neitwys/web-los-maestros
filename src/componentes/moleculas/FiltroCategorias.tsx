interface FiltroCategoriasProps {
  categorias: string[];
  activa: string;
  onCambiar: (categoria: string) => void;
}

function FiltroCategorias({ categorias, activa, onCambiar }: FiltroCategoriasProps) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {categorias.map((cat) => (
        <button
          key={cat}
          type="button"
          className={"btn btn-sm " + (cat === activa ? "btn-primary" : "btn-outline-secondary")}
          onClick={() => onCambiar(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FiltroCategorias;