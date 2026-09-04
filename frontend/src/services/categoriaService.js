import { apiRequest } from "./api.js";

export function listarCategorias() {
    return apiRequest("/categorias");
}