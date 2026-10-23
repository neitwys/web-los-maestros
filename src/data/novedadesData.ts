export interface SeccionNovedad {
  subtitulo?: string;
  texto: string;
}

export interface Novedad {
  id: number;
  titulo: string;
  categoria: string;
  colorCategoria: "warning" | "danger" | "success"; 
  fecha: string;              
  fechaPublicacion: string;   
  resumen: string;
  imagen: string;
  secciones: SeccionNovedad[]; 
  textoEnlace: string;
  rutaEnlace: string;          
}

export const novedadesData: Novedad[] = [
  {
    id: 1,
    titulo: "Cómo elegir la pintura adecuada para cada habitación",
    categoria: "Consejos",
    colorCategoria: "warning",
    fecha: "12 Sep 2026",
    fechaPublicacion: "12 de Septiembre de 2026",
    resumen:
      "Aprende a diferenciar entre esmaltes al agua, látex y oleos para lograr acabados duraderos y profesionales en tu hogar.",
    imagen: "img/novedades1.png",
    secciones: [
      {
        subtitulo: "1. Áreas húmedas (Baños y Cocinas)",
        texto:
          "Se recomienda el uso de esmalte al agua con propiedades antihongos. Este tipo de pintura repele la humedad constante y permite limpiar las paredes con un paño húmedo sin desgastar el color.",
      },
      {
        subtitulo: "2. Salones y Dormitorios",
        texto:
          "Para dormitorios o salas de estar, la mejor opción es la pintura látex mate o de acabado satinado. Ofrece un cubrimiento excelente y disimula pequeñas imperfecciones en el tabique o la madera.",
      },
      {
        subtitulo: "3. Muros exteriores y Fachadas",
        texto:
          "Utiliza siempre pinturas elastoméricas o esmaltes sintéticos diseñados contra la radiación UV y la lluvia directa.",
      },
    ],
    textoEnlace: "Ver Pinturas en Catálogo",
    rutaEnlace: "/productos",
  },
  {
    id: 2,
    titulo: "Guía para el cuidado de tus herramientas eléctricas",
    categoria: "Mantenimiento",
    colorCategoria: "danger",
    fecha: "05 Sep 2026",
    fechaPublicacion: "05 de Septiembre de 2026",
    resumen:
      "Prolonga la vida útil de tus taladros, esmeriles y sierras con estos 5 pasos básicos de limpieza y lubricación diaria.",
    imagen: "img/novedades2.png",
    secciones: [
      {
        texto:
          "Las herramientas eléctricas son una inversión valiosa para cualquier profesional o aficionado. Con estos cuidados garantizas su funcionamiento seguro:",
      },
      {
        subtitulo: "Limpieza de polvo y virutas",
        texto:
          "Usa aire comprimido o un pincel seco en las ranuras de ventilación tras finalizar la jornada.",
      },
      {
        subtitulo: "Lubricación de partes móviles",
        texto:
          "Aplica aceite dieléctrico en los porta-brocas y engranajes según la pauta del fabricante.",
      },
      {
        subtitulo: "Revisión del cable y escobillas",
        texto:
          "Verifica que los cables no tengan cortes y reemplaza los carbones cuando se desgasten.",
      },
    ],
    textoEnlace: "Ver Herramientas en Catálogo",
    rutaEnlace: "/productos",
  },
  {
    id: 3,
    titulo: "Incorporamos la nueva línea de herramientas Inalámbricas",
    categoria: "Novedades",
    colorCategoria: "success",
    fecha: "28 Ago 2026",
    fechaPublicacion: "28 de Agosto de 2026",
    resumen:
      "Llegó a Ferretería Los Maestros la tecnología de baterías de litio intercambiables para mayor libertad en tus obras.",
    imagen: "img/novedades3.png",
    secciones: [
      {
        texto:
          "Estamos orgullosos de presentar la nueva generación de herramientas impulsadas por baterías de litio de 18V universales. Ya no necesitas preocuparte por cables de extensión ni enchufes distantes en tu obra.",
      },
      {
        texto:
          "Visítanos en nuestra tienda física para probar los demostradores de taladros, atornilladores de impacto y sierras circulares con hasta 3 años de garantía oficial.",
      },
    ],
    textoEnlace: "Consultar Disponibilidad",
    rutaEnlace: "/contacto",
  },
];