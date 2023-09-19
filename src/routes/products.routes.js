import { Router } from "express";
import { productService } from "../persistence/index.js";

const router = Router()

// Se configura una ruta GET que al ser accedida, devuelve una lista completa de los productos. Se usa req.query para devolver una lista limitada
router.get("/", async (req,res)=>{
    try {
        const limit = parseInt(req.query.limit);
        const products = await productService.getProducts();
        if(limit){
            const productsLimit = products.slice(0,limit);
            res.status(200).json({data:productsLimit});
        }else {
            res.status(200).json({data:products});
        }
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
});

// Se configura una ruta GET que devuelve un producto específico de la lista de productos. Se usa el ID como parametro de búsqueda. 
router.get("/:pid", async (req,res) => {
    try {
        const id = parseInt(req.params.pid); 
        const productById = await productService.getProductById(id);
        if(productById) {
            res.status(200).json({data:productById});
        } else {
            res.status(404).json({message:"El producto no existe"});
        }
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
});

// Se configura una ruta POST que añade un producto a la lista. Se valida si todos los campos fueron agregados.
router.post("/", async (req,res)=>{
    try {
        const newProdBody = req.body
        const NewProd = await productService.addProduct(newProdBody.title, newProdBody.description, newProdBody.category, newProdBody.price, newProdBody.thumbnail, newProdBody.code, newProdBody.stock)
        if (NewProd) {
            res.status(201).json({message:"Producto agregado exitosamente!"})
        } else {
            res.status(400).json({message:"No se pudo agregar el producto. Verifique la consola para mas detalles"})
        }
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
});

// Se configura una ruta PUT que actualiza un producto de la lista. Se utilizada el ID como parametro.
router.put("/:pid", async (req,res) => {
    try {
        const id = parseInt(req.params.pid); 
        const prodUpdateBody = req.body
        const prodUpdated = await productService.updateProduct(id, prodUpdateBody);
        if (prodUpdated !== null){
            res.status(200).json({message:"Producto actualizado exitosamente"});
        } else {
            res.status(404).json({message:"El producto no pudo ser actualizado. Verifique la consola para mas detalles"});
        }
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
});

// Se configura una ruta DELETE que elimina un producto de la lista. Se utilizada el ID como parametro.
router.delete("/:pid", async (req,res) => {
    try {
        const id = parseInt(req.params.pid); 
        const prodDeleted = await productService.deleteProduct(id)
        if (prodDeleted !== null) {
            res.status(200).json({message:"Producto eliminado exitosamente"});
        } else {
            res.status(404).json({message:"Producto no encontrado"});
        }
    } catch (error) {
        res.status(500).json({status:"error", message:error.message});
    }
});

export { router as productsRouter }