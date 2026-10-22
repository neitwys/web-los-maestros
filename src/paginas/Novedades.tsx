import { useCallback, useState } from "react";
import Cardnovedad from "../componentes/moleculas/Cardnovedad";
import ModalNovedad from "../componentes/organismos/ModalNovedad";
import { novedadesData, type Novedad } from "../data/novedadesData";

function Novedades() {
    // Novedad que se está leyendo en el modal (null = modal cerrado)
    const [seleccionada, setSeleccionada] = useState<Novedad | null>(null);

    const cerrarModal = useCallback(() => setSeleccionada(null), []);

    return (
        <main className="container py-5 flex-grow-1">
            <div className="text-center mb-5">
                <h1 className="fw-bold text-dark">Blog de Novedades y Consejos</h1>
                <p className="text-muted lead">
                    Descubre las últimas guías, tutoriales y noticias del mundo de la construcción y
                    el bricolaje.
                </p>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {novedadesData.map((novedad) => (
                    <div className="col" key={novedad.id}>
                        <Cardnovedad
                            titulo={novedad.titulo}
                            categoria={novedad.categoria}
                            colorCategoria={novedad.colorCategoria}
                            fecha={novedad.fecha}
                            resumen={novedad.resumen}
                            imagen={novedad.imagen}
                            onLeer={() => setSeleccionada(novedad)}
                        />
                    </div>
                ))}
            </div>

            <ModalNovedad novedad={seleccionada} onCerrar={cerrarModal} />
        </main>
    );
}

export default Novedades;