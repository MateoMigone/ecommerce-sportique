const containerTable = document.querySelector("tbody");
const containerCantidadProductosAgregados =
  document.querySelector(".titulo-carrito");
const containerValorTotal = document.querySelector(".contenedor-total div");
const contenedorCarritoVacio = document.querySelector(
  "div.contenedor-carrito-vacio"
);

function retornoProductoTablaHTML({ titulo, precio, id } = producto) {
  return `<tr>
      <td>${id}</td>
      <td>${titulo}</td>
      <td>$ ${precio}</td>
      <td><i class="fa-solid fa-trash" id="${id}"></i></td>
    </tr>`;
}

function retornoCardCarritoVacio() {
  return `<div class="card-carrito-vacio">
  <h5>Tu carrito de compras está vacío</h5>
  <p>Agrega productos a tu carrito para comenzar a comprar.</p>
  <a href="index.html"
    >Explorar productos <i class="fa-solid fa-shop"></i
  ></a>
</div>`;
}

function calcularTotalCarrito() {
  let total = 0;
  carritoProductos.forEach((producto) => {
    total += producto.precio;
  });
  return total;
}

containerCantidadProductosAgregados.innerHTML = `<h2>Este es tu carrito actual de compras</h2>
  <p>Artículos: ${carritoProductos.length}</p>`;

if (carritoProductos.length > 0) {
  containerTable.innerHTML = "";
  carritoProductos.forEach(
    (producto) =>
      (containerTable.innerHTML += retornoProductoTablaHTML(producto))
  );

  activarBotonesEliminar();
  contenedorCarritoVacio.classList.remove("contenedor-carrito-vacio");
} else {
  contenedorCarritoVacio.innerHTML = retornoCardCarritoVacio();
}

containerValorTotal.innerHTML = `<p>TOTAL: $${calcularTotalCarrito()}</p>`; /* <button id="btn-comprar">COMPRAR</button> SAQUE ESTO PORQUE LUEGO CUANDO QUIERA BUSCAR EL BOTON CON QUERYSELECTOR NO LO VA A ENCONTRAR */

function activarBotonesEliminar() {
  const botones = document.querySelectorAll("td i");
  for (boton of botones) {
    boton.addEventListener("click", (e) => {
      const encontrado = carritoProductos.findIndex(
        (producto) => producto.id === parseInt(e.target.id)
      );
      const productoEliminado = carritoProductos.splice(encontrado, 1);
      localStorage.setItem("carrito", JSON.stringify(carritoProductos));

      setTimeout(() => {
        location.reload();
      }, 3600);

      Toastify({
        text: `Eliminando ${productoEliminado[0].titulo} del carrito...`,
        gravity: "bottom",
        duration: 3500,
        style: {
          background: "linear-gradient(to right, #c93d46, #ff1424)",
        },
      }).showToast();
    });
  }
}

const botonComprar = document.querySelector("button#btn-comprar");
botonComprar.addEventListener("click", () => {
  if (carritoProductos.length === 0) {
    Swal.fire(
      "Ups, no se pudo realizar tu compra!",
      "Para realizar una compra debes tener algun producto en tu carrito.",
      "error"
    );
  } else {
    Swal.fire({
      title: "Estás seguro que quieres realizar la compra?",
      text: `Precio total: $${calcularTotalCarrito()}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Pagar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        carritoProductos.splice(0, carritoProductos.length);
        localStorage.setItem("carrito", JSON.stringify(carritoProductos));
        Swal.fire(
          "Tu compra se realizó con éxito!",
          "Estarás recibiendo tu pedido entre 1 y 2 semanas.",
          "success"
        ).then((result) => {
          setTimeout(() => result && location.reload(), 200);
        });
      }
    });
  }
});
