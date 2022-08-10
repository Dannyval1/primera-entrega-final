import express from "express";
const { Router } = express;

const app = express();
const routerProductos = Router();
const routerCarrito = Router();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let productos = [];

/*** 
** Métodos relacionados a productos para administradores 
***/
routerProductos.get("/", async (req, res) => {
  res.status(200).json(productos);
});

routerProductos.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no encontrado" });
  const productId =
    productos.find((prod) => prod.id === id) ||
    res.json({ error: "Producto no encontrado" });
  res.send(productId);
});

routerProductos.post("/", async (req, res) => {
  if (req.body.producto) {
    productos.push(req.body.producto);
    productos.forEach((producto, index) => {
      producto.id = index + 1;
    });
    res.status(201).json({ Agregado: req.body.producto });
  }
  if (!req.body.producto) {
    const priceNew = Number(req.body.productPrice);
    const newProduct = {
      title: req.body.productName,
      price: priceNew,
      thumbnail: req.body.productUrl,
    };
    productos.push(newProduct);
    productos.forEach((producto, index) => {
      producto.id = index + 1;
    });
    res.status(201).json({ Agregado: newProduct });
  }
});

routerProductos.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no existe para ser editado" });
  const priceNew = Number(req.body.productPrice);
  const newProduct = {
    title: req.body.productName,
    price: priceNew,
    thumbnail: req.body.productUrl,
  };
  productos[id - 1] = newProduct;
  productos.forEach((producto, index) => {
    producto.id = index + 1;
  });
  res.status(201).json({ EDITADO: newProduct });
});

routerProductos.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no encontrado para eliminar" });
  const productIdDelete = productos.filter((prod) => prod.id !== id);
  productos = productIdDelete;
  res.status(200).json(productIdDelete);
});

app.use("/api/productos", routerProductos);
/********** ------- *********/


/*** 
** Métodos relacionados al carrito 
***/
routerCarrito.get("/", async (req, res) => {
  res.status(200).json(productos);
});

routerCarrito.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no encontrado" });
  const productId =
    productos.find((prod) => prod.id === id) ||
    res.json({ error: "Producto no encontrado" });
  res.send(productId);
});

routerCarrito.post("/", async (req, res) => {
  if (req.body.producto) {
    productos.push(req.body.producto);
    productos.forEach((producto, index) => {
      producto.id = index + 1;
    });
    res.status(201).json({ Agregado: req.body.producto });
  }
  if (!req.body.producto) {
    const priceNew = Number(req.body.productPrice);
    const newProduct = {
      title: req.body.productName,
      price: priceNew,
      thumbnail: req.body.productUrl,
    };
    productos.push(newProduct);
    productos.forEach((producto, index) => {
      producto.id = index + 1;
    });
    res.status(201).json({ Agregado: newProduct });
  }
});

routerCarrito.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no existe para ser editado" });
  const priceNew = Number(req.body.productPrice);
  const newProduct = {
    title: req.body.productName,
    price: priceNew,
    thumbnail: req.body.productUrl,
  };
  productos[id - 1] = newProduct;
  productos.forEach((producto, index) => {
    producto.id = index + 1;
  });
  res.status(201).json({ EDITADO: newProduct });
});

routerCarrito.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no encontrado para eliminar" });
  const productIdDelete = productos.filter((prod) => prod.id !== id);
  productos = productIdDelete;
  res.status(200).json(productIdDelete);
});

app.use("/api/carrito", routerCarrito);
/********** ------- *********/

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
