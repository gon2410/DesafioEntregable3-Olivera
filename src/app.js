import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

app.use(express.urlencoded({extended: true}));

const manager = new ProductManager();

app.get("/productos", async (req, res) => {
    let { limit } = req.query;
    let productos = await manager.getProducts()
    res.send(productos.slice(0, limit));
})

app.get("/productos/:id", async (req, res) => {
    let producto = await manager.getProductById(req.params.id);
    res.send(producto);
})

const server = app.listen(8080, () => {
    console.log("Server running on port 8080.")
})
