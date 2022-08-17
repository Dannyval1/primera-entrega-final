let carrito = [];
let prodCarrito = [];

const postCarrito = (objCarrito) => {
    if(carrito.length == 0){
        objCarrito.id = 1;
    }else{
        let id = carrito[carrito.length-1].id
        objCarrito.id = id + 1;
    }
    carrito.push(objCarrito);

    return carrito;
}

const deleteCarrito = (id) => {
    const carritoNuevo = carrito.filter(carProd => carProd.id !== id);
    carrito = carritoNuevo;
    return carrito;
}

const getCarrito = (id) => {
    return carrito.find(car => car.id === id) || { error: 'carrito no encontrado' };
}

const addCarritoProductos = (id, productoCarrito) => {
    let carritoEncontrado = carrito.find(car => car.id === id);
    carritoEncontrado.productos = prodCarrito;

    if (prodCarrito.length == 0){
        productoCarrito.id = 1;
    } else {
        let id = prodCarrito[prodCarrito.length-1].id
        productoCarrito.id = id + 1;
    }
    prodCarrito.push(productoCarrito);

    return carrito;
}

const deleteCarritoProducto = (idCarrito, idProducto) => {
    let carritoFind = carrito.find(carrito => carrito.id === idCarrito);
    let carritoFilter = carritoFind.productos.filter(carritoProd => carritoProd.id !== idProducto);
    prodCarrito = carritoFilter;

    return prodCarrito;
}

module.exports = {
    carrito,
    prodCarrito,
    postCarrito,
    deleteCarrito,
    getCarrito,
    addCarritoProductos,
    deleteCarritoProducto,
}