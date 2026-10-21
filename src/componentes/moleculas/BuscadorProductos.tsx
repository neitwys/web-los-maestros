interface BuscadorProductosProps {
  valor: string;
  onCambiar: (texto: string) => void;
}

function BuscadorProductos({ valor, onCambiar }: BuscadorProductosProps) {
  return (
    <input
      type="search"
      className="form-control"
      placeholder="Buscar herramientas, materiales..."
      aria-label="Buscar producto"
      value={valor}
      onChange={(e) => onCambiar(e.target.value)}
    />
  );
}

export default BuscadorProductos;