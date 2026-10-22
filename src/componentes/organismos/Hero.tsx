export interface Diapositiva {
    imagen: string;
    alt: string;
}

interface HeroProps {
    diapositivas: Diapositiva[];
    id?: string;
    intervalo?: number; // Milisegundos entre una imagen y la siguiente
}

// Organismo: carrusel principal. Solo dibuja las diapositivas que recibe; el movimiento lo maneja Bootstrap.
function Hero({ diapositivas, id = "carouselPrincipal", intervalo = 5000 }: HeroProps) {
    if (diapositivas.length === 0) return null;

    return (
        <div id={id} className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-indicators">
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
                        <img
                            src={d.imagen}
                            alt={d.alt}
                            className="d-block w-100"
                            style={{ height: "520px", objectFit: "cover" }}
                        />
                    </div>
                ))}
            </div>

            {diapositivas.length > 1 && (
                <>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                </>
            )}
        </div>
    );
}

export default Hero;