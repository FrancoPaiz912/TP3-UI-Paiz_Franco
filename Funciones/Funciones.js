import { mapeofunciones, mensajeAlternativo } from "./Mapeo/MapeoFunciones.js";
import { busquedaPelicula } from "../Pelicula/Pelicula.js";
import { cargarCartelera } from "../Services/GetFunciones.js";

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
    const titulo = await document.getElementById("Titulo").value;
    let genero = document.getElementById("Genero").value; 
    let fecha = document.getElementById("Fecha").value;
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

const boton = document.getElementById("BotonBusqueda");    
boton.addEventListener("click", (e) => {
    e.preventDefault();
    busquedaFiltrada();
    document.getElementById("Desplegable-Pelicula").innerHTML = "";
    document.querySelector(".Funciones").scrollIntoView({ behavior: "smooth" });
});

const seccion =  document.querySelector(".Funciones");
seccion.addEventListener("click", (e) => {
    e.preventDefault();
    let elementoClicado = e.target;
    busquedaPelicula(elementoClicado.id);
    let peliculaReferencia = document.getElementById("Desplegable-Pelicula");
    peliculaReferencia.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".EliminarFiltros") 
.addEventListener( "click", (e) => {
    e.preventDefault();
    carteleraCompleta();
    document.getElementById("Desplegable-Pelicula").innerHTML = "";
    document.querySelector(".Funciones").scrollIntoView({ behavior: "smooth" });
    document.getElementById("Titulo").value = "";
    document.getElementById("Genero").value = "";
    document.getElementById("Fecha").value = "";
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