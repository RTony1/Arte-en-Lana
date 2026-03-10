const chompas = [
    {
        id: 1,
        nombre: "Inti Capucha Rojo",
        precio: 23,
        imagenP: "imagenes/Inti Capucha Rojo.jpeg",
        imagenes: [
            "imagenes/Inti Capucha Rojo.jpeg",
            "imagenes/Inti Capucha Negro.jpeg",
            "imagenes/Inti Capucha Azul.jpeg"
        ],
        tallas: ["S", "P", "M", "G"],
        colores: ["Rojo", "Verde", "Azul", "Amarillo", "Naranja"],
        descripcion:
        `Chompas Inti Capucha, con cierre, capucha y bolsillitos. Diseños masculinos con estilo.
            
        Medidas:
        ancho: 50cms
        largo: 60cms
        manga (desde la unión): 50cms
        manga completa: 68cms

        Las chompas están elaboradas con un mix de alpaca y acrílico como para que no pique, son suavecitas, el hilado se llama alpacril.
        `,
        stock: 10,
    },
    {
        id: 2,
        nombre: 'Inti "S-M" Azul',
        precio: 25,
        imagenP: "imagenes/Inti S-M Azul.jpeg",
        imagenes: [
            "imagenes/Inti S-M Azul.jpeg",
            "imagenes/Inti S-M Blanco.jpeg",
            "imagenes/Inti S-M Gris.jpeg"
        ],
        tallas: ["S", "M", "G"],
        colores: ["Rojo", "Verde"],
        descripcion:
        `El diseño Inti es un clásico y uno de los diseños mas apreciados.
        Las chompas están elaboradas con un mix de alpaca y acrílico como para que no pique, son suavecitas, el hilado se llama alpacril.
        `,
        stock: 4,
    },
    {
        id: 3,
        nombre: "Chompa Nadiveña Blanco",
        precio: 25,
        imagenP: "imagenes/Chompa Navideña Blanco.jpeg",
        imagenes: [
            "imagenes/Chompa Navideña Blanco.jpeg",
            "imagenes/Chompa Navideña Gris Oscuro.jpeg",
            "imagenes/Chompa Navideña Rojo.jpeg",
            "imagenes/Chompa Navideña Azul Claro.jpeg"
        ],
        tallas: ["S", "M", "G"],
        colores: ["Rojo", "Verde"],
        descripcion:
        `Una chompa ideal para la temporada navideña, son suaves y amigables con la piel, ademas cuentan con pretina en cintura y puños por lo cual se amolda al cuerpo.`,
        stock: 4,
    },
];

