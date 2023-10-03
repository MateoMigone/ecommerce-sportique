const imgCarrito = document.querySelector("header i#carrito");
const containerCards = document.getElementById("contenedor-cards");
const inputFiltro = document.getElementById("filtro");
const botonFiltro = document.getElementById("boton-filtro");

imgCarrito.addEventListener("mousemove", () => {
  imgCarrito.title = "Ir al carrito";
});

function retornoCardHTML({ img, titulo, precio, id } = producto) {
  return `<div class="card">
                <img src=${img} alt=${img}/>
                <div>
                    <h5>${titulo}</h5>
                    <h5>$ ${precio}</h5>
                    <button id=${id}>Agregar al carrito</button>
                </div>
            </div>`;
}

function retornoCardError() {
  return `<div class="card-error">
              <i class="fa-solid fa-triangle-exclamation"></i>
              <h2>Houston, tenemos un problema.</h2>
              <h3>No encontramos productos para mostrar.</h3>
              <h4>Intenta de nuevo en unos instantes...</h4>
          </div>`;
}

function cargarProductos() {
  containerCards.innerHTML = "";
  productos.forEach(
    (producto) => (containerCards.innerHTML += retornoCardHTML(producto))
  );
  activarBotonesCards(productos);
  botonFiltro.addEventListener("click", () => {
    const productosFiltrados = productos.filter((producto) =>
      producto.titulo.toUpperCase().includes(inputFiltro.value.toUpperCase())
    );
    containerCards.innerHTML = "";
    productosFiltrados.forEach(
      (producto) => (containerCards.innerHTML += retornoCardHTML(producto))
    );
    activarBotonesCards(productosFiltrados);
  });
}

function activarBotonesCards(arrProductos) {
  const botones = document.querySelectorAll(".card button");
  for (boton of botones) {
    boton.addEventListener("click", (e) => {
      const encontrado = arrProductos.find(
        (producto) => producto.id === parseInt(e.target.id)
      );
      carritoProductos.push(encontrado);
      localStorage.setItem("carrito", JSON.stringify(carritoProductos));
      Toastify({
        text: `Se agregó ${encontrado.titulo} al carrito!`,
        gravity: "bottom",
        duration: 3000,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    });
  }
}

async function obtenerProductos() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    productos.push(...data);
    cargarProductos();
  } catch (error) {
    containerCards.innerHTML = retornoCardError();
    const filtro = document.querySelector("div.contenedor-filtro");
    filtro.innerHTML = "";
  }
}

obtenerProductos();
