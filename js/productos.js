function recuperarCarrito() {
  return localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito"))
    : [];
}

const carritoProductos = recuperarCarrito();

const URL = "js/productos.json";

const productos = [];
