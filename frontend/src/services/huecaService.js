const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:8080/api";


async function procesarRespuesta(response) {

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {

        throw new Error(
            data?.message ||
            data?.error ||
            `Error ${response.status}`
        );
    }

    return data;
}


export async function listarHuecas(
    q = "",
    categoria = ""
) {

    const params =
        new URLSearchParams();

    if (q && q.trim()) {
        params.set(
            "q",
            q.trim()
        );
    }

    if (
        categoria &&
        categoria !== "Todas" &&
        categoria !== "Todos"
    ) {
        params.set(
            "categoria",
            categoria
        );
    }

    const query =
        params.toString();

    const response =
        await fetch(
            `${API_URL}/huecas${query ? `?${query}` : ""}`
        );

    return procesarRespuesta(response);
}


export async function obtenerHuecaPorId(id) {

    const response =
        await fetch(
            `${API_URL}/huecas/${id}`
        );

    return procesarRespuesta(response);
}
