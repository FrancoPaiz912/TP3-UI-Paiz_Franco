import { MapeoTicket } from "./mapeo/MapeoTickets.js";

window.onload = async function() {
const ticketParam = decodeURIComponent(new URLSearchParams(window.location.search).get('Ticket'));
const ticket = JSON.parse(ticketParam);
const MostrarTicket= document.querySelector(".Contenedor-Tickets");
const arreglo = [];
for (let i=0; i<ticket.tickets.length; i++) {
    let fecha = new Date(ticket.funcion.fecha);
    let fechaArgentina = fecha.toLocaleDateString('es-AR');
    arreglo.push(MapeoTicket(ticket.usuario,ticket.tickets[i].ticketId,ticket.funcion.pelicula.titulo,ticket.funcion.pelicula.genero.nombre,ticket.funcion.sala.nombre,fechaArgentina,ticket.funcion.horario));  
}
MostrarTicket.innerHTML = arreglo.join("");
document.querySelector(".Agradecimiento").scrollIntoView({ behavior: "smooth" });
setTimeout(function() {
    MostrarTicket.scrollIntoView({ behavior: "smooth" });
  }, 2000);

}