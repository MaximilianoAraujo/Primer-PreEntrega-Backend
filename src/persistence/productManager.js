import fs from "fs"

export class ProductManager {
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

     // Metodo para crear un nuevo producto. Se crea con un ID autoincrementable. Se valida por ID que el producto a crear no fue creado previamente.
    async addProduct(title, description,category, price, thumbnail, code, stock, status) {
        try {
            await this.ensureFileExists();

            if (title && description && category && price && thumbnail && code && stock && status) {
                const fileContent = await fs.promises.readFile(this.path, "utf-8");
                const contentToJson = JSON.parse(fileContent);
                const confirmCode = contentToJson.some(product => product.code === code);

                if (confirmCode) {
                    console.log("ERROR! El código ingresado ya existe dentro de la lista de productos.");
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
                        category,
                        price,
                        thumbnail,
                        code,
                        stock,
                        status,
                    };
                    contentToJson.push(product);
                    await fs.promises.writeFile(this.path, JSON.stringify(contentToJson, null, "\t"));
                    return contentToJson
                }
            } else {
                console.log("ERROR! Todos los campos deben ser obligatorios.");
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // Metodo para obtener la lista de productos.
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

    // Metodo para obtener por ID un producto en específico de la lista de productos.
    async getProductById(id) {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = JSON.parse(fileContent);
            let findProd = contentToJson.find((product) => product.prodId === id);
            if (findProd) {
                return findProd;
            } else {
                console.log("ERROR! Producto No Encontrado");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para actualizar los valores de los productos. Se utiliza el ID para buscar el producto.
    async updateProduct(id, updatedFields) {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = JSON.parse(fileContent);
            const productIndex = contentToJson.findIndex(product => product.prodId === id);

            if (productIndex !== -1) {
                const updatedProduct = { ...contentToJson[productIndex], ...updatedFields };
                
                if (updatedProduct.prodId !== contentToJson[productIndex].prodId) {
                    console.log("El ID no puede ser modificado")
                    return null
                } else {
                    contentToJson[productIndex] = updatedProduct         
                    await fs.promises.writeFile(this.path, JSON.stringify(contentToJson, null, "\t"));
                    return updatedProduct;
                }
            } else {
                console.log("ERROR! Producto No Encontrado");
                return null
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    // Método para elimitar un producto de la lista. Se utiliza el ID para buscar el producto.
    async deleteProduct(id) {
        try {
            await this.ensureFileExists();

            const fileContent = await fs.promises.readFile(this.path, "utf-8");
            const contentToJson = await JSON.parse(fileContent);
            const prodIndex = contentToJson.findIndex(product => product.prodId === id);

            if (prodIndex !== -1) {
                contentToJson.splice(prodIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(contentToJson, null, "\t"));
                return contentToJson
            } else {
                console.log("ERROR! Producto No Encontrado");
                return null
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}
