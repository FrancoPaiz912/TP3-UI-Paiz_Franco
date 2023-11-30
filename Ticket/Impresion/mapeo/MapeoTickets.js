export function mapeoTicket(usuario,ticketId,titulo,genero,sala,fecha,hora){
    return `<div class="ticket">
            <div class="campo-ticket"><h3>Usuario: ${usuario}</h3></div>
            <div class="campo-ticket"><h3>TicketId: ${ticketId}</h3></div>
            <div class="campo-ticket"><h3>Titulo: ${titulo}</h3></div>
            <div class="campo-ticket"><h3>Genero: ${genero}</h3></div>
            <div class="campo-ticket"><h3>Sala: ${sala}</h3></div>
            <div class="campo-ticket"><h3>Fecha: ${fecha}</h3></div>
            <div class="campo-ticket"><h3>Horario: ${hora}</h3></div>
            </div>`
}