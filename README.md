<div align="center">

<img src="frontend/public/images/logo/esmeralda.png" alt="Logo de Las Huecas de Esmeraldas" width="110" />

# 🌿 Las Huecas de Esmeraldas

### Sabores que cuentan historias

**Plataforma web para descubrir la gastronomía, los alojamientos y las buenas historias de Esmeraldas, Ecuador.**

[![React](https://img.shields.io/badge/React-19-149E90?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-E76F00?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**[Repositorio en GitHub](https://github.com/zavass/Huecas-D-Esmeraldas)** · **Proyecto en desarrollo**

</div>

---

## 📖 Acerca del proyecto

**Las Huecas de Esmeraldas** es una aplicación web turística y gastronómica que busca dar visibilidad a la identidad cultural de Esmeraldas, Ecuador. Reúne información sobre establecimientos de comida, hospedajes y noticias de interés local en una interfaz visual, accesible y adaptable a distintos dispositivos.

El objetivo es facilitar que habitantes y visitantes descubran lugares y experiencias, conozcan negocios de la zona y encuentren información útil antes de recorrer la provincia.

> **Alcance actual de la interfaz:** Inicio, Huecas, Hoteles y Noticias. La sección pública de Rutas se retiró de la navegación; pueden permanecer clases o endpoints de rutas en el backend como parte del código existente.

## ✨ Funcionalidades

| Sección | ¿Qué ofrece? |
|:--|:--|
| 🏠 **Inicio** | Portada con identidad visual esmeraldeña y acceso a las secciones del sitio. |
| 🍽️ **Huecas** | Catálogo de establecimientos gastronómicos, tarjetas, información de cada lugar y páginas de detalle. |
| 🏨 **Hoteles** | Catálogo con buscador, filtros de zona y precio, ordenamiento y ficha individual. Los hoteles sin precio registrado no muestran un valor ficticio. |
| 📰 **Noticias** | Noticias obtenidas de fuentes externas mediante RSS, filtradas por temas locales, con fechas, enlaces y fotografías cuando están disponibles. |
| 📱 **Diseño adaptable** | Componentes y estilos para navegación desde computadoras y dispositivos móviles. |
| 🔗 **Enlaces sociales** | Accesos a redes sociales externas desde el pie de página. No se importa automáticamente contenido de cuentas sociales ajenas. |

### Noticias y actualización

- El backend consulta fuentes RSS de forma programada según `noticias.cron` (configurado para las **07:00, 12:00, 18:00 y 22:00**, hora de Ecuador).
- Los artículos se almacenan en PostgreSQL para evitar depender de una consulta en cada visita.
- Se utilizan filtros temáticos y de ubicación para favorecer información relevante de Esmeraldas, Ecuador.
- Un servicio intenta recuperar imágenes relacionadas desde las páginas originales. Si la fuente no ofrece una imagen utilizable, se muestra una alternativa ilustrativa.
- **La actualización programada requiere que el backend esté encendido**. No se garantiza que las fuentes publiquen noticias nuevas cada día, ni que el filtrado automático sea perfecto.

## 🧰 Tecnologías utilizadas

| Capa | Tecnologías |
|:--|:--|
| **Frontend** | React 19, Vite 7, JavaScript, JSX y CSS |
| **Navegación e interfaz** | React Router y Lucide React |
| **Backend** | Java 21, Spring Boot 3.5, Maven |
| **API y persistencia** | Spring Web, Spring Data JPA, Hibernate |
| **Base de datos** | PostgreSQL |
| **Autenticación** | Spring Security y JWT (funcionalidades de backend) |
| **Contenedores** | Docker y Docker Compose (configuración incluida, requiere revisión; ver más abajo) |

## 🗂️ Estructura del repositorio

```text
Huecas-D-Esmeraldas/
├── backend/
│   ├── src/main/java/com/eshuecas/backend/
│   │   ├── config/          # Configuraciones del servidor
│   │   ├── controller/      # Endpoints REST
│   │   ├── dto/             # Objetos de transferencia de datos
│   │   ├── entity/          # Entidades JPA
│   │   ├── repository/      # Repositorios de PostgreSQL
│   │   ├── security/        # Seguridad y JWT
│   │   └── service/         # Reglas de negocio y noticias
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/
│   ├── public/              # Imágenes y recursos públicos
│   ├── src/
│   │   ├── assets/          # Recursos y mapas de imágenes
│   │   ├── components/      # Navbar, Footer, Layout, etc.
│   │   ├── pages/           # Inicio, Huecas, Hoteles, Noticias
│   │   ├── routes/          # Rutas de React
│   │   └── services/        # Comunicación con la API
│   ├── index.html
│   └── package.json
├── docker-compose.yml
├── ESTRUCTURA_PROYECTO.md
└── README.md
```

## ✅ Requisitos para ejecutarlo localmente

Antes de comenzar, instala:

- **Git**, para clonar el proyecto.
- **Java JDK 21**, para ejecutar Spring Boot.
- **Apache Maven 3.9 o superior**, para compilar el backend (o un wrapper Maven si está disponible).
- **Node.js compatible con Vite 7** (recomendado: Node.js 22 LTS) y **npm**.
- **PostgreSQL** (el proyecto incluye una opción basada en PostgreSQL 16 mediante Docker).
- Un editor como **Visual Studio Code** o **IntelliJ IDEA** (opcional).

Comprueba tus herramientas:

```bash
java -version
mvn -version
node -v
npm -v
git --version
```

## 🚀 Instalación local paso a paso (recomendada)

### 1. Clonar el repositorio

```bash
git clone https://github.com/zavass/Huecas-D-Esmeraldas.git
cd Huecas-D-Esmeraldas
```

### 2. Preparar PostgreSQL

Inicia PostgreSQL y crea una base de datos con el nombre indicado:

```sql
CREATE DATABASE las_huecas_esmeraldas;
```

Revisa el archivo `backend/src/main/resources/application.properties` y configura la conexión para **tu instalación local**:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/las_huecas_esmeraldas
spring.datasource.username=postgres
spring.datasource.password=TU_CLAVE_LOCAL
```

Sustituye `TU_CLAVE_LOCAL` por la contraseña de tu usuario de PostgreSQL. **No publiques contraseñas reales ni claves JWT en un repositorio público.** Para proyectos compartidos o despliegues, utiliza variables de entorno y cambia las credenciales expuestas anteriormente.

En desarrollo, el proyecto utiliza `spring.jpa.hibernate.ddl-auto=update` para adaptar el esquema. No lo utilices como sustituto de migraciones controladas en producción.

### 3. Iniciar el backend

Abre una terminal desde la raíz del repositorio:

```bash
cd backend
mvn spring-boot:run
```

El servidor API utiliza, por defecto:

**http://localhost:8080**

Comprueba desde el navegador el endpoint público:

```text
http://localhost:8080/api/noticias
```

Si aún no hay noticias publicadas, es posible que devuelva `[]`.

### 4. Iniciar el frontend

Abre **otra terminal** en la raíz del proyecto:

```bash
cd frontend
npm install
npm run dev
```

Abre la aplicación en:

**http://localhost:5173**

Rutas principales de la interfaz:

| Página | Dirección |
|:--|:--|
| Inicio | `http://localhost:5173/` |
| Huecas | `http://localhost:5173/huecas` |
| Hoteles | `http://localhost:5173/hoteles` |
| Noticias | `http://localhost:5173/noticias` |

### 5. Configurar la URL de la API (opcional)

Por defecto, varios servicios del frontend esperan encontrar el backend en `http://localhost:8080/api`. Si trabajas en otra computadora o puerto, revisa los servicios de `frontend/src/services/` y la configuración `VITE_API_URL` si el servicio correspondiente la utiliza.

> Al hacer un despliegue remoto, `localhost` no puede ser la dirección de la API para los visitantes: habrá que configurar un servidor y un dominio accesibles públicamente.

## 🐳 Docker Compose (alternativa)

Se incluye `docker-compose.yml` con servicios para PostgreSQL, backend y frontend. Para probarlo, instala **Docker Desktop** y usa desde la raíz:

```bash
docker compose up --build
```

**Importante:** la versión actual del repositorio utiliza una URL fija de PostgreSQL con `localhost` en `application.properties`, mientras que `docker-compose.yml` define el servicio de base de datos como `postgres` y pasa variables `DB_URL`, `DB_USERNAME` y `DB_PASSWORD`. **Estas configuraciones deben alinearse antes de esperar que el backend funcione dentro de Docker.** La ejecución manual descrita arriba es la opción principal de esta guía.

Si configuraste correctamente el entorno Docker, los puertos previstos son `5173` (frontend), `8080` (backend) y `5432` (PostgreSQL).

Para detener los contenedores:

```bash
docker compose down
```

> `docker compose down -v` **también elimina el volumen de datos de PostgreSQL**. Úsalo solo si deseas perder esa base local.

## 🔌 API: ejemplos de rutas

El backend expone endpoints REST para distintos módulos. Algunas operaciones de escritura o administración requieren autenticación y permisos.

| Método | Ruta | Descripción |
|:--|:--|:--|
| `GET` | `/api/health` | Comprobación de salud, si está habilitada. |
| `GET` | `/api/categorias` | Categorías. |
| `GET` | `/api/huecas` | Listado de huecas. |
| `GET` | `/api/huecas/{id}` | Detalle de una hueca. |
| `GET` | `/api/hoteles` | Listado de hoteles. |
| `GET` | `/api/hoteles/{id}` | Detalle de un hotel. |
| `GET` | `/api/noticias` | Noticias publicadas. |
| `POST` | `/api/noticias/actualizar` | Actualización desde fuentes; debe estar restringida a usuarios autorizados. |

Las entidades y controladores del backend pueden incluir otros módulos (usuarios, autenticación, reseñas, favoritos y rutas). Su existencia no implica que todos cuenten con una página pública activa.

## 🧪 Comprobaciones útiles

```bash
# Desde backend/: compilar
mvn clean compile

# Desde frontend/: compilar la interfaz
npm run build
```

**Problemas frecuentes:**

| Problema | Qué revisar |
|:--|:--|
| No abre `localhost:5173` | Que `npm run dev` esté ejecutándose y no haya errores de Vite. |
| Error de conexión a PostgreSQL | Servicio iniciado, nombre de base, usuario, contraseña y puerto. |
| El frontend no carga datos | Backend en el puerto `8080`, servicio HTTP y configuración CORS. |
| Noticias vacías | Seleccionar el filtro **Todas**; verificar `/api/noticias`, conectividad y tarea programada. |
| Imágenes no disponibles | Algunas fuentes externas bloquean las imágenes o no publican metadatos; se muestra imagen alternativa. |
| Docker no conecta con la base | Usar `postgres` como host interno y alinear las propiedades JDBC con las variables del contenedor. |

## 🔐 Seguridad y uso responsable

- El proyecto está pensado principalmente para **desarrollo y aprendizaje**; revisa su seguridad antes de exponerlo a internet.
- Cambia las contraseñas y secretos JWT que hayan estado publicados en el historial de Git.
- Evita subir `node_modules/`, `target/`, `.env` y otros archivos locales con datos sensibles.
- Verifica permisos de escritura, autenticación, CORS y valores configurados para producción.
- Las noticias pertenecen a sus fuentes originales. Conserva la atribución y los enlaces; utiliza imágenes externas solo cuando su uso esté permitido.
- Los filtros automáticos de noticias no equivalen a una verificación editorial humana.

## 🤝 Colaboración

Si deseas proponer una corrección o mejora:

1. Abre un **Issue** describiendo el problema o la idea.
2. Crea una rama para tus cambios.
3. Comprueba que el backend compile y que el frontend genere su build.
4. Envía una **Pull Request** explicando qué cambiaste.

**Repositorio:** [zavass/Huecas-D-Esmeraldas](https://github.com/zavass/Huecas-D-Esmeraldas)

## 📄 Licencia

En el repositorio consultado no se identifica un archivo de licencia. **No se concede una licencia de reutilización por el solo hecho de que el código sea público**; consulta al titular antes de redistribuirlo o incorporarlo a otros proyectos.

---

<div align="center">

**🌴 Esmeraldas, Ecuador · Gastronomía, hospitalidad y cultura**

*Las Huecas de Esmeraldas — Sabores que cuentan historias.*

</div>
