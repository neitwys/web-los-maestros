export interface Diapositiva {
    imagen: string;
    alt: string;
    imagenTablet?: string;
    imagenMovil?: string;
}

interface HeroProps {
    diapositivas: Diapositiva[];
    id?: string;
    intervalo?: number;    // Milisegundos entre una imagen y la siguiente
    proporcion?: string;   // Proporción (ancho / alto) de las imágenes. Las tuyas son 1536 x 1024 = 3 / 2
    anchoMaximo?: string;  // Ancho máximo del carrusel. 105vh = 70vh x 1.5, para que nunca pase del 70% del alto de la ventana
}

// Sombra suave para que los controles blancos se vean también sobre fondos claros (como el logo)
const sombraControles = { filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.7))" };

// Organismo: carrusel principal. Solo dibuja las diapositivas que recibe; el movimiento lo maneja Bootstrap.
function Hero({
    diapositivas,
    id = "carouselPrincipal",
    intervalo = 5000,
    proporcion = "3 / 2",
    anchoMaximo = "min(100%, 1000px, 105vh)",
}: HeroProps) {
    if (diapositivas.length === 0) return null;

    return (
        <div
            id={id}
            className="carousel slide carousel-fade mx-auto shadow-sm"
            data-bs-ride="carousel"
            style={{ maxWidth: anchoMaximo }}
        >
            <div className="carousel-indicators" style={sombraControles}>
                {diapositivas.map((d, indice) => (
                    <button
                        key={d.imagen}
                        type="button"
                        data-bs-target={`#${id}`}
                        data-bs-slide-to={indice}
                        className={indice === 0 ? "active" : ""}
                        aria-current={indice === 0 ? "true" : undefined}
                        aria-label={`Diapositiva ${indice + 1}`}
                    ></button>
                ))}
            </div>

            <div className="carousel-inner">
                {diapositivas.map((d, indice) => (
                    <div
                        key={d.imagen}
                        className={`carousel-item${indice === 0 ? " active" : ""}`}
                        data-bs-interval={intervalo}
                    >
                        <picture>
                            {d.imagenMovil && <source media="(max-width: 575.98px)" srcSet={d.imagenMovil} />}
                            {d.imagenTablet && <source media="(max-width: 991.98px)" srcSet={d.imagenTablet} />}
                            <img
                                src={d.imagen}
                                alt={d.alt}
                                className="d-block w-100"
                                style={{
                                    aspectRatio: proporcion, // El alto sigue al ancho: la imagen cabe exacta
                                    objectFit: "contain",    // Respaldo: si una imagen tiene otra proporción, no se recorta
                                }}
                            />
                        </picture>
                    </div>
                ))}
            </div>

            {diapositivas.length > 1 && (
                <>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" style={sombraControles} aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" style={sombraControles} aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                </>
            )}
        </div>
    );
}

export default Hero;