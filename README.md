# Express API Project

Este proyecto es una API construida con [Express.js](https://expressjs.com/) que permite gestionar empleados. Incluye rutas para obtener, filtrar y agregar empleados.

## Requisitos previos

Asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/JohanyFlores/Express.git

2. Navega al directorio del proyecto:

cd Express

3. Instala las dependencias:

npm install

##Scripts disponibles

- Iniciar el servidor en modo producción:


npm start

-Iniciar el servidor en modo desarrollo (con recarga automática):


npm run dev

# Uso

Endpoints disponibles

1. Obtener el empleado más viejo

Ruta: GET /api/employees/oldest
Descripción: Devuelve el empleado más viejo.
Respuesta: Objeto JSON con los datos del empleado más viejo.

2. Obtener un empleado por nombre

Ruta: GET /api/employees/:name
Descripción: Busca un empleado por su nombre.
Respuesta: Objeto JSON con los datos del empleado o un error 404.

3. Obtener empleados con filtros


Ruta: GET /api/employees
Parámetros de consulta:
page: Número de página (ejemplo: ?page=1).
user: Filtra empleados con privilegios de usuario (ejemplo: ?user=true).
badges: Filtra empleados que tengan una insignia específica (ejemplo: ?badges=gold).
Descripción: Devuelve una lista de empleados filtrados según los parámetros.

4. Añadir un nuevo empleado

Ruta: POST /api/employees
Cuerpo de la solicitud (JSON):


  "name": "Jane Doe",
  "age": 30,
  "phone": "123-456-7890",
  "privileges": "user",
  "favorites": ["coffee", "coding"],
  "finished": true,
  "badges": ["gold", "silver"],
  "points": 100
}


Descripción: Añade un nuevo empleado a la lista.
Respuesta: Objeto JSON con los datos del empleado recién creado.


Dependencias
Express.js: Framework para construir aplicaciones web y APIs.

