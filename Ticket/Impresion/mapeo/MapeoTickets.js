export function MapeoTicket(usuario,ticketId,titulo,genero,sala,fecha,hora){
    return `<div class="Ticket">
            <div class="Campo-Ticket"><h3>Usuario: ${usuario}</h3></div>
            <div class="Campo-Ticket"><h3>TicketId: ${ticketId}</h3></div>
            <div class="Campo-Ticket"><h3>Titulo: ${titulo}</h3></div>
            <div class="Campo-Ticket"><h3>Genero: ${genero}</h3></div>
            <div class="Campo-Ticket"><h3>Sala: ${sala}</h3></div>
            <div class="Campo-Ticket"><h3>Fecha: ${fecha}</h3></div>
            <div class="Campo-Ticket"><h3>Horario: ${hora}</h3></div>
            </div>`
}