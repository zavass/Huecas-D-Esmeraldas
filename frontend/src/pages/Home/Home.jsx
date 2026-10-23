import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    MapPin,
    Waves
} from "lucide-react";

import Layout from "../../components/Layout/Layout.jsx";

import "./Home.css";


function Home() {

    const islandAreaRef =
        useRef(null);

    const [rotation, setRotation] =
        useState({
            x: 0,
            y: 0
        });


    useEffect(() => {

        document.body.classList.add(
            "home-page-background"
        );

        return () => {

            document.body.classList.remove(
                "home-page-background"
            );

        };

    }, []);


    function handleIslandMouseMove(event) {

        const element =
            islandAreaRef.current;

        if (!element) {
            return;
        }

        const rect =
            element.getBoundingClientRect();

        const mouseX =
            event.clientX - rect.left;

        const mouseY =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateY =
            (
                (mouseX - centerX)
                /
                centerX
            ) * 5;

        const rotateX =
            (
                (centerY - mouseY)
                /
                centerY
            ) * 4;

        setRotation({
            x: rotateX,
            y: rotateY
        });
    }


    function handleIslandMouseLeave() {

        setRotation({
            x: 0,
            y: 0
        });
    }


    return (
        <Layout>

            <main className="home-premium">

                <div className="home-background-overlay" />

                <div className="home-light home-light-left" />

                <div className="home-light home-light-center" />


                <div className="container home-main-grid">


                    {/* =========================
                        TEXTO
                    ========================= */}

                    <section className="home-copy">

                        <div className="home-eyebrow">

                            <MapPin size={17} />

                            <span>
                                Tierra Verde del Ecuador
                            </span>

                        </div>


                        <h1>

                            Descubre

                            <span>
                                Esmeraldas
                            </span>

                        </h1>


                        <div className="home-title-line" />


                        <h2>

                            Entre sabores, playa y mar

                            <Waves size={30} />

                        </h2>

                    </section>


                    {/* =========================
                        ISLA 3D
                    ========================= */}

                    <section
                        ref={islandAreaRef}
                        className="island-scene-3d"
                        onMouseMove={handleIslandMouseMove}
                        onMouseLeave={handleIslandMouseLeave}
                    >

                        <div className="island-backlight" />

                        <div className="island-shadow" />


                        <div
                            className="island-perspective"
                            style={{
                                transform: `
                                    rotateX(${rotation.x}deg)
                                    rotateY(${rotation.y}deg)
                                `
                            }}
                        >

                            <div className="island-floating-animation">

                                <img
                                    src="/images/logo/isla-esmeraldas.png"
                                    alt="Isla tropical de Esmeraldas"
                                    className="island-main-image"
                                    draggable="false"
                                />

                            </div>

                        </div>

                    </section>

                </div>

            </main>

        </Layout>
    );
}


export default Home;