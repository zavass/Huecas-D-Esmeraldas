import {
    useState
} from "react";

import {
    ArrowLeft,
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    MapPin
} from "lucide-react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    loginUsuario
} from "../../services/authService.js";

import "./Login.css";


function Login() {

    const navigate =
        useNavigate();

    const [correo, setCorreo] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [mostrarPassword, setMostrarPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");


    async function iniciarSesion(event) {

        event.preventDefault();

        try {

            setLoading(true);
            setError("");

            const data =
                await loginUsuario({
                    correo,
                    password
                });

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "usuario",
                JSON.stringify(data)
            );

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.message ||
                err.message ||
                "No se pudo iniciar sesión."
            );

        } finally {

            setLoading(false);
        }
    }


    return (

        <main className="login-page">


            {/* =================================================
                LADO IZQUIERDO
            ================================================= */}

            <section className="login-visual">

                <div className="login-visual-overlay" />


                <div className="login-visual-content">

                    <Link
                        to="/"
                        className="login-back"
                    >
                        <ArrowLeft size={18} />

                        Volver al inicio
                    </Link>


                    <div className="login-place">

                        <MapPin size={17} />

                        Esmeraldas, Ecuador

                    </div>


                    <div className="login-brand">

                        <img
                            src="/images/logo/esmeralda.png"
                            alt="Las Huecas Esmeraldas"
                        />

                        <div>

                            <strong>
                                Las Huecas
                            </strong>

                            <span>
                                Esmeraldas
                            </span>

                        </div>

                    </div>


                    <h1>

                        Descubre una
                        <br />

                        ciudad
                        <br />

                        <span>
                            llena de
                            <br />
                            historia.
                        </span>

                    </h1>


                    <p>

                        Gastronomía, cultura,
                        naturaleza y lugares
                        que hacen de Esmeraldas
                        una tierra única frente
                        al Pacífico.

                    </p>


                    <div className="login-country-card">

                        <span>
                            ✨
                        </span>

                        <div>

                            <small>
                                Conoce Esmeraldas
                            </small>

                            <strong>
                                Tierra Verde del Ecuador
                            </strong>

                        </div>

                    </div>


                    <div className="login-security">

                        🔒

                        Acceso seguro mediante JWT

                    </div>

                </div>

            </section>


            {/* =================================================
                FORMULARIO
            ================================================= */}

            <section className="login-form-side">

                <div className="login-form-container">


                    <span className="login-welcome">
                        Bienvenido
                    </span>


                    <h2>
                        Inicia sesión
                    </h2>


                    <p className="login-subtitle">

                        Ingresa tus datos para
                        continuar explorando Esmeraldas.

                    </p>


                    <form
                        onSubmit={iniciarSesion}
                        className="login-form"
                    >

                        <label>

                            Correo electrónico

                            <div className="login-input">

                                <Mail size={19} />

                                <input
                                    type="email"
                                    placeholder="tu@correo.com"
                                    value={correo}
                                    onChange={
                                        event =>
                                            setCorreo(
                                                event.target.value
                                            )
                                    }
                                    required
                                />

                            </div>

                        </label>


                        <label>

                            Contraseña

                            <div className="login-input">

                                <LockKeyhole size={19} />

                                <input
                                    type={
                                        mostrarPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={
                                        event =>
                                            setPassword(
                                                event.target.value
                                            )
                                    }
                                    required
                                />


                                <button
                                    type="button"
                                    className="login-eye"
                                    onClick={() =>
                                        setMostrarPassword(
                                            !mostrarPassword
                                        )
                                    }
                                >

                                    {mostrarPassword
                                        ? <EyeOff size={18} />
                                        : <Eye size={18} />
                                    }

                                </button>

                            </div>

                        </label>


                        {error && (

                            <div className="login-error">
                                {error}
                            </div>

                        )}


                        <button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Ingresando..."
                                    : "Iniciar sesión"
                            }

                            {!loading && (
                                <ArrowRight size={18} />
                            )}

                        </button>

                    </form>


                    {/* =========================================
                        REGISTRO
                    ========================================= */}

                    <div className="login-register">

                        <span>
                            ¿Aún no tienes cuenta?
                        </span>

                        <p>
                            Regístrate gratis y guarda
                            tus lugares y rutas favoritas.
                        </p>

                        <Link
                            to="/registro"
                            className="login-register-button"
                        >
                            Crear mi cuenta

                            <ArrowRight size={18} />
                        </Link>

                    </div>


                    <div className="login-footer">

                        <span>
                            Las Huecas de Esmeraldas
                        </span>

                        <span>
                            Sabores, turismo y cultura.
                        </span>

                    </div>

                </div>

            </section>

        </main>
    );
}


export default Login;