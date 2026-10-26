const API_BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:8080/api"
).replace(/\/$/, "");

async function solicitarListadoNoticias(signal) {
  const respuesta = await fetch(`${API_BASE}/noticias`, {
    method: "GET",
    cache: "no-store",
    signal,
    headers: { Accept: "application/json" },
  });

  if (!respuesta.ok) {
    throw new Error(`No fue posible cargar noticias: HTTP ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  if (!Array.isArray(datos)) {
    throw new Error("El servidor no devolvió una lista de noticias.");
  }
  return datos;
}

export function obtenerNoticias(signal) {
  return solicitarListadoNoticias(signal);
}

// El RSS se actualiza por tarea programada en Spring Boot.
// Este método actualiza la lista visible sin exponer importación pública.
export function actualizarNoticias() {
  return solicitarListadoNoticias();
}
