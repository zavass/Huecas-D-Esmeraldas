import Layout from "../../components/Layout/Layout.jsx";
import "./Perfil.css";

function Perfil() {
    return (
        <Layout>
            <section className="simple-page">
                <div className="container">
                    <h1>Mi perfil</h1>
                    <p>
                        Aquí mostraremos la información
                        del usuario autenticado.
                    </p>
                </div>
            </section>
        </Layout>
    );
}

export default Perfil;