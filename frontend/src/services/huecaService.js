import { apiRequest } from "./api.js";

export function listarHuecas(q = "", categoria = "") {
    const params = new URLSearchParams();

    if (q.trim()) {
        params.append("q", q.trim());
    }

    if (categoria.trim()) {
        params.append("categoria", categoria.trim());
    }

    const query = params.toString();

    return apiRequest(
        `/huecas${query ? `?${query}` : ""}`
    );
}

export function obtenerHueca(id) {
    return apiRequest(`/huecas/${id}`);
}