const contenedor = document.getElementById("lista-chompas");
if (contenedor) {
    chompas.forEach(chompa => {
    contenedor.innerHTML += `
    <div class="cuadros-chompas">

        <a class="chompa-imagen" href="compra.html?id=${chompa.id}">
            <img src="${chompa.imagenP}" alt="${chompa.nombre}">
        </a>

        <p class="chompa-nombre">${chompa.nombre}</p>
        <p class="chompa-precio">S/${chompa.precio}</p>

        <button class="btn-carrito" data-id="${chompa.id}">
            Añadir al carrito
        </button>

        <a class="btn-personalizar" href="compra.html?id=${chompa.id}">
            Personalizar
        </a>

    </div>
    `;
    })
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const chompa = chompas.find(c => c.id == id);

if (chompa) {
  document.querySelector(".compra-nombre").textContent = chompa.nombre;
  document.querySelector(".compra-precio").textContent = "S/" + chompa.precio;
  document.querySelector(".descripcion").textContent = chompa.descripcion;
}

const imagenPrincipal = document.getElementById("imagen-principal");
if (imagenPrincipal && chompa) {
  imagenPrincipal.src = chompa.imagenP || chompa.imagenes[0];
};

const fotos = document.getElementById("fotos");

if (fotos && chompa && imagenPrincipal) {
  fotos.innerHTML = "";

  chompa.imagenes.forEach(imagen => {
    const div = document.createElement("div");
    div.className = "chompa-foto";

    const img = document.createElement("img");
    img.src = imagen;

    img.addEventListener("click", () => {
      imagenPrincipal.src = imagen;
      document.querySelectorAll(".chompa-foto img")
        .forEach(i => i.classList.remove("activa"));

    img.classList.add("activa");
    });

    div.appendChild(img);
    fotos.appendChild(div);
  });
};

/* Tallas */
const tallas = document.querySelector(".tallas");
let tallaElegida = null;
if (chompa) {
    tallaElegida = chompa.tallas[0];
}

if (tallas && chompa) {
    tallas.innerHTML = "";
    chompa.tallas.forEach(talla => {
        const div = document.createElement("div");
        div.className = "talla";
        div.dataset.talla = talla;

        const p = document.createElement("p");
        p.textContent = talla;

        div.addEventListener("click", () => {
            document.querySelectorAll(".talla p")
                .forEach(t => t.classList.remove("seleccionada"));
            document.querySelectorAll(".talla")
                .forEach(t => t.classList.remove("seleccionada"));
        div.classList.add("seleccionada");
        p.classList.add("seleccionada");
        tallaElegida = div.dataset.talla;
        });
        
        div.appendChild(p);
        tallas.appendChild(div);
    });
};

/* ==================
    COLORES
================== */
const colores = document.querySelector(".colores");
let colorElegido = null;
if (chompa){
    colorElegido = chompa.colores[0];
}

if (colores && chompa) {
    colores.innerHTML = "";
    chompa.colores.forEach(color => {
        const div = document.createElement("div");
        div.className = "color";
        div.dataset.color = color;

        const p = document.createElement("p");
        p.textContent = color;

        div.addEventListener("click", () => {
            document.querySelectorAll(".color p")
                .forEach(t => t.classList.remove("seleccionado"));
            document.querySelectorAll(".color")
                .forEach(t => t.classList.remove("seleccionado"));
        div.classList.add("seleccionado");
        p.classList.add("seleccionado");
        colorElegido = div.dataset.color;
        });
        
        div.appendChild(p);
        colores.appendChild(div);
    });
};

/* =========================
   CANTIDAD (PAGINA PRODUCTO)
========================= */
const gruposCantidad = document.querySelectorAll(".cantidad");

gruposCantidad.forEach(grupo => {

    const menos = grupo.querySelector(".cantidad-izquierda");
    const mas = grupo.querySelector(".cantidad-derecha");
    const valor = grupo.querySelector(".cantidad-valor");

    const min = Number(grupo.dataset.min) || 1;
    let max = Number(grupo.dataset.max) || 1;

    if (typeof chompa !== "undefined" && chompa) {
        max = chompa.stock;
        grupo.dataset.max = max;
    }

    let cantidadActual = min;

    menos?.addEventListener("click", () => {
        if (cantidadActual > min) {
            cantidadActual--;
            actualizar();
        }
    });

    mas?.addEventListener("click", () => {
        if (cantidadActual < max) {
            cantidadActual++;
            actualizar();
        }
    });

    function actualizar() {
        if(valor) valor.textContent = cantidadActual;

        menos?.classList.toggle("minimo", cantidadActual === min);
        mas?.classList.toggle("maximo", cantidadActual === max);
    }

    actualizar();

});

/* =========================
   CONTROL DE STOCK
========================= */
const cantidadProducto = document.querySelector(".cantidad");

if (cantidadProducto && typeof chompa !== "undefined") {

    cantidadProducto.dataset.max = chompa.stock;

    const agotado = document.querySelector(".agotado");

    if (agotado) agotado.style.display = "none";

    if (chompa.stock === 0) {
        cantidadProducto.style.display = "none";
        if (agotado) agotado.style.display = "block";
    }

};

/* =========================
   CARRITO
========================= */
const carrito = document.getElementById("carrito");

function mostrarCarrito(){
    carrito?.classList.add("activo");
    renderCarrito()
}

function ocultarCarrito(){
    carrito?.classList.remove("activo");
}

let carritoProductos = document.getElementById("carrito-productos");

let carritoItems = [];

/* =========================
   AGREGAR PRODUCTO
========================= */
document.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-carrito")) {

        const id = Number(e.target.dataset.id);

        agregarProducto(id);

    }

});

function agregarProducto(id){

    const producto = chompas.find(c => c.id === id);

    if(!producto) return;

    const item = carritoItems.find(p => p.id === id);

    if(item){

        if(item.cantidad < producto.stock){
            item.cantidad++;
        }

    }else{

        carritoItems.push({id:id, cantidad:1});
        mostrarCarrito();

    }

    renderCarrito();

};

/* =========================
   RENDER CARRITO
========================= */
const carritoTotal = document.getElementById("carrito-total");

function renderCarrito(){

    carritoProductos.innerHTML = "";

    let total = 0;
    let pagar = document.querySelector(".carrito-footer");
    pagar.style.display = carritoItems.length === 0 ? "none" : "block";

    if(carritoItems.length === 0){

        carritoProductos.innerHTML = `
        <p class="carrito-vacio">
            No hay productos en el carrito
        </p>
        `;

        carritoTotal.textContent = "";
        
        return;
    }

    carritoItems.forEach(item => {

        const producto = chompas.find(c => c.id === item.id);

        const subtotal = producto.precio * item.cantidad;

        total += subtotal;

        if(!producto) return;

        carritoProductos.innerHTML += `
        <div class="carrito-producto" data-id="${producto.id}">
            <img src="${producto.imagenP}" alt="${producto.nombre}">

            <div class="carrito-producto-descripcion">

                <p class="carrito-producto-nombre">${producto.nombre}</p>
                <p class="carrito-producto-precio">S/ ${producto.precio}</p>
                <p class="carrito-producto-talla-y-color">${producto.tallas[0].toUpperCase()} / ${producto.colores[0].toUpperCase()}</p>

                <div class="carrito-cantidad-quitar">

                    <div class="carrito-cantidad">

                        <div class="cantidad-izquierda ${item.cantidad === 1 ? "minimo" : ""}">
                            <p>-</p>
                        </div>

                        <div class="bloque-cantidad">
                            <p class="cantidad-valor">${item.cantidad}</p>
                        </div>

                        <div class="cantidad-derecha ${item.cantidad === producto.stock ? "maximo" : ""}">
                            <p>+</p>
                        </div>

                    </div>
                    
                    <a class="carrito-quitar">Quitar</a>

                </div>

            </div>

        </div>
        `;
    });

    carritoTotal.textContent = `Total: S/ ${total.toFixed(2)}`;
}

