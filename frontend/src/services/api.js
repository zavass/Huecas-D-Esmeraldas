const API_URL = "http://localhost:8080/api";

export async function apiRequest(
    endpoint,
    options = {}
) {
    const token =
        localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization =
            `Bearer ${token}`;
    }

    const response =
        await fetch(
            `${API_URL}${endpoint}`,
            {
                ...options,
                headers
            }
        );

    if (!response.ok) {
        let message =
            "Ocurrió un error al procesar la solicitud.";

        try {
            const data =
                await response.json();

            message =
                data.message ||
                data.error ||
                message;

        } catch {
            // La respuesta del servidor
            // no contenía JSON.
        }

        if (response.status === 401) {
            message =
                "Correo o contraseña incorrectos.";
        }

        if (response.status === 403) {
            message =
                "No tienes permisos para realizar esta acción.";
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}