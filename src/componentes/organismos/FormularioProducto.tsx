import { useState } from "react";
import CampoFormulario from "../moleculas/CampoFormulario";
import type { Producto } from "../../data/productosData";
import type { ProductoNuevo } from "../../services/productoService";
import { errorPrecio, errorStock, errorTextoObligatorio } from "../../utils/validaciones";

interface FormularioProductoProps {
  producto?: Producto;                         // Si viene, el formulario está en modo edición
  onGuardar: (datos: ProductoNuevo) => void;   // Se llama solo con datos válidos
  onCancelar?: () => void;
}

// Todos los campos se manejan como texto; precio y stock se convierten a número al guardar
interface Valores {
  codigo: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  marca: string;
  precio: string;
  stock: string;
  unidad: string;
  descripcion: string;
  imagen: string;
}

type Campo = keyof Valores;
type Errores = Record<Campo, string>;

const sinErrores: Errores = {
  codigo: "", nombre: "", categoria: "", subcategoria: "", marca: "",
  precio: "", stock: "", unidad: "", descripcion: "", imagen: "",
};

const valoresVacios: Valores = {
  codigo: "", nombre: "", categoria: "", subcategoria: "", marca: "",
  precio: "", stock: "", unidad: "", descripcion: "", imagen: "",
};

function desdeProducto(p?: Producto): Valores {
  if (!p) return valoresVacios;
  return {
    codigo: p.codigo,
    nombre: p.nombre,
    categoria: p.categoria,
    subcategoria: p.subcategoria,
    marca: p.marca,
    precio: String(p.precio),
    stock: String(p.stock),
    unidad: p.unidad,
    descripcion: p.descripcion,
    imagen: p.imagen,
  };
}

function calcularError(campo: Campo, v: Valores): string {
  switch (campo) {
    case "codigo":
      // El código es opcional al crear: si se deja vacío, el servicio genera uno
      return v.codigo.trim() === "" ? "" : errorTextoObligatorio(v.codigo, "Código", 20);
    case "nombre":
      return errorTextoObligatorio(v.nombre, "Nombre", 80);
    case "categoria":
      return errorTextoObligatorio(v.categoria, "Categoría", 40);
    case "subcategoria":
      return errorTextoObligatorio(v.subcategoria, "Subcategoría", 40);
    case "marca":
      return errorTextoObligatorio(v.marca, "Marca", 40);
    case "precio":
      return errorPrecio(v.precio);
    case "stock":
      return errorStock(v.stock);
    case "unidad":
      return errorTextoObligatorio(v.unidad, "Unidad", 20);
    case "descripcion":
      return errorTextoObligatorio(v.descripcion, "Descripción", 200);
    case "imagen":
      return errorTextoObligatorio(v.imagen, "Imagen", 100);
  }
}

// Organismo: formulario para crear (sin "producto") o editar (con "producto") un producto.
function FormularioProducto({ producto, onGuardar, onCancelar }: FormularioProductoProps) {
  const editando = producto !== undefined;

  const [valores, setValores] = useState<Valores>(() => desdeProducto(producto));
  const [errores, setErrores] = useState<Errores>(sinErrores);
  const [hayErrores, setHayErrores] = useState(false);

  const validarCampo = (campo: Campo, actuales: Valores = valores) => {
    setErrores((previo) => ({ ...previo, [campo]: calcularError(campo, actuales) }));
  };

  const cambiarCampo = (campo: Campo, valor: string) => {
    const nuevos = { ...valores, [campo]: valor };
    setValores(nuevos);
    setHayErrores(false);
    // Si el campo ya mostraba un error, se revalida mientras el usuario corrige
    if (errores[campo] !== "") validarCampo(campo, nuevos);
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const campos = Object.keys(valoresVacios) as Campo[];
    const nuevosErrores = { ...sinErrores };
    campos.forEach((campo) => {
      nuevosErrores[campo] = calcularError(campo, valores);
    });
    setErrores(nuevosErrores);

    if (campos.some((campo) => nuevosErrores[campo] !== "")) {
      setHayErrores(true);
      return;
    }

    onGuardar({
      codigo: valores.codigo.trim(),
      nombre: valores.nombre.trim(),
      categoria: valores.categoria.trim(),
      subcategoria: valores.subcategoria.trim(),
      marca: valores.marca.trim(),
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      unidad: valores.unidad.trim(),
      descripcion: valores.descripcion.trim(),
      imagen: valores.imagen.trim(),
    });

    // Al crear, el formulario queda limpio para ingresar otro producto
    if (!editando) setValores(valoresVacios);
  };

  // Atajo para no repetir las props comunes de cada campo
  const campo = (nombre: Campo) => ({
    id: `prod-${nombre}`,
    valor: valores[nombre],
    onCambiar: (v: string) => cambiarCampo(nombre, v),
    onBlur: () => validarCampo(nombre),
    error: errores[nombre],
  });

  return (
    <form onSubmit={enviar} noValidate>
      <div className="row">
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("codigo")} etiqueta={editando ? "Código" : "Código (opcional)"}
            placeholder="Ej: FER-100" maxLength={20} deshabilitado={editando} />
        </div>
        <div className="col-12 col-md-8">
          <CampoFormulario {...campo("nombre")} etiqueta="Nombre" maxLength={80} obligatorio />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("categoria")} etiqueta="Categoría" maxLength={40} obligatorio />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("subcategoria")} etiqueta="Subcategoría" maxLength={40} obligatorio />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("marca")} etiqueta="Marca" maxLength={40} obligatorio />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("precio")} etiqueta="Precio ($)" placeholder="Ej: 5990" maxLength={9} obligatorio />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("stock")} etiqueta="Stock" placeholder="Ej: 25" maxLength={6} obligatorio />
        </div>
        <div className="col-12 col-md-4">
          <CampoFormulario {...campo("unidad")} etiqueta="Unidad" placeholder="Ej: Saco, Caja" maxLength={20} obligatorio />
        </div>
      </div>

      <CampoFormulario {...campo("imagen")} etiqueta="Imagen (ruta)" placeholder="img/archivo.jpg" maxLength={100} obligatorio />

      <CampoFormulario {...campo("descripcion")} etiqueta="Descripción" tipo="textarea" filas={3}
        maxLength={200} mostrarContador obligatorio />

      {hayErrores && (
        <div className="alert alert-danger" role="alert">
          Por favor verifica los campos resaltados en rojo.
        </div>
      )}

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-warning fw-bold">
          {editando ? "Guardar cambios" : "Crear producto"}
        </button>
        {onCancelar && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioProducto;