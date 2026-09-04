import Layout from "../../components/Layout/Layout.jsx";
import "./Favoritos.css";

function Favoritos() {
    return (
        <Layout>
            <section className="simple-page">
                <div className="container">
                    <h1>Favoritos</h1>
                    <p>
                        Aquí aparecerán las huecas favoritas
                        del usuario autenticado.
                    </p>
                </div>
            </section>
        </Layout>
    );
}

export default Favoritos;