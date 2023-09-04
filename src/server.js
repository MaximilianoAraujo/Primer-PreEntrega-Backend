import express from "express";
import {ProductManager} from "./persistence/productManager.js";

// Se importa express y la clase ProductManager de productManager.js para poder hacer uso de la misma. Luego creamos una nueva instancia.
// Luego usamos express para poder crear un server y ponerlo a escuchar.
const ProductService = new ProductManager("./src/files/products.json");

const port = 8080;

const app = express();

app.listen(port, ()=> console.log("Servidor escuchando..."));

// Se configura una ruta la cual, al ser accedida, devuelve una lista completa de los productos. A su vez se usa req.query que devuelve una lista limitada según el valor que se le pasa.
app.get("/products", async (req,res)=>{
    try {
        const limit = parseInt(req.query.limit);
        const products = await ProductService.getProducts();
        if(limit){
            const productsLimit = products.slice(0,limit);
            res.send(productsLimit);
        }else {
            res.send(products);
        }
    } catch (error) {
        res.send(error.message);
    }
});

// Se configura una ruta la cual devuelve un producto específico de la lista de productos. Se usa el ID como parametro de búsqueda. Se valida si el producto existe o no.
app.get("/products/:pid",async (req,res) => {
    try {
        const id = parseInt(req.params.pid); 
        const products = await ProductService.getProducts();
        const pid = products.find(p => p.prodId === id);
        if(pid){
            res.send(pid);
        } else {
            res.send("El producto no existe");
        }
    } catch (error) {
        res.send(error.message);
    }
});
