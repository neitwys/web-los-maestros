export interface Producto {
  id: string;
  codigo: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  marca: string;
  precio: number;
  stock: number;
  unidad: string;
  descripcion: string;
  imagen: string;
}

// Un producto nuevo todavía no tiene id: lo asigna esta misma fuente de datos al crearlo
export type ProductoNuevo = Omit<Producto, "id">;

export const productosData: Producto[] = [
  // --- CATEGORÍA: MAT. CONSTRUCCIÓN ---
  {
    id: "MC001",
    codigo: "MC001",
    nombre: "Cemento Polpaico gris 25 kg",
    categoria: "Mat. Construcción",
    subcategoria: "Cementos",
    marca: "Polpaico",
    precio: 5990,
    stock: 80,
    unidad: "Saco",
    descripcion: "Cemento Polpaico gris 25 kg - Marca Polpaico. Formato: Saco.",
    imagen: "img/polpaico.jpg"
  },
  {
    id: "MC002",
    codigo: "MC002",
    nombre: "Cemento Melón blanco 25 kg",
    categoria: "Mat. Construcción",
    subcategoria: "Cementos",
    marca: "Melón",
    precio: 7490,
    stock: 40,
    unidad: "Saco",
    descripcion: "Cemento Melón blanco 25 kg - Marca Melón. Formato: Saco.",
    imagen: "img/melonblanco.jpg"
  },
  {
    id: "MC003",
    codigo: "MC003",
    nombre: "Mortero cola cerámica 25 kg",
    categoria: "Mat. Construcción",
    subcategoria: "Morteros",
    marca: "Volcán",
    precio: 5200,
    stock: 50,
    unidad: "Saco",
    descripcion: "Mortero cola cerámica 25 kg - Marca Volcán. Formato: Saco.",
    imagen: "img/morteroceramica.webp"
  },
  {
    id: "MC004",
    codigo: "MC004",
    nombre: "Mortero nivelador piso 25 kg",
    categoria: "Mat. Construcción",
    subcategoria: "Morteros",
    marca: "Weber",
    precio: 6490,
    stock: 30,
    unidad: "Saco",
    descripcion: "Mortero nivelador piso 25 kg - Marca Weber. Formato: Saco.",
    imagen: "img/morteroweber.webp"
  },
  {
    id: "MC005",
    codigo: "MC005",
    nombre: "Arena fina construcción 25 kg",
    categoria: "Mat. Construcción",
    subcategoria: "Áridos",
    marca: "Granel",
    precio: 1800,
    stock: 60,
    unidad: "Saco",
    descripcion: "Arena fina construcción 25 kg - Marca Granel. Formato: Saco.",
    imagen: "img/Arenafina.webp"
  },
  {
    id: "MC006",
    codigo: "MC006",
    nombre: "Ripio 25 kg",
    categoria: "Mat. Construcción",
    subcategoria: "Áridos",
    marca: "Granel",
    precio: 1500,
    stock: 60,
    unidad: "Saco",
    descripcion: "Ripio 25 kg - Marca Granel. Formato: Saco.",
    imagen: "img/ripiogranel25.png"
  },
  {
    id: "MC007",
    codigo: "MC007",
    nombre: "Ladrillo fiscal N°5",
    categoria: "Mat. Construcción",
    subcategoria: "Ladrillos",
    marca: "Local",
    precio: 380,
    stock: 500,
    unidad: "Unidad",
    descripcion: "Ladrillo fiscal N°5 - Marca Local. Formato: Unidad.",
    imagen: "img/Ladrillofiscallocal.webp"
  },
  {
    id: "MC008",
    codigo: "MC008",
    nombre: "Ladrillo prensado 6x14x29 cm",
    categoria: "Mat. Construcción",
    subcategoria: "Ladrillos",
    marca: "Melón",
    precio: 550,
    stock: 300,
    unidad: "Unidad",
    descripcion: "Ladrillo prensado 6x14x29 cm - Marca Melón. Formato: Unidad.",
    imagen: "img/Ladrilloprensadomelon.jpg"
  },
  {
    id: "MC009",
    codigo: "MC009",
    nombre: "Bloque de hormigón 19x19x39 cm",
    categoria: "Mat. Construcción",
    subcategoria: "Bloques",
    marca: "Volcán",
    precio: 1200,
    stock: 200,
    unidad: "Unidad",
    descripcion: "Bloque de hormigón 19x19x39 cm - Marca Volcán. Formato: Unidad.",
    imagen: "img/bloquehormigon.png"
  },
  {
    id: "MC010",
    codigo: "MC010",
    nombre: "Bloque liviano 10x20x40 cm",
    categoria: "Mat. Construcción",
    subcategoria: "Bloques",
    marca: "Ytong",
    precio: 1690,
    stock: 100,
    unidad: "Unidad",
    descripcion: "Bloque liviano 10x20x40 cm - Marca Ytong. Formato: Unidad.",
    imagen: "img/bloqueliviano.webp"
  },

  // --- CATEGORÍA: PINTURAS ---
  {
    id: "PT001",
    codigo: "PT001",
    nombre: "Pintura látex interior 1 galón blanco",
    categoria: "Pinturas",
    subcategoria: "Látex",
    marca: "Sipa",
    precio: 9990,
    stock: 40,
    unidad: "Galón",
    descripcion: "Pintura látex interior 1 galón blanco - Marca Sipa. Formato: Galón.",
    imagen: "img/pinturalatex1g.webp"
  },
  {
    id: "PT002",
    codigo: "PT002",
    nombre: "Pintura látex interior 4 litros (varios col.)",
    categoria: "Pinturas",
    subcategoria: "Látex",
    marca: "Sipa",
    precio: 12990,
    stock: 30,
    unidad: "Envase 4L",
    descripcion: "Pintura látex interior 4 litros (varios col.) - Marca Sipa. Formato: Envase 4L.",
    imagen: "img/pinturasipa4l.jpg"
  },
  {
    id: "PT003",
    codigo: "PT003",
    nombre: "Pintura látex exterior 1 galón blanco",
    categoria: "Pinturas",
    subcategoria: "Látex",
    marca: "Kömex",
    precio: 13990,
    stock: 25,
    unidad: "Galón",
    descripcion: "Pintura látex exterior 1 galón blanco - Marca Kömex. Formato: Galón.",
    imagen: "img/pinturalatexkomex.png"
  },
  {
    id: "PT004",
    codigo: "PT004",
    nombre: "Esmalte sintético 1/4 litro (varios col.)",
    categoria: "Pinturas",
    subcategoria: "Esmalte",
    marca: "Sipa",
    precio: 4290,
    stock: 50,
    unidad: "1/4 L",
    descripcion: "Esmalte sintético 1/4 litro (varios col.) - Marca Sipa. Formato: 1/4 L.",
    imagen: "img/Esmaltesintéticosipa.png"
  },
  {
    id: "PT005",
    codigo: "PT005",
    nombre: "Esmalte sintético 1 litro (varios col.)",
    categoria: "Pinturas",
    subcategoria: "Esmalte",
    marca: "Sipa",
    precio: 9490,
    stock: 30,
    unidad: "1 litro",
    descripcion: "Esmalte sintético 1 litro (varios col.) - Marca Sipa. Formato: 1 litro.",
    imagen: "img/esmaltesintetico1l.webp"
  },
  {
    id: "PT006",
    codigo: "PT006",
    nombre: "Pintura antihumedad 1 galón blanco",
    categoria: "Pinturas",
    subcategoria: "Antihumedad",
    marca: "Kömex",
    precio: 17990,
    stock: 15,
    unidad: "Galón",
    descripcion: "Pintura antihumedad 1 galón blanco - Marca Kömex. Formato: Galón.",
    imagen: "img/antihumedadkomex.png"
  },
  {
    id: "PT007",
    codigo: "PT007",
    nombre: "Rodillo lana 23 cm con mango",
    categoria: "Pinturas",
    subcategoria: "Accesorios",
    marca: "Wurth",
    precio: 3990,
    stock: 30,
    unidad: "Unidad",
    descripcion: "Rodillo lana 23 cm con mango - Marca Wurth. Formato: Unidad.",
    imagen: "img/rodillo23cm.jpg"
  },
  {
    id: "PT008",
    codigo: "PT008",
    nombre: "Brocha cerda natural 3\"",
    categoria: "Pinturas",
    subcategoria: "Accesorios",
    marca: "Sipa",
    precio: 1690,
    stock: 40,
    unidad: "Unidad",
    descripcion: "Brocha cerda natural 3\" - Marca Sipa. Formato: Unidad.",
    imagen: "img/brochacerda.webp"
  },
  {
    id: "PT009",
    codigo: "PT009",
    nombre: "Cinta de enmascarar 24mm x 50m",
    categoria: "Pinturas",
    subcategoria: "Accesorios",
    marca: "3M",
    precio: 2490,
    stock: 60,
    unidad: "Rollo",
    descripcion: "Cinta de enmascarar 24mm x 50m - Marca 3M. Formato: Rollo.",
    imagen: "img/cinta.png"
  },
  // --- CATEGORÍA: HERRAMIENTAS ---
  {
    id: "HM001",
    codigo: "HM001",
    nombre: "Martillo carpintero 500g",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 7990,
    stock: 20,
    unidad: "Unidad",
    descripcion: "Martillo carpintero 500g - Marca Stanley. Formato: Unidad.",
    imagen: "img/martillo500.jpg"
  },
  {
    id: "HM002",
    codigo: "HM002",
    nombre: "Alicate universal 8\"",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 7290,
    stock: 15,
    unidad: "Unidad",
    descripcion: "Alicate universal 8\" - Marca Stanley. Formato: Unidad.",
    imagen: "img/alicate.jpg"
  },
  {
    id: "HM003",
    codigo: "HM003",
    nombre: "Destornillador plano 6x100mm",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 1990,
    stock: 30,
    unidad: "Unidad",
    descripcion: "Destornillador plano 6x100mm - Marca Stanley. Formato: Unidad.",
    imagen: "img/destor.webp"
  },
  {
    id: "HM004",
    codigo: "HM004",
    nombre: "Destornillador Phillips PH2 6x100mm",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 1990,
    stock: 30,
    unidad: "Unidad",
    descripcion: "Destornillador Phillips PH2 6x100mm - Marca Stanley. Formato: Unidad.",
    imagen: "img/destorstan.webp"
  },
  {
    id: "HM005",
    codigo: "HM005",
    nombre: "Llave ajustable 10\"",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Bahco",
    precio: 8490,
    stock: 12,
    unidad: "Unidad",
    descripcion: "Llave ajustable 10\" - Marca Bahco. Formato: Unidad.",
    imagen: "img/llave10.webp"
  },
  {
    id: "HM006",
    codigo: "HM006",
    nombre: "Juego llaves hexagonales métrico x9",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 5490,
    stock: 15,
    unidad: "Set",
    descripcion: "Juego llaves hexagonales métrico x9 - Marca Stanley. Formato: Set.",
    imagen: "img/juegollave.webp"
  },
  {
    id: "HM007",
    codigo: "HM007",
    nombre: "Serrucho 20\" 7 dientes por pulgada",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 9490,
    stock: 10,
    unidad: "Unidad",
    descripcion: "Serrucho 20\" 7 dientes por pulgada - Marca Stanley. Formato: Unidad.",
    imagen: "img/serrucho.jpg"
  },
  {
    id: "HM008",
    codigo: "HM008",
    nombre: "Nivel de burbuja 60 cm",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 10490,
    stock: 8,
    unidad: "Unidad",
    descripcion: "Nivel de burbuja 60 cm - Marca Stanley. Formato: Unidad.",
    imagen: "img/burbuja.webp"
  },
  {
    id: "HM009",
    codigo: "HM009",
    nombre: "Metro de tela 5m",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 4290,
    stock: 25,
    unidad: "Unidad",
    descripcion: "Metro de tela 5m - Marca Stanley. Formato: Unidad.",
    imagen: "img/metrotela.jpg"
  },
  {
    id: "HM010",
    codigo: "HM010",
    nombre: "Cinta métrica 8m autoblocante",
    categoria: "Herramientas",
    subcategoria: "Manuales",
    marca: "Stanley",
    precio: 6490,
    stock: 20,
    unidad: "Unidad",
    descripcion: "Cinta métrica 8m autoblocante - Marca Stanley. Formato: Unidad.",
    imagen: "img/cinta8.webp"
  },
  {
    id: "HE001",
    codigo: "HE001",
    nombre: "Taladro percutor 650W 13mm",
    categoria: "Herramientas",
    subcategoria: "Eléctricas",
    marca: "Makita",
    precio: 79990,
    stock: 8,
    unidad: "Unidad",
    descripcion: "Taladro percutor 650W 13mm - Marca Makita. Formato: Unidad.",
    imagen: "img/taladroper.webp"
  },
  {
    id: "HE002",
    codigo: "HE002",
    nombre: "Atornillador inalámbrico 12V (kit)",
    categoria: "Herramientas",
    subcategoria: "Eléctricas",
    marca: "Makita",
    precio: 104990,
    stock: 5,
    unidad: "Unidad",
    descripcion: "Atornillador inalámbrico 12V (kit) - Marca Makita. Formato: Unidad.",
    imagen: "img/atormaki.webp"
  },
  {
    id: "HE003",
    codigo: "HE003",
    nombre: "Amoladora angular 4.5\" 800W",
    categoria: "Herramientas",
    subcategoria: "Eléctricas",
    marca: "Makita",
    precio: 54990,
    stock: 8,
    unidad: "Unidad",
    descripcion: "Amoladora angular 4.5\" 800W - Marca Makita. Formato: Unidad.",
    imagen: "img/amomaki.jpg"
  },
  {
    id: "HE004",
    codigo: "HE004",
    nombre: "Sierra circular 7-1/4\" 1200W",
    categoria: "Herramientas",
    subcategoria: "Eléctricas",
    marca: "Skil",
    precio: 72990,
    stock: 4,
    unidad: "Unidad",
    descripcion: "Sierra circular 7-1/4\" 1200W - Marca Skil. Formato: Unidad.",
    imagen: "img/sierracir.webp"
  },
  {
    id: "HE005",
    codigo: "HE005",
    nombre: "Lijadora orbital 180W",
    categoria: "Herramientas",
    subcategoria: "Eléctricas",
    marca: "Black+Decker",
    precio: 34990,
    stock: 6,
    unidad: "Unidad",
    descripcion: "Lijadora orbital 180W - Marca Black+Decker. Formato: Unidad.",
    imagen: "img/lijadora.webp"
  },
  {
    id: "HE006",
    codigo: "HE006",
    nombre: "Caladora 500W",
    categoria: "Herramientas",
    subcategoria: "Eléctricas",
    marca: "Skil",
    precio: 42990,
    stock: 4,
    unidad: "Unidad",
    descripcion: "Caladora 500W - Marca Skil. Formato: Unidad.",
    imagen: "img/caladora.jpg"
  },

  // --- CATEGORÍA: GASFITERÍA ---
  {
    id: "GS001",
    codigo: "GS001",
    nombre: "Cañería PVC 1/2\" x 6m",
    categoria: "Gasfitería",
    subcategoria: "Tuberías",
    marca: "Tigre",
    precio: 5490,
    stock: 30,
    unidad: "Unidad",
    descripcion: "Cañería PVC 1/2\" x 6m - Marca Tigre. Formato: Unidad.",
    imagen: "img/pvc12.webp"
  },
  {
    id: "GS002",
    codigo: "GS002",
    nombre: "Cañería PVC 3/4\" x 6m",
    categoria: "Gasfitería",
    subcategoria: "Tuberías",
    marca: "Tigre",
    precio: 7490,
    stock: 25,
    unidad: "Unidad",
    descripcion: "Cañería PVC 3/4\" x 6m - Marca Tigre. Formato: Unidad.",
    imagen: "img/pvc34.webp"
  },
  {
    id: "GS003",
    codigo: "GS003",
    nombre: "Cañería cobre 1/2\" x 5m",
    categoria: "Gasfitería",
    subcategoria: "Tuberías",
    marca: "Codelco",
    precio: 17990,
    stock: 15,
    unidad: "Unidad",
    descripcion: "Cañería cobre 1/2\" x 5m - Marca Codelco. Formato: Unidad.",
    imagen: "img/codelco.webp"
  },
  {
    id: "GS004",
    codigo: "GS004",
    nombre: "Codo PVC 1/2\" 90°",
    categoria: "Gasfitería",
    subcategoria: "Uniones",
    marca: "Tigre",
    precio: 390,
    stock: 100,
    unidad: "Unidad",
    descripcion: "Codo PVC 1/2\" 90° - Marca Tigre. Formato: Unidad.",
    imagen: "img/codo12.webp"
  },
  {
    id: "GS005",
    codigo: "GS005",
    nombre: "Te PVC 1/2\"",
    categoria: "Gasfitería",
    subcategoria: "Uniones",
    marca: "Tigre",
    precio: 450,
    stock: 80,
    unidad: "Unidad",
    descripcion: "Te PVC 1/2\" - Marca Tigre. Formato: Unidad.",
    imagen: "img/pvct.jpg"
  },
  {
    id: "GS006",
    codigo: "GS006",
    nombre: "Unión doble PVC 1/2\"",
    categoria: "Gasfitería",
    subcategoria: "Uniones",
    marca: "Tigre",
    precio: 320,
    stock: 80,
    unidad: "Unidad",
    descripcion: "Unión doble PVC 1/2\" - Marca Tigre. Formato: Unidad.",
    imagen: "img/pvcu.webp"
  },
  {
    id: "GS007",
    codigo: "GS007",
    nombre: "Llave de paso esfera 1/2\" latón",
    categoria: "Gasfitería",
    subcategoria: "Llaves",
    marca: "Emmeti",
    precio: 3490,
    stock: 30,
    unidad: "Unidad",
    descripcion: "Llave de paso esfera 1/2\" latón - Marca Emmeti. Formato: Unidad.",
    imagen: "img/llavepaso12.png"
  },
  {
    id: "GS008",
    codigo: "GS008",
    nombre: "Llave de paso esfera 3/4\" latón",
    categoria: "Gasfitería",
    subcategoria: "Llaves",
    marca: "Emmeti",
    precio: 4990,
    stock: 20,
    unidad: "Unidad",
    descripcion: "Llave de paso esfera 3/4\" latón - Marca Emmeti. Formato: Unidad.",
    imagen: "img/llavepaso34.webp"
  },
  {
    id: "GS009",
    codigo: "GS009",
    nombre: "Grifería lavamanos monocomando cromo",
    categoria: "Gasfitería",
    subcategoria: "Grifería",
    marca: "Corona",
    precio: 22990,
    stock: 10,
    unidad: "Unidad",
    descripcion: "Grifería lavamanos monocomando cromo - Marca Corona. Formato: Unidad.",
    imagen: "img/llavecorona.webp"
  },
  {
    id: "GS010",
    codigo: "GS010",
    nombre: "Grifería cocina monocomando cuello alto",
    categoria: "Gasfitería",
    subcategoria: "Grifería",
    marca: "Corona",
    precio: 28990,
    stock: 8,
    unidad: "Unidad",
    descripcion: "Grifería cocina monocomando cuello alto - Marca Corona. Formato: Unidad.",
    imagen: "img/cuelloalto.webp"
  },
  {
    id: "GS011",
    codigo: "GS011",
    nombre: "Teflón 3/4\" x 12m",
    categoria: "Gasfitería",
    subcategoria: "Sellos",
    marca: "3M",
    precio: 790,
    stock: 80,
    unidad: "Rollo",
    descripcion: "Teflón 3/4\" x 12m - Marca 3M. Formato: Rollo.",
    imagen: "img/teflon3m.webp"
  },
  {
    id: "GS012",
    codigo: "GS012",
    nombre: "Silicona transparente 280ml",
    categoria: "Gasfitería",
    subcategoria: "Sellos",
    marca: "Wacker",
    precio: 5490,
    stock: 25,
    unidad: "Cartucho",
    descripcion: "Silicona transparente 280ml - Marca Wacker. Formato: Cartucho.",
    imagen: "img/silicona.webp"
  },
  // --- CATEGORÍA: ELECTRICIDAD ---
  {
    id: "EL001",
    codigo: "EL001",
    nombre: "Cable unipolar 1.5mm² (por metro)",
    categoria: "Electricidad",
    subcategoria: "Conductores",
    marca: "Condulac",
    precio: 590,
    stock: 100,
    unidad: "Metro",
    descripcion: "Cable unipolar 1.5mm² (por metro) - Marca Condulac. Formato: Metro.",
    imagen: "img/cableuni.webp"
  },
  {
    id: "EL002",
    codigo: "EL002",
    nombre: "Cable unipolar 2.5mm² (por metro)",
    categoria: "Electricidad",
    subcategoria: "Conductores",
    marca: "Condulac",
    precio: 790,
    stock: 100,
    unidad: "Metro",
    descripcion: "Cable unipolar 2.5mm² (por metro) - Marca Condulac. Formato: Metro.",
    imagen: "img/cableuni25.webp"
  },
  {
    id: "EL003",
    codigo: "EL003",
    nombre: "Cable dúplex paralelo 2x1.5mm² (por metro)",
    categoria: "Electricidad",
    subcategoria: "Conductores",
    marca: "Condulac",
    precio: 990,
    stock: 80,
    unidad: "Metro",
    descripcion: "Cable dúplex paralelo 2x1.5mm² (por metro) - Marca Condulac. Formato: Metro.",
    imagen: "img/cable215.webp"
  },
  {
    id: "EL004",
    codigo: "EL004",
    nombre: "Enchufe empotrar 16A c/tierra (schuko)",
    categoria: "Electricidad",
    subcategoria: "Enchufes",
    marca: "Bticino",
    precio: 3690,
    stock: 50,
    unidad: "Unidad",
    descripcion: "Enchufe empotrar 16A c/tierra (schuko) - Marca Bticino. Formato: Unidad.",
    imagen: "img/enchufe16.jpg"
  },
  {
    id: "EL005",
    codigo: "EL005",
    nombre: "Enchufe doble empotrar 16A c/tierra",
    categoria: "Electricidad",
    subcategoria: "Enchufes",
    marca: "Bticino",
    precio: 5490,
    stock: 40,
    unidad: "Unidad",
    descripcion: "Enchufe doble empotrar 16A c/tierra - Marca Bticino. Formato: Unidad.",
    imagen: "img/enchufex2.jpg"
  },
  {
    id: "EL006",
    codigo: "EL006",
    nombre: "Interruptor simple empotrar",
    categoria: "Electricidad",
    subcategoria: "Interruptores",
    marca: "Bticino",
    precio: 3190,
    stock: 50,
    unidad: "Unidad",
    descripcion: "Interruptor simple empotrar - Marca Bticino. Formato: Unidad.",
    imagen: "img/intersimple.webp"
  },
  {
    id: "EL007",
    codigo: "EL007",
    nombre: "Interruptor doble empotrar",
    categoria: "Electricidad",
    subcategoria: "Interruptores",
    marca: "Bticino",
    precio: 4290,
    stock: 35,
    unidad: "Unidad",
    descripcion: "Interruptor doble empotrar - Marca Bticino. Formato: Unidad.",
    imagen: "img/interdoble.webp"
  },
  {
    id: "EL008",
    codigo: "EL008",
    nombre: "Tablero eléctrico 4 espacios DIN",
    categoria: "Electricidad",
    subcategoria: "Tableros",
    marca: "Legrand",
    precio: 22990,
    stock: 8,
    unidad: "Unidad",
    descripcion: "Tablero eléctrico 4 espacios DIN - Marca Legrand. Formato: Unidad.",
    imagen: "img/tablerodin.webp"
  },
  {
    id: "EL009",
    codigo: "EL009",
    nombre: "Disyuntor termomagnético 16A unipolar",
    categoria: "Electricidad",
    subcategoria: "Tableros",
    marca: "Schneider",
    precio: 6490,
    stock: 20,
    unidad: "Unidad",
    descripcion: "Disyuntor termomagnético 16A unipolar - Marca Schneider. Formato: Unidad.",
    imagen: "img/dis16.webp"
  },
  {
    id: "EL010",
    codigo: "EL010",
    nombre: "Disyuntor termomagnético 25A unipolar",
    categoria: "Electricidad",
    subcategoria: "Tableros",
    marca: "Schneider",
    precio: 6990,
    stock: 20,
    unidad: "Unidad",
    descripcion: "Disyuntor termomagnético 25A unipolar - Marca Schneider. Formato: Unidad.",
    imagen: "img/dis25.jpg"
  },
  {
    id: "EL011",
    codigo: "EL011",
    nombre: "Ampolleta LED 9W E27 luz fría",
    categoria: "Electricidad",
    subcategoria: "Iluminación",
    marca: "Philips",
    precio: 3990,
    stock: 60,
    unidad: "Unidad",
    descripcion: "Ampolleta LED 9W E27 luz fría - Marca Philips. Formato: Unidad.",
    imagen: "img/ampo9.png"
  },
  {
    id: "EL012",
    codigo: "EL012",
    nombre: "Ampolleta LED 12W E27 luz cálida",
    categoria: "Electricidad",
    subcategoria: "Iluminación",
    marca: "Philips",
    precio: 4490,
    stock: 50,
    unidad: "Unidad",
    descripcion: "Ampolleta LED 12W E27 luz cálida - Marca Philips. Formato: Unidad.",
    imagen: "img/ampo12.webp"
  },
  {
    id: "EL013",
    codigo: "EL013",
    nombre: "Panel LED empotrar 18W 22cm",
    categoria: "Electricidad",
    subcategoria: "Iluminación",
    marca: "Ledvance",
    precio: 11490,
    stock: 20,
    unidad: "Unidad",
    descripcion: "Panel LED empotrar 18W 22cm - Marca Ledvance. Formato: Unidad.",
    imagen: "img/panel18w.webp"
  },

  // --- CATEGORÍA: TORNILLERÍA ---
  {
    id: "TR001",
    codigo: "TR001",
    nombre: "Tornillo autoperf. 8x1\" caja 100 unid.",
    categoria: "Tornillería",
    subcategoria: "Tornillos",
    marca: "Hilti",
    precio: 2990,
    stock: 40,
    unidad: "Caja",
    descripcion: "Tornillo autoperf. 8x1\" caja 100 unid. - Marca Hilti. Formato: Caja.",
    imagen: "img/tornillo81.webp"
  },
  {
    id: "TR002",
    codigo: "TR002",
    nombre: "Tornillo madera 4x40mm caja 100 unid.",
    categoria: "Tornillería",
    subcategoria: "Tornillos",
    marca: "Hilti",
    precio: 2490,
    stock: 40,
    unidad: "Caja",
    descripcion: "Tornillo madera 4x40mm caja 100 unid. - Marca Hilti. Formato: Caja.",
    imagen: "img/tornillo440.webp"
  },
  {
    id: "TR003",
    codigo: "TR003",
    nombre: "Tornillo volcanita 3.5x25mm caja 200 unid.",
    categoria: "Tornillería",
    subcategoria: "Tornillos",
    marca: "Hilti",
    precio: 3490,
    stock: 30,
    unidad: "Caja",
    descripcion: "Tornillo volcanita 3.5x25mm caja 200 unid. - Marca Hilti. Formato: Caja.",
    imagen: "img/tornillo35.webp"
  },
  {
    id: "TR004",
    codigo: "TR004",
    nombre: "Taco fisher S6 bolsa 100 unid.",
    categoria: "Tornillería",
    subcategoria: "Tacos",
    marca: "Fischer",
    precio: 3190,
    stock: 35,
    unidad: "Bolsa",
    descripcion: "Taco fisher S6 bolsa 100 unid. - Marca Fischer. Formato: Bolsa.",
    imagen: "img/taco100.webp"
  },
  {
    id: "TR005",
    codigo: "TR005",
    nombre: "Taco fisher S8 bolsa 50 unid.",
    categoria: "Tornillería",
    subcategoria: "Tacos",
    marca: "Fischer",
    precio: 2890,
    stock: 30,
    unidad: "Bolsa",
    descripcion: "Taco fisher S8 bolsa 50 unid. - Marca Fischer. Formato: Bolsa.",
    imagen: "img/taco50.webp"
  },
  {
    id: "TR006",
    codigo: "TR006",
    nombre: "Perno hex. 3/8\" x 2\" c/tuerca y golilla",
    categoria: "Tornillería",
    subcategoria: "Pernos",
    marca: "Granel",
    precio: 290,
    stock: 200,
    unidad: "Unidad",
    descripcion: "Perno hex. 3/8\" x 2\" c/tuerca y golilla - Marca Granel. Formato: Unidad.",
    imagen: "img/perno38.jpg"
  },
  {
    id: "TR007",
    codigo: "TR007",
    nombre: "Perno de anclaje 10x100mm",
    categoria: "Tornillería",
    subcategoria: "Anclajes",
    marca: "Hilti",
    precio: 990,
    stock: 60,
    unidad: "Unidad",
    descripcion: "Perno de anclaje 10x100mm - Marca Hilti. Formato: Unidad.",
    imagen: "img/perno10.webp"
  },
  {
    id: "TR008",
    codigo: "TR008",
    nombre: "Anclaje químico epoxi 300ml",
    categoria: "Tornillería",
    subcategoria: "Anclajes",
    marca: "Fischer",
    precio: 15990,
    stock: 8,
    unidad: "Cartucho",
    descripcion: "Anclaje químico epoxi 300ml - Marca Fischer. Formato: Cartucho.",
    imagen: "img/an300.webp"
  },
  // --- CATEGORÍA: MADERA ---
  {
    id: "MD001",
    codigo: "MD001",
    nombre: "Pino cepillado 1x3\" x 3m",
    categoria: "Madera",
    subcategoria: "Pino cepillado",
    marca: "Local",
    precio: 4290,
    stock: 40,
    unidad: "Unidad",
    descripcion: "Pino cepillado 1x3\" x 3m - Marca Local. Formato: Unidad.",
    imagen: "img/madera13.webp"
  },
  {
    id: "MD002",
    codigo: "MD002",
    nombre: "Pino cepillado 2x4\" x 3m",
    categoria: "Madera",
    subcategoria: "Pino cepillado",
    marca: "Local",
    precio: 7490,
    stock: 30,
    unidad: "Unidad",
    descripcion: "Pino cepillado 2x4\" x 3m - Marca Local. Formato: Unidad.",
    imagen: "img/madera24.webp"
  },
  {
    id: "MD003",
    codigo: "MD003",
    nombre: "Terciado estructural 18mm 1.22x2.44m",
    categoria: "Madera",
    subcategoria: "Tableros",
    marca: "Arauco",
    precio: 34990,
    stock: 20,
    unidad: "Plancha",
    descripcion: "Terciado estructural 18mm 1.22x2.44m - Marca Arauco. Formato: Plancha.",
    imagen: "img/madera18.webp"
  },
  {
    id: "MD004",
    codigo: "MD004",
    nombre: "MDF 15mm 1.22x2.44m",
    categoria: "Madera",
    subcategoria: "Tableros",
    marca: "Arauco",
    precio: 27990,
    stock: 15,
    unidad: "Plancha",
    descripcion: "MDF 15mm 1.22x2.44m - Marca Arauco. Formato: Plancha.",
    imagen: "img/mdf15.webp"
  },
  {
    id: "MD005",
    codigo: "MD005",
    nombre: "OSB 9mm 1.22x2.44m",
    categoria: "Madera",
    subcategoria: "Tableros",
    marca: "Arauco",
    precio: 18990,
    stock: 18,
    unidad: "Plancha",
    descripcion: "OSB 9mm 1.22x2.44m - Marca Arauco. Formato: Plancha.",
    imagen: "img/osb9.webp"
  },
  {
    id: "MD006",
    codigo: "MD006",
    nombre: "Volcanita estándar 10mm 1.2x2.4m",
    categoria: "Madera",
    subcategoria: "Tableros",
    marca: "Volcán",
    precio: 8990,
    stock: 30,
    unidad: "Plancha",
    descripcion: "Volcanita estándar 10mm 1.2x2.4m - Marca Volcán. Formato: Plancha.",
    imagen: "img/volcanita10.webp"
  },
  {
    id: "MD007",
    codigo: "MD007",
    nombre: "Volcanita resistente humedad 10mm",
    categoria: "Madera",
    subcategoria: "Tableros",
    marca: "Volcán",
    precio: 11990,
    stock: 15,
    unidad: "Plancha",
    descripcion: "Volcanita resistente humedad 10mm - Marca Volcán. Formato: Plancha.",
    imagen: "img/volcanitares.webp"
  },

  // --- CATEGORÍA: SEGURIDAD ---
  {
    id: "SE001",
    codigo: "SE001",
    nombre: "Casco seguridad blanco",
    categoria: "Seguridad",
    subcategoria: "EPP",
    marca: "3M",
    precio: 6990,
    stock: 15,
    unidad: "Unidad",
    descripcion: "Casco seguridad blanco - Marca 3M. Formato: Unidad.",
    imagen: "img/cascoblanco3m.webp"
  },
  {
    id: "SE002",
    codigo: "SE002",
    nombre: "Guantes de cuero talla L",
    categoria: "Seguridad",
    subcategoria: "EPP",
    marca: "3M",
    precio: 3690,
    stock: 20,
    unidad: "Par",
    descripcion: "Guantes de cuero talla L - Marca 3M. Formato: Par.",
    imagen: "img/guantes.png"
  },
  {
    id: "SE003",
    codigo: "SE003",
    nombre: "Antiparras de seguridad clear",
    categoria: "Seguridad",
    subcategoria: "EPP",
    marca: "3M",
    precio: 2490,
    stock: 25,
    unidad: "Unidad",
    descripcion: "Antiparras de seguridad clear - Marca 3M. Formato: Unidad.",
    imagen: "img/lentes3m.webp"
  },
  {
    id: "SE004",
    codigo: "SE004",
    nombre: "Mascarilla respirador N95 (caja x10)",
    categoria: "Seguridad",
    subcategoria: "EPP",
    marca: "3M",
    precio: 10990,
    stock: 10,
    unidad: "Caja",
    descripcion: "Mascarilla respirador N95 (caja x10) - Marca 3M. Formato: Caja.",
    imagen: "img/mascarilla3m.webp"
  },
  {
    id: "SE005",
    codigo: "SE005",
    nombre: "Arnés de seguridad 1 punto",
    categoria: "Seguridad",
    subcategoria: "EPP",
    marca: "3M",
    precio: 34990,
    stock: 4,
    unidad: "Unidad",
    descripcion: "Arnés de seguridad 1 punto - Marca 3M. Formato: Unidad.",
    imagen: "img/arnes.webp"
  },

  // --- CATEGORÍA: JARDÍN ---
  {
    id: "JA001",
    codigo: "JA001",
    nombre: "Manguera riego 3/4\" x 25m",
    categoria: "Jardín",
    subcategoria: "Mangueras",
    marca: "Tigre",
    precio: 22990,
    stock: 6,
    unidad: "Unidad",
    descripcion: "Manguera riego 3/4\" x 25m - Marca Tigre. Formato: Unidad.",
    imagen: "img/manguera.webp"
  },
  {
    id: "JA002",
    codigo: "JA002",
    nombre: "Manguera expandible 30m",
    categoria: "Jardín",
    subcategoria: "Mangueras",
    marca: "Bestway",
    precio: 28990,
    stock: 5,
    unidad: "Unidad",
    descripcion: "Manguera expandible 30m - Marca Bestway. Formato: Unidad.",
    imagen: "img/mangueraexp.webp"
  },
  {
    id: "JA003",
    codigo: "JA003",
    nombre: "Pistola de riego 8 modos",
    categoria: "Jardín",
    subcategoria: "Mangueras",
    marca: "Bestway",
    precio: 5490,
    stock: 10,
    unidad: "Unidad",
    descripcion: "Pistola de riego 8 modos - Marca Bestway. Formato: Unidad.",
    imagen: "img/pistola8.webp"
  },
  {
    id: "JA004",
    codigo: "JA004",
    nombre: "Pala punta redonda #2 con mango",
    categoria: "Jardín",
    subcategoria: "Herramientas",
    marca: "Corona",
    precio: 10990,
    stock: 8,
    unidad: "Unidad",
    descripcion: "Pala punta redonda #2 con mango - Marca Corona. Formato: Unidad.",
    imagen: "img/pala.webp"
  },
  {
    id: "JA005",
    codigo: "JA005",
    nombre: "Rastrillo 16 dientes con mango",
    categoria: "Jardín",
    subcategoria: "Herramientas",
    marca: "Corona",
    precio: 9490,
    stock: 6,
    unidad: "Unidad",
    descripcion: "Rastrillo 16 dientes con mango - Marca Corona. Formato: Unidad.",
    imagen: "img/rastrillo.webp"
  }
];
 
