import { apiRequest } from "./api.js";

export async function login(
    correo,
    password
) {
    return apiRequest(
        "/auth/login",
        {
            method: "POST",

            body: JSON.stringify({
                correo,
                password
            })
        }
    );
}

export function guardarSesion(data) {
    if (!data?.token) {
        throw new Error(
            "El servidor no devolvió un token."
        );
    }

    localStorage.setItem(
        "token",
        data.token
    );

    const usuario = {
        id: data.id,
        nombre: data.nombre,
        correo: data.correo,
        rol: data.rol
    };

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );
}

export function obtenerToken() {
    return localStorage.getItem("token");
}

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

export function estaAutenticado() {
    return Boolean(obtenerToken());
}

export function esAdmin() {
    const usuario =
        obtenerUsuario();

    return (
        usuario?.rol?.toUpperCase()
        === "ADMIN"
    );
}

export function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
}