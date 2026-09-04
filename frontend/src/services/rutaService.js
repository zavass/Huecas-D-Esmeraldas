import {
    apiRequest
} from "./api.js";

export function listarRutas(
    q = ""
) {

    const params =
        new URLSearchParams();

    if (q.trim()) {
        params.append(
            "q",
            q.trim()
        );
    }

    const query =
        params.toString();

    return apiRequest(
        `/rutas${
            query
                ? `?${query}`
                : ""
        }`
    );
}

export function obtenerRuta(id) {

    return apiRequest(
        `/rutas/${id}`
    );
}