let productos = [];

const getProductos = () => {
    return productos;
}

const getProducto = (id) => {
    return productos.find(prod => prod.id === id) || { error: 'Producto no encontrado' };
}

const postProducto = (product) => {
    const sizeProduct = productos.length;
    if(sizeProduct == 0){
        product.id = 1;
    } else {
        let id = productos[sizeProduct - 1].id
        product.id = id + 1;
    }
    productos.push(product);

    return productos;
}

const deleteProducto = (id) => {
    const productosNuevos = productos.filter(prod => prod.id !== id);
    productos = productosNuevos;
    return productos;
}

module.exports = {
    productos,
    getProductos,
    getProducto,
    postProducto,
    deleteProducto,
}