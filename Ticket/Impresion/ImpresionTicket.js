import { mapeoTicket} from "./mapeo/mapeoTickets.JS";

window.onload = async function() {
const ticketParam = decodeURIComponent(new URLSearchParams(window.location.search).get('ticket'));
const ticket = JSON.parse(ticketParam);
const mostrarTicket= document.querySelector(".contenedor-tickets");
const arreglo = [];
for (let i=0; i<ticket.tickets.length; i++) {
    let fecha = new Date(ticket.funcion.fecha);
    let fechaArgentina = fecha.toLocaleDateString('es-AR');
    arreglo.push(mapeoTicket(ticket.usuario,ticket.tickets[i].ticketId,ticket.funcion.pelicula.titulo,ticket.funcion.pelicula.genero.nombre,ticket.funcion.sala.nombre,fechaArgentina,ticket.funcion.horario));  
}
mostrarTicket.innerHTML = arreglo.join("");
document.querySelector(".agradecimiento").scrollIntoView({ behavior: "smooth" });
setTimeout(function() {
    mostrarTicket.scrollIntoView({ behavior: "smooth" });
  }, 2000);
}

window.addEventListener('scroll', function() {
  var nav = document.querySelector('.sticky-nav');
  var scrollPosition = window.scrollY;

  if (scrollPosition > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});