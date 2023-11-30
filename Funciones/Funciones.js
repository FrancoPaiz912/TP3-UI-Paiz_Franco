import { mapeofunciones, mensajeAlternativo } from "./mapeo/MapeoFunciones.JS";
import { cargarCartelera } from "../services/getFunciones.JS";
import { busquedaPelicula } from "../Pelicula/Pelicula.JS";


window.onload = async function() {
     carteleraCompleta();
};

async function carteleraCompleta(){
    let funciones = await cargarCartelera("","",""); 
    let indices = evitarRepeticion(funciones);
    let cartelera = funcionesAMapear(funciones, indices);
    let funcionesMapeadas = mapeofunciones(cartelera);
    mostrarFunciones(funcionesMapeadas); 
}

async function busquedaFiltrada (){
    let funcionesMapeadas;
    const titulo = await document.getElementById("titulo").value;
    let genero = document.getElementById("genero").value; 
    let fecha = document.getElementById("fecha").value;
    if (genero != "") genero = parseInt(genero);
    let result = await cargarCartelera(titulo, genero, fecha);
    if (result.length > 0){
    let indices = evitarRepeticion(result);
    let cartelera = funcionesAMapear(result, indices);
    funcionesMapeadas = mapeofunciones(cartelera);
    }
    else funcionesMapeadas = mensajeAlternativo();
    mostrarFunciones(funcionesMapeadas);
}

const boton = document.getElementById("boton-busqueda");    
boton.addEventListener("click", (e) => {
    e.preventDefault();
    busquedaFiltrada();
    document.getElementById("desplegable-pelicula").innerHTML = "";
    document.querySelector(".funciones").scrollIntoView({ behavior: "smooth" });
});

const seccion =  document.querySelector(".funciones");
seccion.addEventListener("click", (e) => {
    e.preventDefault();
    let elementoClicado = e.target;
    busquedaPelicula(elementoClicado.id);
    let peliculaReferencia = document.getElementById("desplegable-pelicula");
    peliculaReferencia.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".eliminar-filtros") 
.addEventListener( "click", (e) => {
    e.preventDefault();
    carteleraCompleta();
    document.getElementById("desplegable-pelicula").innerHTML = "";
    document.querySelector(".funciones").scrollIntoView({ behavior: "smooth" });
    document.getElementById("titulo").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("fecha").value = "";
});

function evitarRepeticion(funciones){
    const contenedor = new Set();
    funciones.forEach(element => {   
        if(!contenedor.has(element.pelicula.peliculaId)){
            contenedor.add(element.pelicula.peliculaId);
        } 
    });
    return contenedor;
}

function funcionesAMapear(funciones, contenedor){
    let functions = [];
    funciones.forEach(element => {
        if(contenedor.has(element.pelicula.peliculaId)){
            functions.push(element);
            contenedor.delete(element.pelicula.peliculaId);
        }        
    });
    return functions;
}

function mostrarFunciones(funcionesMapeadas){
    seccion.innerHTML = funcionesMapeadas;
}; 

window.addEventListener('scroll', function() {
    var nav = document.querySelector('.sticky-nav');
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });