const API_URL = "http://localhost:8080/api";


/* =========================================================
   PROCESAR RESPUESTAS
========================================================= */

async function procesarRespuesta(response) {

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {

        const mensaje =
            data?.message ||
            data?.error ||
            "Ocurrió un error al comunicarse con el servidor.";

        throw new Error(mensaje);
    }

    return data;
}


/* =========================================================
   INICIAR SESIÓN
========================================================= */

export async function loginUsuario(datos) {

    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                correo: datos.correo,
                password: datos.password
            })
        }
    );

    return procesarRespuesta(response);
}


/* =========================================================
   REGISTRAR USUARIO
========================================================= */

export async function registrarUsuario(datos) {

    const response = await fetch(
        `${API_URL}/auth/register`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre: datos.nombre,
                correo: datos.correo,
                telefono: datos.telefono,
                password: datos.password,
                confirmarPassword: datos.confirmarPassword
            })
        }
    );

    return procesarRespuesta(response);
}


/* =========================================================
   GUARDAR SESIÓN
========================================================= */

export function guardarSesion(data) {

    if (!data) {
        return;
    }

    if (data.token) {

        localStorage.setItem(
            "token",
            data.token
        );
    }

    localStorage.setItem(
        "usuario",
        JSON.stringify(data)
    );
}


/* =========================================================
   CERRAR SESIÓN
========================================================= */

export function cerrarSesion() {

    localStorage.removeItem("token");

    localStorage.removeItem("usuario");
}


/* =========================================================
   OBTENER TOKEN
========================================================= */

export function obtenerToken() {

    return localStorage.getItem("token");
}


/* =========================================================
   OBTENER USUARIO
========================================================= */

export function obtenerUsuario() {

    const usuario =
        localStorage.getItem("usuario");

    if (!usuario) {
        return null;
    }

    try {

        return JSON.parse(usuario);

    } catch {

        return null;
    }
}


/* =========================================================
   VERIFICAR AUTENTICACIÓN
========================================================= */

export function estaAutenticado() {

    return Boolean(
        obtenerToken()
    );
}


/* =========================================================
   VERIFICAR ADMIN
========================================================= */

export function esAdmin() {

    const usuario =
        obtenerUsuario();

    if (!usuario) {
        return false;
    }

    return (
        String(usuario.rol)
            .toUpperCase() === "ADMIN"
    );
}


/* =========================================================
   ALIAS POR COMPATIBILIDAD
========================================================= */

export function esAdministrador() {

    return esAdmin();
}