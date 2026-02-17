/* Barra de busqueda */
let barra_busqueda = document.getElementById("barra_busqueda");
barra_busqueda.style.display = "none";

let titulo = document.getElementById("titulo");

let equis = document.getElementById("equis_barra");
equis_barra.style.display = "none";

let lupa = document.getElementById("lupa");

const mobileP = window.matchMedia("(max-width: 500px)");

function mostrarBarra(){
    if (barra_busqueda.style.display == "none"){
        barra_busqueda.style.display = "block";
        lupa.style.display = "none";
        equis_barra.style.display = "block";
        
        if (mobileP.matches) {
            titulo.style.display = "none";
        }
    }
};

function ocultarBarra(){
    if (lupa.style.display == "none"){
        barra_busqueda.style.display = "none";
        equis_barra.style.display = "none";
        lupa.style.display = "block";

        titulo.style.display = "block";
    }
};

/* Carrito */
const carrito = document.getElementById("carrito");

function mostrarCarrito(){
    carrito.classList.add("activo");
};
function ocultarCarrito(){
    carrito.classList.remove("activo");
};

/* Tallas */
let grupo1 = document.getElementById("grupo_talla1");
grupo1.style.display = "none";

let grupo2 = document.getElementById("grupo_talla2");
grupo2.style.display = "none";

let grupo3 = document.getElementById("grupo_talla3");
grupo3.style.display = "flex";

let grupo4 = document.getElementById("grupo_talla4");
grupo4.style.display = "none";

const tallas = document.querySelectorAll(".talla");

tallas.forEach(talla => {
   talla.addEventListener("click", () => {
        tallaSeleccionada(talla.dataset.talla);
    });
});

function tallaSeleccionada(valor) {

    grupo1.style.display = "none";
    grupo2.style.display = "none";
    grupo3.style.display = "none";
    grupo4.style.display = "none";

    if (valor === "S") {
        grupo1.style.display = "flex";
    } 
    else if (valor === "P") {
        grupo2.style.display = "flex";
    } 
    else if (valor === "M") {
        grupo3.style.display = "flex";
    } 
    else if (valor === "G") {
        grupo4.style.display = "flex";
    }
}

/* Colores */
let color1 = document.getElementById("grupo_color1");
color1.style.display = "none";

let color2 = document.getElementById("grupo_color2");
color2.style.display = "none";

let color3 = document.getElementById("grupo_color3");
color3.style.display = "flex";

let color4 = document.getElementById("grupo_color4");
color4.style.display = "none";

const colores = document.querySelectorAll(".color");

colores.forEach(color => {
   color.addEventListener("click", () => {
        colorSeleccionado(color.dataset.color);
    });
});

function colorSeleccionado(valor) {

    color1.style.display = "none";
    color2.style.display = "none";
    color3.style.display = "none";
    color4.style.display = "none";

    if (valor === "Amarillo") {
        color1.style.display = "flex";
    } 
    else if (valor === "Verde") {
        color2.style.display = "flex";
    } 
    else if (valor === "Rojo") {
        color3.style.display = "flex";
    } 
    else if (valor === "Azul") {
        color4.style.display = "flex";
    }
}

/* Cantidad */
document.querySelectorAll(".cantidad").forEach(grupo => {

    const menos = grupo.querySelector(".cantidad-izquierda");
    const mas = grupo.querySelector(".cantidad-derecha");
    const valor = grupo.querySelector(".cantidad-valor");

    const min = Number(grupo.dataset.min);
    const max = Number(grupo.dataset.max);

    let cantidad = min;

    menos.addEventListener("click", () => {
        if (cantidad > min) {
            cantidad--;
            actualizar();
        }
    });

    mas.addEventListener("click", () => {
        if (cantidad < max) {
            cantidad++;
            actualizar();
        }
    });

    function actualizar() {
        valor.textContent = cantidad;

        // estilos dinámicos
        menos.classList.toggle("minimo", cantidad === min);
        mas.classList.toggle("maximo", cantidad === max);
    }

    actualizar();
});
