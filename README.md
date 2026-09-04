# Las Huecas de Esmeraldas — Full Stack

Proyecto completo: React + Vite + Spring Boot + PostgreSQL.

## Opción 1: ejecutar todo con Docker (recomendada)

Requisitos: Docker Desktop y Docker Compose.

```bash
docker compose up --build
```

Luego abre:
- Frontend: http://localhost:5173
- API: http://localhost:8080/api/health
- PostgreSQL: localhost:5432

Credenciales de desarrollo:
- Base: `las_huecas_esmeraldas`
- Usuario: `postgres`
- Contraseña: `postgres`

Para detener:
```bash
docker compose down
```

Para borrar también los datos de PostgreSQL:
```bash
docker compose down -v
```

## Opción 2: ejecutar manualmente

### PostgreSQL
Crea la base:
```sql
CREATE DATABASE las_huecas_esmeraldas;
```

### Backend
En `backend/src/main/resources/application.properties` ajusta usuario/contraseña si tu PostgreSQL no usa `postgres/postgres`.

Con Maven:
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API principal
- GET `/api/health`
- GET `/api/categorias`
- GET `/api/huecas`
- GET `/api/huecas?categoria=Bolones`
- GET `/api/huecas?q=bolon`
- GET `/api/huecas/{id}`
- POST `/api/huecas`
- PUT `/api/huecas/{id}`
- DELETE `/api/huecas/{id}`
- GET `/api/hoteles`
- GET `/api/hoteles/{id}`
- GET `/api/rutas`
- GET `/api/rutas/{id}`

La aplicación carga datos de demostración automáticamente cuando la base está vacía. Los datos pueden sustituirse posteriormente por los negocios, hoteles, rutas y fotografías reales del proyecto.
