class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (title && description && price && thumbnail && code && stock) {
            const confirmCode = this.products.some(product => product.code === code);

            if (confirmCode) {
                console.log("El código ingresado ya existe dentro de la lista de productos.");
            } else {

                let newId;
                if (this.products.length === 0) {
                    newId = 1;
                } else {
                    newId = this.products[this.products.length-1].prodId+1;
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
                this.products.push(product);
                console.log("El producto se ha agregado exitosamente")
            }

        } else {
            console.log("Todos los campos deben ser obligatorios.");
        }
    }

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        let findProd = this.products.find((product) => product.prodId === id)
        if (findProd) {
            console.log(findProd)
        } else {
            console.log("Producto No Encontrado")
        }
    }
}

//Proceso de Testing
const productos = new ProductManager()
productos.getProducts()
productos.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productos.getProducts()
productos.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productos.getProductById(1)
productos.getProductById(4)

// productos.addProduct("Manga - Slam Dunk", "Tomo numero 1", 6000,"url",123,10)
// productos.addProduct("Manga - Dragon ball", "Tomo numero 5", 8800,"url2",234,20)
// productos.getProducts()
// productos.getProductById(2)