# Quindio Eventos Backend

Backend en Express + TypeScript para una aplicacion de eventos turisticos y culturales del Quindio. Expone endpoints para consultar y administrar eventos, registrar e iniciar sesion de usuarios, gestionar usuarios administradores y crear reseñas por evento.

El proyecto esta preparado para ejecutarse con [Bun](https://bun.sh/) y usa almacenamiento local:

- Los eventos iniciales viven en memoria en `src/data/events.data.ts`.
- Los usuarios y reseñas se leen y escriben en `src/data/db.json`.

## Tabla de contenido

- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Instalacion](#instalacion)
- [Ejecucion](#ejecucion)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Configuracion CORS](#configuracion-cors)
- [Autenticacion y roles](#autenticacion-y-roles)
- [Endpoints](#endpoints)
- [Modelos de datos](#modelos-de-datos)
- [Datos semilla](#datos-semilla)
- [Notas importantes](#notas-importantes)

## Tecnologias

- Bun como runtime.
- TypeScript.
- Express 5.
- CORS.
- UUID para generar identificadores.
- Almacenamiento local con archivos `.ts` y `.json`.

Dependencias instaladas:

- `express`
- `cors`
- `uuid`
- `jsonwebtoken`
- `bcryptjs`

> Nota: `jsonwebtoken` y `bcryptjs` estan instalados, pero el codigo actual no los usa para generar JWT ni cifrar contraseñas.

## Requisitos

- Bun instalado.
- Node/npm solo si quieres usar el `package-lock.json`, aunque los scripts del proyecto estan orientados a Bun.

## Instalacion

```bash
bun install
```

Tambien existe `package-lock.json`, por lo que se podria instalar con npm, pero el flujo principal del proyecto es con Bun.

## Ejecucion

Modo desarrollo con recarga automatica:

```bash
bun run dev
```

Modo normal:

```bash
bun run start
```

El servidor arranca en:

```txt
http://localhost:3000
```

Endpoint de prueba:

```http
GET /
```

Respuesta:

```json
{
  "mensaje": "Backend de QuindioEventos funcionando 🚀"
}
```

## Estructura del proyecto

```txt
src/
  app.ts
  index.ts
  config/
    env.ts
  controllers/
    auth.controller.ts
    evento.controller.ts
    eventos.controller.ts
    review.controller.ts
    user.controller.ts
  data/
    db.json
    events.data.ts
  middlewares/
    auth.middleware.ts
  routes/
    auth.routes.ts
    evento.routes.ts
    review.routes.ts
    user.routes.ts
  services/
    event.service.ts
  types/
    evento.types.ts
    resena.types.ts
    usuario.types.ts
  utils/
    db.ts
```

Archivos principales:

- `src/index.ts`: punto de entrada real del servidor. Configura Express, CORS, JSON, rutas y `app.listen`.
- `src/app.ts`: exporta una instancia de Express similar, util para pruebas o reutilizacion, pero no monta actualmente las rutas de reseñas.
- `src/routes/*.ts`: declara las rutas HTTP.
- `src/controllers/*.ts`: contiene la logica de cada endpoint.
- `src/services/event.service.ts`: CRUD de eventos sobre el arreglo en memoria.
- `src/utils/db.ts`: lee y guarda `src/data/db.json`.
- `src/data/events.data.ts`: lista inicial de eventos.
- `src/data/db.json`: usuarios y reseñas persistidos.

## Configuracion CORS

El backend acepta solicitudes desde:

```txt
http://localhost:5173
```

Metodos permitidos:

```txt
GET, POST, PUT, DELETE, OPTIONS
```

Headers permitidos:

```txt
Content-Type, Authorization, x-user-id
```

## Autenticacion y roles

La autenticacion actual se basa en el header:

```http
x-user-id: <id-del-usuario>
```

El middleware `validarAutenticado` busca ese usuario en `src/data/db.json`. Si existe, lo agrega a `req.user`.

Roles disponibles:

- `visitante`
- `administrador`

El middleware `validarAdministrador` exige que el usuario autenticado tenga rol `administrador`.

Importante: el login devuelve un campo `token`, pero ese valor es realmente el `id` del usuario. Para acceder a rutas protegidas se debe enviar ese id en el header `x-user-id`.

Ejemplo:

```http
x-user-id: 7e372fa6-5703-4ad2-b05b-df4421132090
```

## Endpoints

### Salud del servidor

#### `GET /`

Verifica que el backend esta funcionando.

Respuesta:

```json
{
  "mensaje": "Backend de QuindioEventos funcionando 🚀"
}
```

## Autenticacion

Base path:

```txt
/api/auth
```

### `POST /api/auth/register`

Registra un usuario con rol `visitante`.

Body:

```json
{
  "nombre": "Laura",
  "correo": "laura@example.com",
  "contrasena": "123456"
}
```

Validaciones:

- `nombre`, `correo` y `contrasena` son obligatorios.
- El correo se normaliza a minusculas.
- No permite correos duplicados.

Respuesta `201`:

```json
{
  "id": "uuid",
  "nombre": "Laura",
  "correo": "laura@example.com",
  "rol": "visitante"
}
```

Errores:

- `400`: faltan campos obligatorios.
- `409`: el correo ya esta registrado.

### `POST /api/auth/login`

Inicia sesion comparando correo y contraseña contra `db.json`.

Body:

```json
{
  "correo": "laura@example.com",
  "contrasena": "123456"
}
```

Respuesta `200`:

```json
{
  "id": "uuid",
  "nombre": "Laura",
  "correo": "laura@example.com",
  "rol": "visitante",
  "token": "uuid"
}
```

Errores:

- `400`: faltan correo o contraseña.
- `401`: credenciales incorrectas.

### `POST /api/auth/logout`

Cierra sesion desde la perspectiva del frontend.

Respuesta:

```json
{
  "mensaje": "Cerrar sesion en frontend"
}
```

## Eventos

Base path:

```txt
/events
```

Los eventos se manejan sobre el arreglo `events` de `src/data/events.data.ts`. Los cambios realizados por POST, PUT o DELETE quedan en memoria mientras el servidor esta corriendo, pero no se guardan en archivo.

### `GET /events`

Lista todos los eventos.

Respuesta `200`:

```json
{
  "data": [
    {
      "id": "1",
      "nombre": "Festival del Cafe del Quindio",
      "descripcion": "...",
      "municipio": "Armenia",
      "lugar": "Parque Sucre, Armenia",
      "fecha": "2026-08-10",
      "hora": "10:00",
      "categoria": "Gastronomia",
      "imagen": "https://...",
      "imagenes": ["https://..."],
      "precio": 0,
      "edadMinima": 0
    }
  ]
}
```

### `GET /events/:id`

Obtiene un evento por id.

Respuesta `200`:

```json
{
  "data": {
    "id": "1",
    "nombre": "Festival del Cafe del Quindio",
    "descripcion": "...",
    "municipio": "Armenia",
    "lugar": "Parque Sucre, Armenia",
    "fecha": "2026-08-10",
    "hora": "10:00",
    "categoria": "Gastronomia",
    "imagen": "https://...",
    "imagenes": ["https://..."],
    "precio": 0,
    "edadMinima": 0
  }
}
```

Errores:

- `400`: id invalido.
- `404`: evento no encontrado.

### `POST /events`

Crea un evento.

Body:

```json
{
  "nombre": "Concierto en Armenia",
  "descripcion": "Evento musical al aire libre",
  "municipio": "Armenia",
  "lugar": "Plaza Bolivar",
  "fecha": "2026-09-01",
  "hora": "19:00",
  "categoria": "Musica",
  "imagen": "https://example.com/imagen.jpg",
  "imagenes": [
    "https://example.com/imagen.jpg",
    "https://example.com/imagen-2.jpg"
  ],
  "precio": 25000,
  "edadMinima": 12
}
```

Campos obligatorios:

- `nombre`
- `descripcion`
- `municipio`
- `lugar`
- `fecha`
- `hora`
- `categoria`
- `imagen`
- `precio`
- `edadMinima`

Reglas:

- Los textos se limpian con `trim`.
- `precio` y `edadMinima` se convierten a numero.
- Si `imagenes` no viene o viene vacio, se usa `imagen` como unica imagen.

Respuesta `201`:

```json
{
  "message": "Evento creado correctamente",
  "data": {
    "id": "uuid",
    "nombre": "Concierto en Armenia",
    "descripcion": "Evento musical al aire libre",
    "municipio": "Armenia",
    "lugar": "Plaza Bolivar",
    "fecha": "2026-09-01",
    "hora": "19:00",
    "categoria": "Musica",
    "imagen": "https://example.com/imagen.jpg",
    "imagenes": ["https://example.com/imagen.jpg"],
    "precio": 25000,
    "edadMinima": 12
  }
}
```

Errores:

- `400`: faltan campos obligatorios.

### `PUT /events/:id`

Actualiza un evento existente.

Acepta el mismo body de creacion. El controlador mezcla los datos actuales con los datos enviados y vuelve a validar todos los campos requeridos.

Respuesta `200`:

```json
{
  "message": "Evento actualizado correctamente",
  "data": {
    "id": "1",
    "nombre": "Evento actualizado",
    "descripcion": "...",
    "municipio": "Armenia",
    "lugar": "Parque Sucre",
    "fecha": "2026-08-10",
    "hora": "10:00",
    "categoria": "Cultural",
    "imagen": "https://...",
    "imagenes": ["https://..."],
    "precio": 0,
    "edadMinima": 0
  }
}
```

Errores:

- `400`: id invalido o campos obligatorios incompletos.
- `404`: evento no encontrado.

### `DELETE /events/:id`

Elimina un evento por id.

Respuesta `200`:

```json
{
  "message": "Evento eliminado correctamente"
}
```

Errores:

- `400`: id invalido.
- `404`: evento no encontrado.

## Usuarios

Base path:

```txt
/api/users
```

Todas las rutas de usuarios requieren:

```http
x-user-id: <id-de-un-administrador>
```

Primero se valida que el usuario exista y luego que tenga rol `administrador`.

### `GET /api/users`

Lista usuarios sin mostrar contraseñas.

Respuesta `200`:

```json
{
  "data": [
    {
      "id": "uuid",
      "nombre": "nicolas",
      "correo": "nicolas@gmail.com",
      "rol": "administrador"
    }
  ]
}
```

### `GET /api/users/:id`

Obtiene un usuario por id sin mostrar contraseña.

Errores:

- `404`: usuario no encontrado.

### `POST /api/users`

Crea un usuario desde una cuenta administradora.

Body:

```json
{
  "nombre": "Admin Nuevo",
  "correo": "admin@example.com",
  "contrasena": "123456",
  "rol": "administrador"
}
```

Validaciones:

- `nombre`, `correo`, `contrasena` y `rol` son obligatorios.
- `rol` debe ser `visitante` o `administrador`.
- No permite correos duplicados.

Respuesta `201`:

```json
{
  "mensaje": "Usuario creado correctamente",
  "data": {
    "id": "uuid",
    "nombre": "Admin Nuevo",
    "correo": "admin@example.com",
    "rol": "administrador"
  }
}
```

### `PUT /api/users/:id`

Actualiza parcialmente un usuario.

Body ejemplo:

```json
{
  "nombre": "Nombre actualizado",
  "correo": "nuevo@example.com",
  "contrasena": "nueva-clave",
  "rol": "visitante"
}
```

Todos los campos son opcionales, pero si se envian deben ser validos.

Reglas:

- `correo` no puede estar vacio y no puede duplicarse.
- `nombre` no puede estar vacio.
- `contrasena` solo se actualiza si llega con contenido.
- `rol` debe ser `visitante` o `administrador`.

Respuesta `200`:

```json
{
  "mensaje": "Usuario actualizado correctamente",
  "data": {
    "id": "uuid",
    "nombre": "Nombre actualizado",
    "correo": "nuevo@example.com",
    "rol": "visitante"
  }
}
```

### `DELETE /api/users/:id`

Elimina un usuario.

Respuesta `200`:

```json
{
  "mensaje": "Usuario eliminado correctamente"
}
```

Errores comunes en usuarios:

- `401`: usuario no autenticado o no valido.
- `403`: se necesita rol administrador.
- `404`: usuario no encontrado.
- `409`: correo duplicado.

## Reseñas

Base path real:

```txt
/api
```

Las rutas quedan montadas asi:

```txt
/api/events/:eventId/reviews
```

### `GET /api/events/:eventId/reviews`

Lista las reseñas asociadas a un evento.

Respuesta `200`:

```json
{
  "data": [
    {
      "id": "uuid",
      "eventId": "1",
      "userId": "uuid",
      "userName": "nicolas",
      "rating": 5,
      "comment": "muy buen evento",
      "createdAt": "2026-06-11T04:50:17.742Z"
    }
  ]
}
```

Errores:

- `400`: id del evento requerido.

### `POST /api/events/:eventId/reviews`

Crea una reseña para un evento. Requiere autenticacion:

```http
x-user-id: <id-del-usuario>
```

Body:

```json
{
  "rating": 5,
  "comment": "Muy buen evento"
}
```

Validaciones:

- `rating` debe ser un entero entre `0` y `5`.
- `comment` es obligatorio y no puede estar vacio.
- El usuario debe existir en `db.json`.

Respuesta `201`:

```json
{
  "mensaje": "Reseña creada correctamente",
  "data": {
    "id": "uuid",
    "eventId": "1",
    "userId": "uuid",
    "userName": "Laura",
    "rating": 5,
    "comment": "Muy buen evento",
    "createdAt": "2026-06-11T21:46:45.906Z"
  }
}
```

Errores:

- `400`: id de evento requerido, rating invalido o comentario vacio.
- `401`: usuario no autenticado.

## Modelos de datos

### Evento

```ts
interface Event {
  id: string;
  nombre: string;
  descripcion: string;
  municipio: string;
  lugar: string;
  fecha: string;
  hora: string;
  categoria: string;
  imagen: string;
  imagenes: string[];
  precio: number;
  edadMinima: number;
}
```

### Usuario

```ts
interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  contrasena: string;
  rol: "visitante" | "administrador";
}
```

Las respuestas publicas de usuarios omiten `contrasena`.

### Reseña

```ts
interface Resena {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
```

## Datos semilla

### Eventos

El archivo `src/data/events.data.ts` contiene 12 eventos iniciales del Quindio, entre ellos:

- Festival del Cafe del Quindio.
- Senderismo Valle del Cocora.
- Festival del Globo de Filandia.
- Noche de Fincas en Montenegro.
- Festival de la Guadua.
- Avistamiento de Aves Calarca.
- Ciclovia Cafetera Armenia.
- Festival de la Cosecha Cafetera.
- Feria Taurina de Salento.
- Turismo de Aventura en Genova.
- Festival del Campesino de Circasia.
- Recorrido Paisaje Cultural Cafetero.

Cada evento incluye municipio, lugar, fecha, hora, categoria, imagen principal, galeria de imagenes, precio y edad minima.

### Usuarios

El archivo `src/data/db.json` contiene usuarios de ejemplo con roles `visitante` y `administrador`.

Para probar rutas protegidas de administracion, puedes iniciar sesion con un usuario administrador y enviar el `id` recibido como `x-user-id`.

## Ejemplos con curl

### Listar eventos

```bash
curl http://localhost:3000/events
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"correo\":\"nicolas@gmail.com\",\"contrasena\":\"1090274491\"}"
```

### Crear reseña

```bash
curl -X POST http://localhost:3000/api/events/1/reviews \
  -H "Content-Type: application/json" \
  -H "x-user-id: 7e372fa6-5703-4ad2-b05b-df4421132090" \
  -d "{\"rating\":5,\"comment\":\"Muy buen evento\"}"
```

### Listar usuarios como administrador

```bash
curl http://localhost:3000/api/users \
  -H "x-user-id: 7e372fa6-5703-4ad2-b05b-df4421132090"
```

## Notas importantes

- Las contraseñas se guardan en texto plano. Para produccion deberian cifrarse con `bcryptjs`.
- No se generan JWT reales. El `token` del login es el id del usuario.
- La autenticacion de rutas protegidas usa el header `x-user-id`.
- Los eventos creados, actualizados o eliminados no se persisten en disco; se pierden al reiniciar el servidor.
- Usuarios y reseñas si se persisten en `src/data/db.json`.
- `src/config/env.ts` esta vacio.
- `src/controllers/eventos.controller.ts` esta vacio.
- `src/app.ts` y `src/index.ts` configuran apps similares, pero `src/index.ts` es el archivo usado por los scripts y monta tambien las rutas de reseñas.
- El CORS esta limitado a `http://localhost:5173`, pensado para un frontend local tipo Vite.

## Scripts disponibles

```json
{
  "dev": "bun --watch src/index.ts",
  "start": "bun src/index.ts"
}
```

## Licencia

Este proyecto no declara una licencia en `package.json`.
