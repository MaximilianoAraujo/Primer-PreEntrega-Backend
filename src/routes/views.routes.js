import { Router } from "express";
import {productService} from "../persistence/index.js"

const router = Router();

// Se configuran las rutas para las views. Una para la lista de productos, y otra que añade, elimina y muestra productos en tiempo real
router.get("/", async(req,res) => {
    const products = await productService.getProducts();
    res.render("home", { products: products, style: "home.css" });
});

router.get("/realtimeproducts", async(req,res) => {
    res.render("realTimeProducts", {style:"realTimeProducts.css"});
});

export {router as viewsRouter}