import { CargarCartelera } from "../Services/GetFunciones.js";
import { CargarPelicula } from "../Services/GetPeliculas.js";
import { MapeoFilas } from "./Mapeo/MapeoTicket.JS";
import { MapeoColumnas } from "./Mapeo/MapeoTicket.JS";
import { MapeoPoster,MapeoFechas } from "./Mapeo/MapeoTicket.JS";

window.onload = async function ()  {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('Pelicula');
    const Pelicula = await CargarPelicula(id);
    let Poster = await MapeoPoster(Pelicula.poster,Pelicula.titulo);
    let Contenedorposter = document.getElementById("Contenedor-Imagen");
    Contenedorposter.innerHTML = Poster;
    MostrarFechas(Pelicula.funciones);
    let PeliculaReferencia = document.getElementById("Contenedor-Fechas");
    PeliculaReferencia.scrollIntoView({ behavior: "smooth" });
};

function MostrarFechas(funciones){
    let fechas=FiltrarFechas(funciones);
    let fechasMapeadas = fechas.map( fecha => {
        return MapeoFechas(fecha);
    }).join("");
    let MostrarFechas = document.querySelector(".Mostrar-Fechas");
    MostrarFechas.innerHTML = fechasMapeadas;
}

function FiltrarFechas(funcion){
    let contenedor = new Set();
    funcion.forEach(funcion => {
        let fecha = new Date(funcion.fecha);
        let fechaArgentina = fecha.toLocaleDateString('es-AR');
        const fechayMes = fechaArgentina.substring(0, fechaArgentina.lastIndexOf('/'));
        if(!contenedor.has(fechayMes)){
            contenedor.add(fechayMes);
        }   
    });
    return Array.from(contenedor);
}

async function MostrarFunciones(fecha){
    const fechaLimpia = fecha.replace(/[\n\r\s]+/g, '').trim();    
    if(fechaLimpia.length == 5){
        let contenedor = document.getElementById("Contenedor-Funciones");
        let nombre = document.querySelector(".Poster").id;
        let funciones = await CargarCartelera(nombre,"",fechaLimpia);
        contenedor.innerHTML = MapeoColumnas();
        let tabla = document.getElementById("Datos-Funciones");
        let funcionesMapeadas = funciones.map( funcion => {
            let FormatoFecha = new Date(funcion.fecha);
            let dia = FormatoFecha.toLocaleDateString('es-AR', { weekday: 'long' });
            let fecha = FormatoFecha.toLocaleDateString('es-AR', {day: 'numeric', month: 'long' });
            return MapeoFilas(fecha,dia, funcion.horario, funcion.sala.nombre, funcion.sala.capacidad);
        }).join("");
        tabla.innerHTML = funcionesMapeadas;

    }
}


const EventoFunciones = document.querySelector(".Mostrar-Fechas");
EventoFunciones.addEventListener( "click", (e) => {
    e.preventDefault();
    let elementoClicado = e.target;
    MostrarFunciones(elementoClicado.textContent);
    let funcionesReferenciadas = document.getElementById("Datos-Funciones");
    funcionesReferenciadas.scrollIntoView({ behavior: "smooth" });
});

// function OrdenarFechas(contenedor){

// }
