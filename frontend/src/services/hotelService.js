import {
    apiRequest
} from "./api.js";

export function listarHoteles(
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
        `/hoteles${
            query
                ? `?${query}`
                : ""
        }`
    );
}

export function obtenerHotel(id) {
    return apiRequest(
        `/hoteles/${id}`
    );
}