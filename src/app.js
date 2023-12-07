import express from "express"
import ProductManager from "./components/ProductManager.js";

const app = express()
app.use(express.urlencoded({ extended: true }))

const productos = new ProductManager()
const readProducts = productos.readProducts()

//console.log(await readProducts)

app.get("/products", async (req, res) => {

    //consigna limites de resultados
    let limit = parseInt(req.query.limit)

    if (!limit) return res.send(await readProducts)

    let allProducts = await readProducts
    let productsLimit = allProducts.slice(0, limit)

    //console.log(limit)

    res.send(productsLimit)
})

// enviar ID para filtrar

app.get("/products/:id", async (req, res) => {

    let id = parseInt(req.params.id)
    let allProducts = await readProducts
    let productById = allProducts.find(product => product.id === id)
    res.send(productById)

    //console.log(id)

})




const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Express por local Host ${server.address().port}`)
})

server.on("error", (errror) => console.log(`Error der servidor ${errror}`))

