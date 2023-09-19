// Se importa express y los router de productos y carritos para poder hacer uso de la misma. Se utilizada express para crear un server y ponerlo a escuchar.
import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { productService } from "./persistence/index.js";
import { __dirname } from "./utils.js";
import path from "path"
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import fs from "fs"


const port = 8080;

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))

const httpServer = app.listen(port, () => console.log("Servidor escuchando..."));

// Se usa un server Websocket
const io = new Server(httpServer)

// Se configura el uso de Handlebars
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "/views"))

app.use(viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Se hace uso de socket.io para recibir y enviar datos al cliente
io.on("connection", async (socket) => {
    console.log("Cliente conectado");
    const productList = await productService.getProducts();

    socket.emit("productsArray", productList)

    // Se recibe info para añadir un producto a la lista
    // Queda comentado lo que se quiso utilizar para subir una imagen
    socket.on("addProduct", async (data) => {

        // const filePath = `${path.join(__dirname,`/public/images/${data.imgName}`)}`;
        // data.thumbnail = data.imgName
        // console.log(data.thumbnail)

        const prodToAdd = await productService.addProduct(data.title, data.description, data.category, data.price,data.thumbnail, data.code, data.stock);

        if (prodToAdd) {
            // await fs.promises.writeFile(filePath, data.thumbnail);
            const productList = await productService.getProducts();
            io.emit("productsArray", productList)
            socket.emit("successMessage", "El producto fue agregado a la lista!")
        } else {
            socket.emit("errorMessage", "No se pudo agregar el producto. Vea la consola del servidor para mas detalles.")
        }

        const productList = await productService.getProducts();
        io.emit("productsArray", productList)
    })


    // Se recibe info para eliminar un producto de la lista
    socket.on("deleteProduct", async (prodId) => {
        const deletedProduct = await productService.deleteProduct(prodId);
        const productList = await productService.getProducts();
        io.emit("productsArray", productList);
    });
});