/* =========================
   EVENTOS DEL CARRITO
========================= */
if(carritoProductos){

    carritoProductos.addEventListener("click", (e) => {

        const productoHTML = e.target.closest(".carrito-producto");

        if(!productoHTML) return;

        const id = Number(productoHTML.dataset.id);

        const item = carritoItems.find(p => p.id === id);

        const producto = chompas.find(c => c.id === id);


        /* QUITAR PRODUCTO */
        if(e.target.classList.contains("carrito-quitar")){

            carritoItems = carritoItems.filter(p => p.id !== id);

            renderCarrito();

        }


        /* SUMAR */
        if(e.target.closest(".cantidad-derecha")){

            if(item.cantidad < producto.stock){
                item.cantidad++;
            }

            renderCarrito();

        }


        /* RESTAR */
        if(e.target.closest(".cantidad-izquierda")){

            if(item.cantidad > 1){
                item.cantidad--;
            }

            renderCarrito();

        }

    });

}

/* Barra de busqueda */
let barra_busqueda = document.getElementById("barra_busqueda");
barra_busqueda.style.display = "none";

let titulo = document.getElementById("titulo");

let equis = document.getElementById("equis_barra");
equis_barra.style.display = "none";

let lupa = document.getElementById("lupa");

let mobileP = window.matchMedia("(max-width: 600px)");
let compuP = window.matchMedia("(max-width: 750px)");
let compuM = window.matchMedia("(max-width: 1000px)");
let compuG = window.matchMedia("(max-width: 1600px)");

function mostrarBarra(){
    if (barra_busqueda.style.display == "none"){
        barra_busqueda.style.display = "block";
        lupa.style.display = "none";
        equis_barra.style.display = "block";
        
        if (mobileP.matches) {
            titulo.style.display = "none";
        } else if (compuP.matches) {
            titulo.style.left = "27%";
        } else if (compuM.matches) {
            titulo.style.left = "33%";
        } else if (compuG.matches) {
            titulo.style.left = "40%";
        }
    }
};

function ocultarBarra(){
    if (lupa.style.display == "none"){
        barra_busqueda.style.display = "none";
        equis_barra.style.display = "none";
        lupa.style.display = "block";

        titulo.style.display = "block";

        if (compuP.matches) {
            titulo.style.left = "50%";
        } else if (compuM.matches){
            titulo.style.left = "50%";
        } else if (compuG.matches){
            titulo.style.left = "50%";
        }
    }
};

/* Detalles y Devoluciones*/
let bloque = document.querySelector(".detalles-envios-bloques");

let boton_detalles = document.getElementById("toggle-detalles");
let contenido_detalles = document.getElementById("detalles");
let icono_detalles = document.getElementById("icono-detalles");

let boton_envios = document.getElementById("toggle-envios");
let contenido_envios = document.getElementById("envios");
let icono_envios = document.getElementById("icono-envios");

let abierto_detalles = false;

if (boton_detalles) {
    boton_detalles.addEventListener("click", () => {
        abierto_detalles = !abierto_detalles;

        if (abierto_detalles) {
            contenido_detalles.style.paddingTop = "1rem";

            contenido_detalles.style.height = contenido_detalles.scrollHeight + 16 + "px";
            icono_detalles.textContent = "−";
        } else {
            contenido_detalles.style.height = "0";
            contenido_detalles.style.paddingTop = "0";
            icono_detalles.textContent = "+";
        }
    })
};

let abierto_envios = false;
if (boton_envios) {
    boton_envios.addEventListener("click", () => {
        abierto_envios = !abierto_envios;

        if (abierto_envios) {
            contenido_envios.style.paddingTop = "1rem";

            contenido_envios.style.height = contenido_envios.scrollHeight + 16 + "px";
            icono_envios.textContent = "−";
        } else {
            contenido_envios.style.height = "0";
            contenido_envios.style.paddingTop = "0";
            icono_envios.textContent = "+";
        }
    })
};

/* Recuperar Contraseña */
let recuperar_contrasena = document.getElementById("recuperar_contrasena");
if (recuperar_contrasena) {
    recuperar_contrasena.style.display = "none";
}

let olvido_contrasena = document.getElementById("olvido-contraseña");
if (olvido_contrasena) {
    function desaparecer(){
        olvido_contrasena.classList.add("invisible");
    }
    function aparecer(){
        olvido_contrasena.classList.remove("invisible");

    }
}

let password = document.getElementById("password");
if (password) {
    password.addEventListener("focus", () => {
        desaparecer(); // cuando entra
    });

    password.addEventListener("blur", () => {
        aparecer(); // cuando sale
    });

    password.addEventListener("input", () => {
        escribiendo(); // mientras escribe (opcional)
    });
}
