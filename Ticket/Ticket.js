import { CargarCartelera } from "../Services/GetFunciones.js";
import { CargarPelicula } from "../Services/GetPeliculas.js";
import { CapacidadDisponible, ComprarTicket } from "../Services/GetTickets.js";
import { MapeoAnuncioHorario } from "./Mapeo/MapeoTicket.JS";
import { MapeoFilas } from "./Mapeo/MapeoTicket.JS";
import { MapeoColumnas } from "./Mapeo/MapeoTicket.JS";
import { MapeoPoster,MapeoTiempo } from "./Mapeo/MapeoTicket.JS";

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
        return MapeoTiempo(fecha);
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

async function MostrarHorarios(fecha){
    const fechaLimpia = fecha.replace(/[\n\r\s]+/g, '').trim();    
    if(fechaLimpia.length <= 5){
        let anuncio = document.querySelector(".Anuncio-Horario");
        anuncio.innerHTML = MapeoAnuncioHorario();
        let conjunto = new Set();
        let contenedor = document.querySelector(".Mostrar-Horarios");
        let nombre = document.querySelector(".Poster").id;
        let funciones = await CargarCartelera(nombre,"",fechaLimpia);
        let funcionesMapeadas = funciones.map( funcion => {
            if(!conjunto.has(funcion.horario)){
                conjunto.add(funcion.horario);
                return MapeoTiempo(funcion.horario);
            }
        }).join("");
        contenedor.innerHTML = funcionesMapeadas;
        contenedor.addEventListener("click", (e) => {
            let elementoClicado = e.target;
            FuncionesByHorario(funciones, elementoClicado.textContent);
        });
    }
}

async function FuncionesByHorario(funciones, horario) {
    const horarioLimpio = horario.replace(/[\n\r\s]+/g, '').trim(); 
    if(horarioLimpio.length <= 5){
    let contenedor = document.getElementById("Contenedor-Funciones");
    contenedor.innerHTML = MapeoColumnas();
    let tabla = document.getElementById("Datos-Funciones");
    let Horariosmapeados = await Promise.all(funciones.map(async funcion => {
        if(funcion.horario == horarioLimpio){
            const capacidad = await CapacidadDisponible(funcion.funcionId);
            return MapeoFilas(funcion.funcionId,funcion.sala.nombre,capacidad.cantidad);
        }        
    }));
    tabla.innerHTML = Horariosmapeados.join("");
    tabla.scrollIntoView({ behavior: "smooth" });
    }
}

async function ComprarEntradas(id,usuario,cantidad){
    let capacidad = await CapacidadDisponible(id);
    if(capacidad.cantidad<cantidad){
        document.getElementById("cantidad-entradas").setCustomValidity('Se excede el límite de entradas disponibles');
        document.querySelector(".formulario-modal").reportValidity();
    }
    else{
        // ComprarTicket(id,usuario,cantidad)
        alert(id);
        alert(usuario);
        alert(cantidad);
    }
}

const EventoFunciones = document.querySelector(".Mostrar-Fechas");
EventoFunciones.addEventListener( "click", (e) => {
    let elementoClicado = e.target;
    MostrarHorarios(elementoClicado.textContent);
});

const cantidad = document.getElementById("cantidad-entradas");
cantidad.addEventListener( "change", () => {
    const precio= document.getElementById("precio-entrada").value;
    const precioTotal = document.getElementById("calcular-monto");    
    if (precio * cantidad.value>0) {
        precioTotal.value = precio * cantidad.value;
    }
    else{
        precioTotal.value = 0;
    }
});

const CompraTicket = document.getElementById("Compra-Ticket");
CompraTicket.addEventListener("click", () => {
    const usuario = document.getElementById("usuario").value;
    const cantidad = document.getElementById("cantidad-entradas").value;
    if(usuario.length == 0){
        document.querySelector(".formulario-modal").reportValidity();
    }
        
    else if(cantidad < 1){
        document.getElementById("cantidad-entradas").setCustomValidity('La cantidad de entradas a comprar debe ser mayor a 0');
        document.querySelector(".formulario-modal").reportValidity();
    }

    else if(cantidad.length <= 0){
        document.getElementById("cantidad-entradas").setCustomValidity('Ingresa cuantas entradas desea comprar');
        document.querySelector(".formulario-modal").reportValidity();
    }
    
    else{
        let id = document.querySelector(".Boton-Ticket").id;
        ComprarEntradas(id,usuario,cantidad);
    }
});
// function OrdenarFechas(contenedor){
//Ordenar por fecha y horario
// }
