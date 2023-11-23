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
    let fechasOrdenadas = OrdenarFechas(fechas);
    let fechasMapeadas = fechasOrdenadas.map( fecha => {
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
        let funciones = await CargarCartelera(nombre,"",fechaLimpia); //Para las fechas hago un get de peliculabyid es por eso que le puedo pasar el array de funciones
        let horariosSinRepeticion = FiltrarHorarios(funciones);
        let horarioOrdenado = OrdenarHora(horariosSinRepeticion);
        let funcionesMapeadas = horarioOrdenado.map( funcion => {
            return MapeoTiempo(funcion);
        }).join("");
        contenedor.innerHTML = funcionesMapeadas;
        contenedor.addEventListener("click", (e) => {
            let elementoClicado = e.target;
            FuncionesByHorario(funciones, elementoClicado.textContent);
        });
    }
}

function FiltrarHorarios(funcion){
    let contenedor = new Set();
    funcion.forEach(funcion => {
        if(!contenedor.has(funcion.horario)){
            contenedor.add(funcion.horario);
        }  
    });
    return Array.from(contenedor);
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
        let Ticket = await ComprarTicket(id,usuario,cantidad);
        const ticketJSON = JSON.stringify(Ticket);
        window.location.href = (`./Impresion/ImpresionTicket.html?Ticket=${encodeURIComponent(ticketJSON)}`);
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

function OrdenarFechas(fechas){ //Y si le enviamos directamente el formato como se recibe desde el get?
    let fechasOrdenadas = [];
    fechasOrdenadas.push(fechas[0]);
    let fechaActual = new Date();
    let añoActual = fechaActual.getFullYear();
    for (let i = 1; i < fechas.length; i++) {
        let partesFecha = fechas[i].split('/'); 
        let fecha1 = new Date(añoActual, partesFecha[1] - 1, partesFecha[0]);
        for (let j = 0; j <fechasOrdenadas.length;j++) {
            let partesFecha = fechasOrdenadas[j].split('/'); 
            let fecha2 = new Date(añoActual, partesFecha[1] - 1, partesFecha[0]);
            if (fecha1.getMonth() < fecha2.getMonth() || (fecha1.getDate() <= fecha2.getDate() && fecha1.getMonth() == fecha2.getMonth())){
                let fechaArgentina = fecha1.toLocaleDateString('es-AR');
                const fechayMes = fechaArgentina.substring(0, fechaArgentina.lastIndexOf('/'));
                fechasOrdenadas.splice(j, 0, fechayMes);
                j = fechasOrdenadas.length;
            }
            if (j == fechasOrdenadas.length - 1){
                let fechaArgentina = fecha1.toLocaleDateString('es-AR');
                const fechayMes = fechaArgentina.substring(0, fechaArgentina.lastIndexOf('/'));
                fechasOrdenadas.splice(j+1, 0, fechayMes);
                j = fechasOrdenadas.length;
            }
        }
    }
    return fechasOrdenadas;
}

function OrdenarHora(Horas){
    let horasOrdenadas = [];
    horasOrdenadas.push(Horas[0]);
    let horario1 = new Date();
    let horario2 = new Date();
    for (let i = 1; i < Horas.length; i++) {
        let partesHora1 = Horas[i].split(':');
        horario1.setHours(parseInt(partesHora1[0])); 
        horario1.setMinutes(parseInt(partesHora1[1])); 
        for (let j = 0; j <horasOrdenadas.length;j++) {
            let partesHora2 = horasOrdenadas[j].split(':');
            horario2.setHours(parseInt(partesHora2[0])); 
            horario2.setMinutes(parseInt(partesHora2[1])); 
            if (horario1.getHours() < horario2.getHours()){
                let minutos = (horario1.getMinutes() < 10 ? '0' : '') + horario1.getMinutes();
                horasOrdenadas.splice(j, 0, horario1.getHours() +':'+ minutos);
                j = horasOrdenadas.length;
            }
            if (j == horasOrdenadas.length - 1){
                let minutos = (horario1.getMinutes() < 10 ? '0' : '') + horario1.getMinutes();
                horasOrdenadas.splice(j+1, 0, horario1.getHours() +':'+ minutos);
                j = horasOrdenadas.length;
            }
        }
    }
    return horasOrdenadas;
}