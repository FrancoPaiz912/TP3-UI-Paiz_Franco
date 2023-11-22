import { Mapeofunciones, MensajeAlternativo } from "./Mapeo/MapeoFunciones.js";
import { BusquedaPelicula } from "../Pelicula/Pelicula.js";
import { InformacionPelicula, seccion } from "../html dinamicos/llamados.js";
import { CargarCartelera } from "../Services/GetFunciones.js";

window.onload = async function() {
     CarteleraCompleta();
};

async function CarteleraCompleta(){//Para que al eliminar filtros, no se recargue la página y pueda centrarce en las peliculas
    let funciones = await CargarCartelera("","",""); 
    let indices = EvitarRepeticion(funciones);
    let cartelera = FuncionesAMapear(funciones, indices);
    let funcionesMapeadas = Mapeofunciones(cartelera);
    MostrarFunciones(funcionesMapeadas); 
}

async function BusquedaFiltrada (){
    let funcionesMapeadas;
    const titulo = await document.getElementById("Titulo").value;
    let genero = document.getElementById("Genero").value; 
    let fecha = document.getElementById("Fecha").value;
    if (genero != "") genero = parseInt(genero);
    let result = await CargarCartelera(titulo, genero, fecha);
    if (result.length > 0){
    let indices = EvitarRepeticion(result);
    let cartelera = FuncionesAMapear(result, indices);
    funcionesMapeadas = Mapeofunciones(cartelera);
    }
    else funcionesMapeadas = MensajeAlternativo();
    MostrarFunciones(funcionesMapeadas);
}

const boton = document.getElementById("BotonBusqueda");    
boton.addEventListener("click", (e) => {
    e.preventDefault();
    BusquedaFiltrada();
    document.getElementById("Desplegable-Pelicula").innerHTML = "";
    document.querySelector(".Funciones").scrollIntoView({ behavior: "smooth" });
});

seccion.addEventListener("click", (e) => {
    e.preventDefault();
    let elementoClicado = e.target;
    BusquedaPelicula(elementoClicado.id);
    let PeliculaReferencia = document.getElementById("Desplegable-Pelicula");
    PeliculaReferencia.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".EliminarFiltros") 
.addEventListener( "click", (e) => {
    e.preventDefault();
    CarteleraCompleta();
    document.getElementById("Desplegable-Pelicula").innerHTML = "";
    document.querySelector(".Funciones").scrollIntoView({ behavior: "smooth" });
    document.getElementById("Titulo").value = "";
    document.getElementById("Genero").value = "";
    document.getElementById("Fecha").value = "";
});

function EvitarRepeticion(funciones){
    const contenedor = new Set();
    funciones.forEach(element => {   
        if(!contenedor.has(element.pelicula.peliculaId)){
            contenedor.add(element.pelicula.peliculaId);
        } 
    });
    return contenedor;
}

function FuncionesAMapear(funciones, contenedor){
    let functions = [];
    funciones.forEach(element => {
        if(contenedor.has(element.pelicula.peliculaId)){
            functions.push(element);
            contenedor.delete(element.pelicula.peliculaId);
        }        
    });
    return functions;
}

function MostrarFunciones(funcionesMapeadas){
    seccion.innerHTML = funcionesMapeadas;
}; 