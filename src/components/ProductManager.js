import { promises as fs } from "fs"

// Realizar una clase de nombre “ProductManager”
export default class ProductManager {
    constructor(path) { //agregue path al constructor para la correccion 
        this.path = "./producto.txt"
        // areglo para mantener productos

        this.products = []
    }

    //id (se debe incrementar automáticamente, no enviarse desde el cuerpo)
    static id = 0

    //Éste debe poder agregar, consultar, modificar y eliminar un producto y manejarlo en persistencia de archivos (basado en entregable 1).
    addProduct = async (title, description, price, imagen, code, stock) => {

        //llamo a la ID esatatica y le sumo 1

        ProductManager.id++

        //crar nuevo prducto
        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        }

        //agregar el producto a la lista

        this.products.push(newProduct)

        // console.log(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    //consulta de producto y ID

    readProducts = async () => {
        let lectura = await fs.readFile(this.path, "utf-8")

        return JSON.parse(lectura)
    }

    getProducts = async () => {
        let respuesta = await this.readProducts()

        return console.log(respuesta)

    }


    getProductsById = async (id) => {

        let filtrarId = await this.readProducts()
        if (!filtrarId.find(product => product.id === id)) {
            console.log("No existe el producto")
        } else {
            console.log(filtrarId.find(product => product.id === id))
        }

    }


    // borrar producto por ID
    deleteProdutcsById = async (id) => {
        let filtrarId = await this.readProducts()
        let filter = filtrarId.filter(products => products.id != id)

        //reescribe el archivo
        await fs.writeFile(this.path, JSON.stringify(filter))

        console.log("PRODUCTO ELIMINADO")

    }

    // actualizar un productro

    updateProducts = async ({ id, ...producto }) => {
        await this.deleteProdutcsById(id)

        //leer producto eliminado
        let productEliminado = await this.readProducts()

        let prductoModificadido = [
            { ...producto, id }, ...productEliminado]
        await fs.writeFile(this.path, JSON.stringify(prductoModificadido))
    }

}




//ejecucion
//const productos = new ProductManager


//Envio de parametros
/*productos.addProduct("Producto1", "Descripcion1", 2000, "Foto1", "code01", 100)
productos.addProduct("Producto2", "Descripcion2", 1000, "Foto2", "code02", 90)
productos.addProduct("Producto3", "Descripcion3", 3000, "Foto3", "code03", 150)
productos.addProduct("Producto4", "Descripcion4", 5000, "Foto4", "code04", 150)
productos.addProduct("Producto5", "Descripcion5", 4000, "Foto5", "code05", 150)
productos.addProduct("Producto6", "Descripcion6", 6000, "Foto6", "code06", 150)
productos.addProduct("Producto7", "Descripcion7", 7000, "Foto7", "code07", 150)
productos.addProduct("Producto8", "Descripcion8", 8000, "Foto8", "code08", 150)
productos.addProduct("Producto9", "Descripcion9", 1500, "Foto9", "code09", 150)
productos.addProduct("Producto10", "Descripcion10", 3400, "Foto10", "code10", 150)*/

//TODOS LOS PRODUCTOS
//productos.getProducts()

//FILTRAR POR ID
//productos.getProductsById(2)

//BORRAR POR ID
//productos.deleteProdutcsById(2)

/*productos.updateProducts({
    title: 'Producto1',
    description: 'Descripcion1',
    price: 5000,
    imagen: 'Foto1',
    code: 'code01',
    stock: 100,
    id: 3
})*/