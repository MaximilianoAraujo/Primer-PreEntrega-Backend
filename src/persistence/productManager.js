import fs from "fs"

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // Metodos auxiliares
    fileExist() {
        return fs.existsSync(this.path)
    }

    // Agregue este metodo para evitar el error "Error: ENOENT, no such file or directory" en caso de que se ejecuten los metodos en un orden distinto al que indica el proceso de testing y asi poder tener siempre un array vacio para poder empezar los procesos.
    async ensureFileExists() {
        try {
            if (!this.fileExist()) {
                await fs.promises.writeFile(this.path, "[]");
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // Método para agregar un nuevo producto al archivo products.json. Se valida si todos los campos fueron introducidos; si no es asi, muestro un mensaje de que todos los campos son obligatorios. Si todos los campos fueron agregados, se crea el producto y se añade a la lista de productos. A su vez, se valida que no se puedan crear productos con un mismo prodID.
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            await this.ensureFileExists();

            if (title && description && price && thumbnail && code && stock) {
                const fileContent = await fs.promises.readFile(this.path, "utf-8");
                const contentToJson = JSON.parse(fileContent);
                const confirmCode = contentToJson.some(product => product.code === code);

                if (confirmCode) {
                    console.log("El código ingresado ya existe dentro de la lista de productos.");
                } else {

                    let newId;
                    if (contentToJson.length === 0) {
                        newId = 1;
                    } else {
                        newId = contentToJson[contentToJson.length - 1].prodId + 1;
                    }

                    const product = {
                        prodId: newId,
                        title,
                        description,
                        price,
                        thumbnail,
                        code,
                        stock
                    };
                    contentToJson.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(contentToJson, null, "\t"));
                    console.log("El producto se ha agregado exitosamente: ", contentToJson);
                }
            } else {
                console.log("Todos los campos deben ser obligatorios.");
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // Metodo para obtener la lista de productos del archivo products.json
    async getProducts() {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = JSON.parse(fileContent);
            return contentToJson
        } catch (error) {
            console.log(error.message);
        }
    }

    // Metodo para obtener un producto en específico de la lista de productos del archivo products.json. Se usa el ID para poder buscar el producto y se valida si el mismo es escontrado o no.
    async getProductById(id) {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = JSON.parse(fileContent);
            let findProd = contentToJson.find((product) => product.prodId === id);
            if (findProd) {
                console.log("Producto Encontrado: ", findProd);
            } else {
                console.log("Producto No Encontrado");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para actualizar los valores de los productos. Se utiliza el ID para buscar el producto. Luego podemos cambiar cualquiera de los valores del mismo. Se valida si el producto buscado es encontrado o no.
    async updateProduct(id, updatedFields) {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = JSON.parse(fileContent);
            const productIndex = contentToJson.findIndex(product => product.prodId === id);

            if (productIndex !== -1) {
                const updatedProduct = { ...contentToJson[productIndex], ...updatedFields };
                contentToJson[productIndex] = updatedProduct
                
                await fs.promises.writeFile(this.path, JSON.stringify(contentToJson, null, "\t"));
                console.log("Producto actualizado: ", contentToJson);
            } else {
                console.log("Producto No Encontrado");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para elimitar un producto de la lista. Se uutiliza el ID para buscar el producto. Se valida si el producto a eliminar es encontrado o no.
    async deleteProduct(id) {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = await JSON.parse(fileContent);
            const prodIndex = contentToJson.findIndex(product => product.prodId === id);

            if (prodIndex !== -1) {
                contentToJson.splice(prodIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(contentToJson, null, "\t"));
                console.log("Producto eliminado de la lista. Lista Actualizada: ", contentToJson);
            } else {
                console.log("Producto No Encontrado");
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}
