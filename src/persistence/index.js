import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";
import { __dirname } from "../utils.js";
import path from "path"

export const productService = new ProductManager(path.join(__dirname,"/files/products.json"))
export const cartService = new CartManager(path.join(__dirname,"/files/carts.json"))

// Se crean las clases ProductManager y CartManager, así como la variable __dirname y el módulo 'path' necesarios para crear instancias de los servicios de productos y carritos en la ruta adecuada.
