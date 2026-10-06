# Proyecto Web - Ferretería "Los Maestros"

Repositorio oficial de la página web para la **Ferretería Los Maestros**, desarrollada con tecnologías modernas para ofrecer una experiencia rápida y fluida a los clientes.

---

## Tecnologías Utilizadas

* **React** (con TypeScript)
* **Vite** (como empaquetador y entorno de desarrollo)
* **React Router DOM** (para la navegación entre páginas)
* **Bootstrap** (para el diseño y componentes responsivos)

---

## Estructura del Repositorio

La arquitectura del proyecto está organizada siguiendo principios de diseño modular y **Atomic Design**:

```text
/public                -> Archivos estáticos que no necesitan ser compilados.
  /img                 -> Imágenes generales (PNG, JPEG, WEBP, etc.).
/src                   -> Código fuente principal de la aplicación.
  /assets              -> Recursos locales (iconos, gráficos, etc.).
  /paginas             -> Vistas principales de la aplicación (archivos .tsx).
    Inicio.tsx         -> Página principal (Home).
    Productos.tsx      -> Catálogo de productos.
  /componentes         -> Componentes reutilizables de la interfaz.
    /atomos            -> Elementos básicos (botones, inputs, etc.).
    /moleculas         -> Combinaciones de átomos (tarjetas de productos, barras de búsqueda).
    /organismos        -> Secciones complejas (Navbar, Footer, etc.).
  App.tsx              -> Componente principal y rutas.
  main.tsx             -> Punto de entrada de React.
