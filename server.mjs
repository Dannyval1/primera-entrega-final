import express from "express";
const { Router } = express;

const app = express();
const routerProductos = Router();
const routerCarrito = Router();
const PORT = 8080;

let administrator = true;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//requires productos
const productosGeneral = require("./routes/productos");
const carritoGeneral = require("./routes/carrito");

let productos = [];

/***
 ** Métodos relacionados a productos para administradores
 ***/
routerProductos.get("/", async (req, res) => {
  const productos = productosGeneral.getProductos();
  res.status(200).json(productos);
});

routerProductos.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const producto = productosGeneral.getProducto(id);
  res.status(200).json(producto);
});

routerProductos.post("/", async (req, res) => {
  const priceNew = Number(req.body.precio);
  const newProduct = {
    timestamp: new date().getTime(),
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    codigo: req.body.codigo,
    foto: req.body.foto,
    precio: priceNew,
    stock: req.body.stock,
  };
  const addedProduct = productosGeneral.postProducto(newProduct);
  res.status(201).json({
    resultado: "Producto anexado",
    Agregado: addedProduct,
  });
});

routerProductos.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const priceNew = Number(req.body.productPrice);
  const foundProduct = productosGeneral.getProducto(id);
  foundProduct.timestamp = req.query.timestamp;
  foundProduct.nombre = req.query.nombre;
  foundProduct.descripcion = req.query.descripcion;
  foundProduct.codigo = req.query.codigo;
  foundProduct.foto = req.query.foto;
  foundProduct.precio = priceNew;
  foundProduct.stock = req.query.stock;

  res.status(201).json({
    result: "Updated product",
    id: req.params.id,
    updatedProduct: foundProduct,
  });
});

routerProductos.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedProduct = productosGeneral.deleteProducto(id);
  res.status(200).json({
    result: "Producto Eliminado",
    id: req.params.id,
    productList: deletedProduct,
  });
});
/********** ------- *********/

/***
 ** Métodos relacionados al carrito
 ***/
routerCarrito.get("/:id/productos", async (req, res) => {
  const id = Number(req.params.id);
  const car = carritoGeneral.getCarrito(id);
  res.send(car);
});

routerCarrito.post("/:id/productos", async (req, res) => {
  const idCar = Number(req.params.id);

  addCarritoProduct = {
    timestamp: Date.now(),
    nombre: req.query.nombre,
    descripcion: req.query.descripcion,
    codigo: req.query.codigo,
    foto: req.query.foto,
    precio: req.query.precio,
    stock: req.query.stock,
  };

  const carrito = carritoGeneral.addCarritoProductos(idCar, addCarritoProduct);

  res.status(201).json({
    result: "Se anexa producto al carrito",
    NuevoCarrito: carrito,
  });
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  const idCar = Number(req.params.id);
  const idCarProd = Number(req.params.id_prod);
  const prodCarDeleted = carritoGeneral.deleteCarritoProducto(idCar, idCarProd);
  res.status(200).json({
      result: 'Producto borrado del carrito',
      id: req.params.id,
      newProductList: prodCarDeleted,
  });
});

routerCarrito.post('/', (req,res) => {
  const car = {
      timestamp:  Date.now(),
  };
  const newCar = carritoGeneral.postCarrito(car);
  res.status(201).json({
      result: 'Carrito Agregado',
      Nuevo_Car: newCar
  });
});

routerCarrito.delete('/:id', (req,res) => {
  const id = Number(req.params.id);
  const deletedCar = carritoGeneral.deleteCarrito(id);
  res.status(200).json({
      result: 'Carrito Borrado',
      id: req.params.id,
      newList: deletedCar,
  });
});
/********** ------- *********/


/*** VALIDACIÓN DE USUARIO ***/
if(administrator){
  app.use('/api/productos', routerProductos);
  app.use('/api/carrito', routerCarrito);
} else {
  res.send({error: -1, descripcion: 'El usuario no tiene permisos para acceder a esta información'});
}

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
