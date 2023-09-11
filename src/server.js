import express from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const port = 8080;

const app = express();

app.use(express.json());

app.listen(port, ()=> console.log("Servidor escuchando..."));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Se importa express y los router de productos y carritos para poder hacer uso de la misma. Se utilizada express para crear un server y ponerlo a escuchar.