import {
    Link
} from "react-router-dom";

import {
    ArrowRight,
    Clock3,
    Heart,
    MapPin,
    Star
} from "lucide-react";

import "./HuecaCard.css";


const fallbackImages = [

    "/images/gastronomia/Gastronomía Esmeraldeña.jpg",

    "/images/gastronomia/Bolon de Verde.jpg",

    "/images/gastronomia/Encocao de Mariscos.jpg",

    "/images/gastronomia/Parrillada de Mariscos.jpg"
];


function HuecaCard({
    hueca,
    index = 0
}) {

    const imagen =
        hueca.imagen
        ||
        fallbackImages[
            index %
            fallbackImages.length
        ];


    const calificacion =
        Number(
            hueca.calificacion
            || 0
        )
            .toFixed(1);


    function obtenerBadge() {

        if (
            Number(
                hueca.calificacion
                || 0
            ) >= 4.8
        ) {

            return {
                texto:
                    "Muy recomendada",

                clase:
                    "featured"
            };
        }


        if (
            hueca.categoriaNombre
                ?.toLowerCase()
                .includes(
                    "comida"
                )
        ) {

            return {
                texto:
                    "Tradicional",

                clase:
                    "traditional"
            };
        }


        if (
            hueca.categoriaNombre
                ?.toLowerCase()
                .includes(
                    "asado"
                )
        ) {

            return {
                texto:
                    "Parrilla",

                clase:
                    "grill"
            };
        }


        return {
            texto:
                hueca.etiqueta
                ||
                "Recomendada",

            clase:
                "recommended"
        };
    }


    const badge =
        obtenerBadge();


    return (

        <article className="modern-hueca-card">


            {/* =================================================
                IMAGEN
            ================================================= */}

            <div className="modern-hueca-image">


                <img
                    src={imagen}
                    alt={hueca.nombre}
                />


                <span
                    className={
                        `hueca-badge ${badge.clase}`
                    }
                >

                    {badge.texto}

                </span>


                <button
                    type="button"
                    className="hueca-favorite"
                    aria-label="Agregar a favoritos"
                >

                    <Heart size={19} />

                </button>


                <div className="hueca-rating-floating">

                    <Star
                        size={16}
                        fill="currentColor"
                    />

                    {calificacion}

                </div>

            </div>


            {/* =================================================
                CONTENIDO
            ================================================= */}

            <div className="modern-hueca-content">


                <span className="modern-hueca-category">

                    {
                        hueca.categoriaNombre
                        ||
                        "Gastronomía"
                    }

                </span>


                <h3>
                    {hueca.nombre}
                </h3>


                <p className="modern-hueca-description">

                    {
                        hueca.descripcion
                        ||
                        "Descubre los sabores auténticos de Esmeraldas."
                    }

                </p>


                {/* TAGS */}

                <div className="modern-hueca-tags">

                    <span>
                        {
                            hueca.categoriaNombre
                            ||
                            "Tradicional"
                        }
                    </span>


                    {
                        hueca.etiqueta && (

                            <span>
                                {hueca.etiqueta}
                            </span>

                        )
                    }

                </div>


                {/* INFO */}

                <div className="modern-hueca-meta">


                    <div>

                        <MapPin size={15} />

                        <span>

                            {
                                hueca.direccion
                                ||
                                "Esmeraldas"
                            }

                        </span>

                    </div>


                    <div>

                        <Clock3 size={15} />

                        <span>

                            {
                                hueca.horario
                                ||
                                "Consultar horario"
                            }

                        </span>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="modern-hueca-footer">

                    <div className="modern-hueca-rating">

                        <Star
                            size={17}
                            fill="currentColor"
                        />

                        <strong>
                            {calificacion}
                        </strong>

                    </div>


                    <Link
                        to={
                            `/huecas/${hueca.id}`
                        }
                        className="modern-hueca-button"
                    >

                        Ver más

                        <ArrowRight size={16} />

                    </Link>

                </div>

            </div>

        </article>

    );
}


export default HuecaCard;