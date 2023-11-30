import { cargarCartelera } from "../services/getFunciones.js";
import { cargarPelicula } from "../services/getPeliculas.js";
import { capacidadDisponible,comprarTicket } from "../services/getTickets.js";
import { mapeoFilasDisponibles } from "./Mapeo/MapeoTicket.JS";
import { mapeoFilasNoDisponibles } from "./Mapeo/MapeoTicket.JS";
import { mapeoAuxiliar } from "./mapeo/mapeoTicket.JS";
import { mapeoAnuncioHorario } from "./mapeo/mapeoTicket.JS";
import { mapeoColumnas } from "./mapeo/mapeoTicket.JS";
import { mapeoPoster,mapeoTiempo } from "./mapeo/mapeoTicket.JS";

window.onload = async function ()  {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('pelicula');
    const pelicula = await cargarPelicula(id);
    let poster = await mapeoPoster(pelicula.poster,pelicula.titulo);
    let contenedorposter = document.getElementById("contenedor-imagen");
    contenedorposter.innerHTML = poster;
    mostrarFechas(pelicula.funciones);
    let peliculaReferencia = document.getElementById("contenedor-fechas");
    peliculaReferencia.scrollIntoView({ behavior: "smooth" });
};

function mostrarFechas(funciones){
    let fechas=filtrarFechas(funciones);
    let fechasOrdenadas = ordenarFechas(fechas);
    let fechasMapeadas = fechasOrdenadas.map( fecha => {
        return mapeoTiempo(fecha);
    }).join("");
    let mostrarFechas = document.querySelector(".mostrar-fechas");
    mostrarFechas.innerHTML = fechasMapeadas;
}

function filtrarFechas(funcion){
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

async function mostrarHorarios(fecha){
    const fechaLimpia = fecha.replace(/[\n\r\s]+/g, '').trim();    
    if(fechaLimpia.length <= 5){
        let anuncio = document.querySelector(".anuncio-horario");
        anuncio.innerHTML = mapeoAnuncioHorario();
        let contenedor = document.querySelector(".mostrar-horarios");
        let nombre = document.querySelector(".poster").id;
        let funciones = await cargarCartelera(nombre,"",fechaLimpia); //Para las fechas hago un get de peliculabyid es por eso que le puedo pasar el array de funciones
        let horariosSinRepeticion = filtrarHorarios(funciones);
        let horarioOrdenado = ordenarHora(horariosSinRepeticion);
        let funcionesMapeadas = horarioOrdenado.map( funcion => {
            return mapeoTiempo(funcion);
        }).join("");
        contenedor.innerHTML = funcionesMapeadas;
        contenedor.addEventListener("click", (e) => {
            let elementoClicado = e.target;
            funcionesByHorario(funciones, elementoClicado.textContent);       
        });
    }
}

function filtrarHorarios(funcion){
    let contenedor = new Set();
    funcion.forEach(funcion => {
        if(!contenedor.has(funcion.horario)){
            contenedor.add(funcion.horario);
        }  
    });
    return Array.from(contenedor);
}

async function funcionesByHorario(funciones, horario) {
    const horarioLimpio = horario.replace(/[\n\r\s]+/g, '').trim(); 
    if(horarioLimpio.length <= 5){
    let contenedor = document.getElementById("contenedor-funciones");
    contenedor.innerHTML = mapeoColumnas();
    let tabla = document.getElementById("datos-funciones");
    let horariosmapeados = await Promise.all(funciones.map(async funcion => {
        if(funcion.horario == horarioLimpio){
            const capacidad = await capacidadDisponible(funcion.funcionId);
            let fecha = new Date(funcion.fecha);
            let fechaArgentina =fecha.toLocaleDateString('es-AR');
            const fechayMes = fechaArgentina.substring(0, fechaArgentina.lastIndexOf('/'));
            if(capacidad.cantidad>0){
                return mapeoFilasDisponibles(funcion.funcionId,funcion.sala.nombre,capacidad.cantidad,fechayMes,funcion.horario, funcion.sala.capacidad);
                document.getElementById("miBoton").disabled = true;
            }
            else{
                return mapeoFilasNoDisponibles(funcion.funcionId,funcion.sala.nombre,capacidad.cantidad,fechayMes,funcion.horario, funcion.sala.capacidad);    
            }
        }        
    }));
    tabla.innerHTML = horariosmapeados.join("");
    tabla.addEventListener("click", (e) =>{
        let id= e.target.id;
        let divOculto = document.querySelector(".contenedor-id");
        divOculto.innerHTML = mapeoAuxiliar(id);
    });
    tabla.scrollIntoView({ behavior: "smooth" });
    }
}

async function comprarEntradas(id,usuario,cantidad){
    let capacidad = await capacidadDisponible(id);
    if(capacidad.cantidad<cantidad){
        document.getElementById("cantidad-entradas").setCustomValidity('Se excede el límite de entradas disponibles');
        document.querySelector(".formulario-modal").reportValidity();
    }
    else{
        let ticket = await comprarTicket(id,usuario,cantidad);
        const ticketJSON = JSON.stringify(ticket);
        window.location.href = (`./Impresion/ImpresionTicket.html?ticket=${encodeURIComponent(ticketJSON)}`);
    }
}

const eventoFunciones = document.querySelector(".mostrar-fechas");
eventoFunciones.addEventListener( "click", (e) => {
    let elementoClicado = e.target;
    mostrarHorarios(elementoClicado.textContent);
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


const compraTicket = document.getElementById("compra-ticket");
compraTicket.addEventListener("click", () => {
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
        let id = document.querySelector(".id-oculta").id;
        comprarEntradas(id,usuario,cantidad);
    }
});

function ordenarFechas(fechas){ //Y si le enviamos directamente el formato como se recibe desde el get?
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

function ordenarHora(Horas){
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