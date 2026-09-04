# Las Huecas de Esmeraldas — Frontend

Frontend inicial en React + Vite, diseñado tomando como referencia visual la imagen proporcionada.

## Incluye

- Hero moderno con buscador.
- Navegación responsive.
- Sección de huecas.
- Categorías: comida típica, bolones, asados, pizza y desayunos.
- Sección especial de Las Palmas.
- Rutas para llegar y recorrer Esmeraldas.
- Hoteles limitados conceptualmente al cantón Esmeraldas.
- Cultura esmeraldeña.
- Favoritos locales en memoria.
- Capa `src/services/api.js` preparada para conectar con Spring Boot.

## Ejecutar

```bash
npm install
npm run dev
```

Después abrir la dirección que muestre Vite, normalmente `http://localhost:5173`.

## Backend

Este paquete contiene **solo el frontend**. No modifica ni reemplaza ninguna carpeta del backend existente.

Cuando construyamos el backend, se puede conectar desde `src/services/api.js` y reemplazar los datos estáticos por consultas a Spring Boot/PostgreSQL.

## Imágenes

Las imágenes actuales son fotografías remotas de Unsplash usadas como contenido visual inicial. Para la versión final conviene sustituirlas por fotografías reales y verificadas de establecimientos y lugares del cantón Esmeraldas.