// Fuente de datos simulada en memoria
let productos: Producto[] = [...productosData];

/**
 * READ: Obtiene todos los productos del catálogo
 */
export function obtenerProductos(): Producto[] {
  return [...productos];
}

/**
 * READ: Obtiene un producto por su ID (o código)
 */
export function obtenerProductoPorId(id: string): Producto | undefined {
  return productos.find((p) => p.id === id || p.codigo === id);
}

/**
 * CREATE: Agrega un nuevo producto a la ferretería
 * Genera automáticamente un ID con formato FER-001, FER-002, etc.
 */
export function crearProducto(datos: ProductoNuevo): Producto {
  const correlativo = productos.length + 1;
  const nuevoId = `FER-${String(correlativo).padStart(3, '0')}`;
  
  const nuevoProducto: Producto = {
    ...datos,
    id: nuevoId,
    codigo: datos.codigo || nuevoId,
  };

  productos = [...productos, nuevoProducto];
  return nuevoProducto;
}

/**
 * UPDATE: Actualiza los campos de un producto existente
 */
export function actualizarProducto(id: string, cambios: Partial<ProductoNuevo>): Producto | undefined {
  const existente = obtenerProductoPorId(id);
  if (!existente) return undefined;

  const actualizado: Producto = { ...existente, ...cambios };
  productos = productos.map((p) => (p.id === id ? actualizado : p));
  return actualizado;
}

/**
 * DELETE: Elimina un producto por su ID
 */
export function eliminarProducto(id: string): boolean {
  const totalAntes = productos.length;
  productos = productos.filter((p) => p.id !== id);
  return productos.length < totalAntes;
}

/**
 * RESET: Restablece los productos al estado inicial (Útil para Vitest/Tests)
 */
export function reiniciarProductos(): void {
  productos = [...productosData];
}