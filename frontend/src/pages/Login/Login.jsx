import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    ArrowLeft,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    UtensilsCrossed
} from "lucide-react";

import {
    guardarSesion,
    login
} from "../../services/authService.js";


import "./Login.css";

function Login() {
    const navigate =
        useNavigate();

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [form, setForm] =
        useState({
            correo: "",
            password: ""
        });

    const handleChange = event => {
        const {
            name,
            value
        } = event.target;

        setForm(
            previous => ({
                ...previous,
                [name]: value
            })
        );

        setError("");
    };

    const handleSubmit =
        async event => {

            event.preventDefault();

            setLoading(true);
            setError("");

            try {
                const response =
                    await login(
                        form.correo.trim(),
                        form.password
                    );

                guardarSesion(response);

                if (
                    response.rol
                        ?.toUpperCase()
                    === "ADMIN"
                ) {
                    navigate(
                        "/admin/dashboard",
                        {
                            replace: true
                        }
                    );
                } else {
                    navigate(
                        "/",
                        {
                            replace: true
                        }
                    );
                }

            } catch (err) {
                setError(
                    err.message ||
                    "No se pudo iniciar sesión."
                );

            } finally {
                setLoading(false);
            }
        };

    return (
        <div className="login-page">

            <section className="login-brand-panel">

                <Link
                    to="/"
                    className="login-back"
                >
                    <ArrowLeft
                        size={17}
                    />

                    Volver al inicio
                </Link>

                <div className="login-brand-content">

                    <div className="login-logo">

                        <UtensilsCrossed
                            size={30}
                        />

                    </div>

                    <span>
                        Las Huecas
                        de Esmeraldas
                    </span>

                    <h1>
                        Sabores que cuentan
                        nuestra historia.
                    </h1>

                    <p>
                        Descubre los rincones
                        gastronómicos que hacen
                        única a Esmeraldas.
                    </p>

                </div>

                <div className="login-security">

                    <ShieldCheck
                        size={18}
                    />

                    Acceso seguro
                    mediante JWT

                </div>

            </section>

            <section className="login-form-panel">

                <form
                    className="login-form"
                    onSubmit={
                        handleSubmit
                    }
                >

                    <div className="login-form-heading">

                        <span className="login-mini-title">
                            Bienvenido
                        </span>

                        <h2>
                            Inicia sesión
                        </h2>

                        <p>
                            Ingresa tus datos
                            para continuar.
                        </p>

                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <div className="form-group">

                        <label htmlFor="correo">
                            Correo electrónico
                        </label>

                        <div className="input-icon">

                            <Mail
                                size={18}
                            />

                            <input
                                id="correo"
                                type="email"
                                name="correo"
                                placeholder="tu@correo.com"
                                value={
                                    form.correo
                                }
                                onChange={
                                    handleChange
                                }
                                autoComplete="email"
                                required
                            />

                        </div>

                    </div>

                    <div className="form-group">

                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <div className="input-icon">

                            <LockKeyhole
                                size={18}
                            />

                            <input
                                id="password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="••••••••"
                                value={
                                    form.password
                                }
                                onChange={
                                    handleChange
                                }
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(
                                        previous =>
                                            !previous
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Ocultar contraseña"
                                        : "Mostrar contraseña"
                                }
                            >
                                {
                                    showPassword
                                        ? (
                                            <EyeOff
                                                size={18}
                                            />
                                        )
                                        : (
                                            <Eye
                                                size={18}
                                            />
                                        )
                                }
                            </button>

                        </div>

                    </div>

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
                    </button>

                    <div className="login-test-account">

                        <strong>
                            Acceso administrativo
                        </strong>

                        <span>
                            admin@lashuecas.ec
                        </span>

                    </div>

                </form>

            </section>

        </div>
    );
}

export default Login;