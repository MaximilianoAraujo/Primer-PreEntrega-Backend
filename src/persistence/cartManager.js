import fs from "fs"
import { productService } from "../persistence/index.js";

export class CartManager {
    constructor(path) {
        this.path = path;
    }

    // Metodos auxiliares
    fileExist() {
        return fs.existsSync(this.path)
    }

    // Metodo para evitar el error "Error: ENOENT, no such file or directory" y asegurar tener un archivo, aunque no contenga data.
    async ensureFileExists() {
        try {
            if (!this.fileExist()) {
                await fs.promises.writeFile(this.path, "[]");
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // Metodo para crear un nuevo carrito. Se crea con un ID autoincrementable.
    async addCart() {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = JSON.parse(fileContent);

            let newId;
            if (contentToJson.length === 0) {
                newId = 1;
            } else {
                newId = contentToJson[contentToJson.length - 1].cartId + 1;
            }

            const cart = {
                cartId: newId,
                products: []
            };
            contentToJson.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(contentToJson, null, "\t"));
            return contentToJson
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para obtener un carrito por su ID
    async getCartById(id) {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = JSON.parse(fileContent);
            let findCart = contentToJson.find((cart) => cart.cartId === id);
            if (findCart) {
                return findCart;
            } else {
                console.log("ERROR! Carrito No Encontrado");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para añadir un producto del array de productos a un carrito en específico. Se valida si el producto existe o no en el carrito, para añadirlo o sumar +1 a la cantidad.
    async addProdToCart(cid, pid) {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = JSON.parse(fileContent);
            let findCart = contentToJson.find((cart) => cart.cartId === cid);

            if (findCart) {
                const findProd = await productService.getProductById(pid);

                if (findProd) {
                    const existingProductIndex = findCart.products.findIndex((p) => p.id === pid);

                    if (existingProductIndex !== -1) {
                        findCart.products[existingProductIndex].quantity += 1;
                    } else {
                        const addProd = {
                            id: pid,
                            quantity: 1
                        };

                        findCart.products.push(addProd);
                    }

                    await fs.promises.writeFile(this.path, JSON.stringify(contentToJson, null, "\t"));
                    return contentToJson;

                } else {
                    console.log("ERROR! Producto No Encontrado");
                    return null
                }
            } else {
                console.log("ERROR! Carrito No Encontrado");
                return null  
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}








