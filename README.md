# Gestor de Carritos y Productos
Este proyecto implementa un gestor de carritos y productos en JavaScript utilizando Node.js y Express. Permite realizar las siguientes acciones:

* Crear un nuevo carrito.
* Obtener un carrito por su ID.
* Añadir productos a un carrito existente.
* Añadir nuevos productos a la lista de productos.
* Obtener la lista de productos.
* Obtener un producto por su ID.
* Actualizar la información de un producto.
* Eliminar un producto de la lista.


## Estructura de los Datos

### Carritos
Los carritos se almacenan en un archivo JSON en la carpeta files. Cada carrito tiene un ID único y una lista de productos con sus ID y cantidades.

### Productos
Los productos se almacenan en otro archivo JSON en la carpeta files. Cada producto tiene un ID único, título, descripción, categoría, precio, código, stock y estado.

## Uso del Código
El código se organiza en módulos para la gestión de productos y carritos. Puedes interactuar con él a través de las rutas API o las vistas en tiempo real.

### Rutas API
* /api/products: Permite realizar operaciones en la lista de productos.
* /api/carts: Permite crear nuevos carritos y añadir productos a ellos.

### Rutas de Vistas en Tiempo Real
* /: Muestra la lista completa de productos.
* /realtimeproducts: Permite añadir o eliminar productos en tiempo real.

## Uso de Socket.io
Se utiliza Socket.io para actualizar en tiempo real la lista de productos cuando se añade o elimina un producto.

## Configuración de Handlebars
Las vistas se generan utilizando el motor de plantillas Handlebars para una experiencia de usuario más amigable.

## Requisitos
Asegúrate de tener Node.js instalado en tu sistema antes de ejecutar el proyecto.

## Instalación
1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la carpeta raíz del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:
* npm install

## Ejecución
Para ejecutar la aplicación, utiliza el siguiente comando:

* npm start

La aplicación estará disponible en http://localhost:8080.

