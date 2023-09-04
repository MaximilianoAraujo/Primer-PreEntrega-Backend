# Product Manager - README
Este repositorio contiene un código de prueba que implementa una aplicación de gestión de productos utilizando Node.js, Express y FileSystem. La aplicación utiliza una clase llamada ProductManager para realizar operaciones en una lista de productos almacenada en un archivo JSON tales:

- Crear un producto
- Obetener una lista producto
- Obtener un producto en específico
- Actualizar un producto
- Eliminar un producto



# Estructura de archivos
- productManager.js: Este archivo contiene la definición de la clase ProductManager, que proporciona métodos para gestionar productos.
- server.js: Este archivo es el punto de entrada de la aplicación Express. Configura las rutas y crea una instancia de ProductManager.
- products.json: Este archivo JSON se utiliza para almacenar la lista de productos. Se crea si no existe cuando se ejecutan las operaciones.



# Uso de la clase ProductManager
La clase ProductManager ofrece los siguientes métodos:

- fileExist(): Verifica si el archivo de productos existe en el sistema de archivos.
- ensureFileExists(): Crea el archivo de productos si no existe. Esto evita el error "ENOENT, no such file or directory" y garantiza que siempre haya una lista de productos vacía disponible.
- addProduct(): Agrega un nuevo producto a la lista. Valida que se proporcionen todos los campos obligatorios y que el código del producto sea único.
- getProducts(): Obtiene la lista completa de productos desde el archivo JSON.
- getProductById(): Busca un producto específico por su ID y lo devuelve si se encuentra.
- updateProduct(): Actualiza un producto existente utilizando su ID. Se pueden cambiar los campos especificados en updatedFields.
- deleteProduct(): Elimina un producto de la lista por su ID.



# Configuración de Express
En server.js, se configuran dos rutas:

- GET /products: Esta ruta devuelve una lista de productos. Puede incluir un parámetro limit en la consulta para limitar la cantidad de productos devueltos.
- GET /products/:pid: Esta ruta devuelve un producto específico según su ID, que se pasa como parte de la URL.



# Ejecución de la aplicación
Para ejecutar la aplicación, asegurarse de tener Node.js instalado y seguir estos pasos:

- Clonar el repositorio en tu sistema.
- Abrir una terminal y navegar hasta el directorio del proyecto.
- Ejecutar el comando "npm install" para instalar las dependencias
- Ejecutar el comando " node src/server.js" para abrir el servidor


La aplicación estará disponible en http://localhost:8080 y se podrá acceder a las rutas /products y /products/:pid para interactuar con la lista de productos.