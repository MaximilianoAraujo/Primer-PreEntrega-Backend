const socketClient = io();

const productList = document.getElementById("productList");
const formProdCreation = document.getElementById("formProdCreation");

// Se obtienen los datos del form ubicado en realTimeProducts.hbs y se envian al servidor
formProdCreation.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(formProdCreation);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    };
    jsonData.price = parseInt(jsonData.price);
    jsonData.stock = parseInt(jsonData.stock);
    // La sig linea pertenece a lo que se intento utilizar para subir imagenes
    // jsonData.imgName = jsonData.thumbnail.name;

    socketClient.emit("addProduct", jsonData);

    formProdCreation.reset();
})

// Sea obtienen los productos del servidor y se crean un div por cada elemento
socketClient.on("productsArray", (data) => {
    let productsElements = "";
    data.forEach(element => {
        productsElements +=
            `<div class="list">
                <p>Producto ${element.prodId} - ${element.title}</p>
                <p>Precio: ${element.price}</p>
                <p>Código: ${element.code} || Stock: ${element.stock}</p>
                <button class="delProd" onClick="deleteProd(${element.prodId})">Eliminar producto</button>
            </div>`
    });
    // Se habia agregado esta linea para ver las imagenes <img src="/images/${element.thumbnail}">

    productList.innerHTML = productsElements

    console.log(productsElements)
});

// funcíon para obtener y enviar el ID del producto a eliminar
const deleteProd = (prodId) => {
    socketClient.emit("deleteProduct", prodId);
}

// Se obtiene un mensaje de error del servidor si no se pudo agregar el producto
socketClient.on("errorMessage", (message) => {
    const messageCaptured = message
    const infoMessage = document.getElementById("infoMessage");
    infoMessage.innerHTML = `${messageCaptured}`
})

// Se obtiene un mensaje exitoso del servidor si no se pudo agregar el producto
socketClient.on("successMessage", (message) => {
    const messageCaptured = message
    const infoMessage = document.getElementById("infoMessage");
    infoMessage.innerHTML = `${messageCaptured}`
})