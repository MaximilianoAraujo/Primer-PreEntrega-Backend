import { Router } from "express";
import { cartService } from "../persistence/index.js";

const router = Router()

// Se configura una ruta POST que crea unn uevo carrito.
router.post("/", async (req,res) =>{
    try {
        const newCart = await cartService.addCart()
        res.status(201).json({data:newCart})
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
})

// Se configura una ruta GET que devuelve un carrito específico. Se una un ID como parametro de búsqueda.
router.get("/:cid", async (req,res) => {
    try {
        const cid = parseInt(req.params.cid)
        const cartById = await cartService.getCartById(cid)
        if(cartById) {
            res.status(200).json({data:cartById});
        } else {
            res.status(404).json({message:"El carrito no existe"});
        }
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
})

// Se configura una ruta POST que añade un producto de la lista de productos a un carrito en específico. Se usan IDs como parametro de busqueda
router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const prodToCart = await cartService.addProdToCart(cid, pid);
        console.log(prodToCart)
        if (prodToCart !== null) {
            res.status(200).json({message: "Producto agregado al carrito correctamente." });
        } else {
            res.status(404).json({ message: "No se pudo agregar el producto al carrito. Verifique la consola para mas detalles" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export { router as cartsRouter }    