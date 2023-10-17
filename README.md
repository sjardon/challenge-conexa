# rotunda-exercise

Repositorio para el ejercicio de Conexa. Espero que disfruten la revisión!

## Introducción

El stack que utilizé para resolver el challenge fue:

1. NodeJs sobre NestJs para desarrollar el servicio.
2. Postgress como DB.
3. Docker para desplegar los contenedores.
4. Digital Ocean como Cloud provider.
5. Github Actions para CI/CD.
6. Docker Compose para desarrollo local.

## Ejecutar en entorno local

El proyecto puede ejecutarse en el entorno local con Docker Compose. Para eso:

1. `cp .env.example .env`
2. Configurar las variables dentro de `.env` de segun sea necesario el entorno local, a exepción de `APP_ENV=local`
3. `docker compose up`

## Ejecutar los tests en entorno local:

1. `cp .env.example .env`
2. Configurar las variables dentro de `.env` de segun sea necesario el entorno local, a exepción de `APP_ENV=local`
3. `docker compose up db`
4. `npm install`
5. `npm run test`

## Ejecución de los endpoints

- Endpoint para registro de nuevos usuarios:

```bash
curl --location 'http://localhost:3000/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@email.com",
    "password": "SomeHardPassword"
}'
```

- Endpoint para login de usuarios y obtención de token de acceso:

```bash
curl --location 'http://localhost:3000/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@email.com",
    "password": "SomeHardPassword"
}'
```

- Endpoint para obtener la lista de películas:

```bash
curl --location 'http://localhost:3000/v1/movies/'
```

- Endpoint para obtener los detalles de una película específica. Solo los "Usuarios Regulares" deberían tener acceso a este endpoint:

```bash
curl --location 'http://localhost:3000/v1/movies/{{movieId}}' \
--header 'Authorization: Bearer {{userToken}}'
```

- Endpoint para crear una nueva película. Solo los "Administradores" deberían tener acceso a este endpoint:

```bash
curl --location 'http://localhost:3000/v1/movies/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{userToken}}' \
--data '{
    "title": "Harry Potter y la piedra filosofal",
    "description": "La historia sigue a Harry Potter, un niño que al cumplir 11 años descubre que es un mago.",
    "director": "Chris Columbus",
    "producer": "Heyday Films",
    "releasDate": "2001-11-22"
}'
```

- Endpoint para actualizar la información de una película existente. Solo los "Administradores" deberían tener acceso a este endpoint.

```bash
curl --location --request PATCH 'http://localhost:3000/v1/movies/{{movieId}}' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{userToken}}' \
--data '{
    "releasDate": "2001-11-21"
}'
```

- Endpoint para eliminar una película. Solo los "Administradores" deberían tener acceso a este endpoint.

```bash
curl --location --request DELETE 'http://localhost:3000/movies/{{movieId}}' \
--header 'Authorization: Bearer {{userToken}}'
```
