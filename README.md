# Gestión de Productos y Carritos - README
Este proyecto es una aplicación de gestión de productos y carritos desarrollada en Node.js y Express. La aplicación permite realizar operaciones como agregar, obtener, actualizar y eliminar productos, así como crear y modificar carritos de compras. Los datos de productos y carritos se almacenan en archivos JSON para su persistencia.



## Funcionalidades Principales

- **Agregar un Producto:** Puedes agregar un nuevo producto especificando detalles como título, descripción, categoría, precio, imagen, código, stock y estado.

- **Obtener una Lista de Productos:** Puedes obtener una lista completa de todos los productos disponibles.

- **Obtener un Producto por su ID:** Puedes obtener información detallada de un producto específico proporcionando su ID.

- **Actualizar un Producto:** Puedes actualizar los detalles de un producto existente utilizando su ID. Nota importante: No es posible modificar el ID de un producto.

- **Eliminar un Producto:** Puedes eliminar un producto por su ID.

- **Crear un Carrito de Compras:** Puedes crear un nuevo carrito de compras, que inicialmente estará vacío.

- **Obtener un Carrito por su ID:** Puedes obtener información sobre un carrito específico proporcionando su ID.

- **Agregar Productos a un Carrito:** Puedes agregar productos a un carrito especificando tanto el ID del carrito como el ID del producto a agregar. Si el producto ya está en el carrito, la cantidad se incrementará en lugar de agregar un nuevo elemento.



## Requisitos

- **Node.js:** Asegúrate de tener Node.js instalado en tu sistema.



## Instalación

1. Clona o descarga el repositorio en tu máquina local.
2. Abre una terminal y navega hasta la carpeta raíz del proyecto.
3. Ejecuta `npm install` para instalar las dependencias del proyecto.



## Uso

1. Inicia la aplicación ejecutando `npm start` en la terminal.
2. La aplicación estará disponible en `http://localhost:8080`.
3. Utiliza herramientas como Postman o tu navegador para interactuar con la API.
4. Las rutas y métodos disponibles se describen a continuación:



### Rutas de la API

- **GET `/api/products`:** Obtiene una lista de productos. Puedes especificar un parámetro `limit` para limitar la cantidad de productos devueltos.

- **GET `/api/products/:pid`:** Obtiene un producto específico por su ID.

- **POST `/api/products`:** Agrega un nuevo producto. Debes proporcionar los detalles del producto en el cuerpo de la solicitud.

- **PUT `/api/products/:pid`:** Actualiza un producto existente por su ID. Puedes especificar los campos a actualizar en el cuerpo de la solicitud.

- **DELETE `/api/products/:pid`:** Elimina un producto por su ID.

- **POST `/api/carts`:** Crea un nuevo carrito de compras.

- **GET `/api/carts/:cid`:** Obtiene un carrito de compras por su ID.

- **POST `/api/carts/:cid/product/:pid`:** Agrega un producto a un carrito de compras especificando tanto el ID del carrito como el ID del producto.
