import fs from "fs";

class ProductManager {
    constructor() {
        this.path = 'Products.json';
    }

    async getProducts() {
        try {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let objContenido = JSON.parse(contenido);
            return objContenido;
        } catch (error) {
                console.log(error);
        }
    }

    async #getNewId() {
        try {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let objContenido = JSON.parse(contenido);
            return objContenido.length + 1;
        } catch (error) {
                console.log(error);
        }
    }

    async addProduct(title, description, price, thumbnail, stock) {
        let newProduct = {
            id: await this.#getNewId(),
            title,
            description,
            price,
            thumbnail,
            stock
        }

        try {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let objContenido = JSON.parse(contenido);
            objContenido.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(objContenido));
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let objContenido = JSON.parse(contenido);
            let result = objContenido.find(elem => elem.id == id);
            if (result != undefined) {
                return result;
            } else {
                return "Not found";
            }
        } catch (error) {
            console.log(error);
        }
    }


    async updateProduct(id) {
        try {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let objContenido = JSON.parse(contenido);
            let result = objContenido.find(elem => elem.id == id);
            if (result != undefined) {
                result.price = 350;
                result.stock = 1000;
                await fs.promises.writeFile(JSON.stringify(objContenido));
                return "Producto actualizado!"
            } else {
                return "Not found";
            }
        } catch (error) {
            console.log(error);
        }
    }  
}



// let manager = new ProductManager();
// await manager.addProduct("Manzana", "Manzana Roja", 100, "../images/manzana.png", 500);
// await manager.addProduct("Banana", "Banana Verde", 150, "../images/banana.png", 300);

// console.log(await manager.getProducts());

// manager.getProductById(2);

// manager.updateProduct(1);

export default ProductManager;