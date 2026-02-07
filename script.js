let barra_busqueda = document.getElementById("barra_busqueda");
barra_busqueda.style.display = "none";

let equis = document.getElementById("equis");
equis.style.display = "none";

let lupa = document.getElementById("lupa");

function mostrarBarra(){
    if (barra_busqueda.style.display == "none"){
        barra_busqueda.style.display = "block";
        lupa.style.display = "none";
        equis.style.display = "block";
    }
};

function ocultarBarra(){
    if (lupa.style.display == "none"){
        barra_busqueda.style.display = "none";
        equis.style.display = "none";
        lupa.style.display = "block";
    }
};