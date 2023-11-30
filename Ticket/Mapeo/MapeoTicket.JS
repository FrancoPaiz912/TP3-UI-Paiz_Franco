export function mapeoTiempo(Fecha){
    return  `
    <div id="contenedor-mostrar-fechas">
        ${Fecha}
    </div>
    `
}

export function mapeoPoster(poster,titulo){
    return `<img id="${titulo}" class="poster" src=${poster} alt="Poster de ${titulo}">`
}

export function mapeoAnuncioHorario(){
    return `<h2>Horarios de la funciones</h2>`
}

export function mapeoColumnas(){
    return `<table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Horario</th>
                    <th>Sala</th>
                    <th>Capacidad</th>
                    <th>Entradas disponibles</th>
                    <th>Comprar</th>
                </tr>
            </thead>
            <tbody id="datos-funciones">
            </tbody>
          </table>`
}

export function mapeoFilasDisponibles(id,sala,entradas,fecha,horario,capacidad){
    return `<tr>
            <td class="ancho-columna">${fecha}</td>
            <td class="ancho-columna">${horario}</td>
            <td class="ancho-columna">${sala}</td>
            <td class="ancho-columna">${capacidad}</td>
            <td class="ancho-columna">${entradas}</td>
            <td id="${id}" type="button" class="btn btn-primary ancho-columna boton-ticket" data-bs-toggle="modal" data-bs-target="#exampleModal">Comprar Tickets</td>
            </tr>`
}

export function mapeoFilasNoDisponibles(id,sala,entradas,fecha,horario,capacidad){
    return `<tr>
            <td class="ancho-columna">${fecha}</td>
            <td class="ancho-columna">${horario}</td>
            <td class="ancho-columna">${sala}</td>
            <td class="ancho-columna">${capacidad}</td>
            <td class="ancho-columna">${entradas}</td>
            <td id="${id}" type="button" class="btn btn-primary ancho-columna boton-no-ticket" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled>Entradas agotadas</td>
            </tr>`
}


export function mapeoAuxiliar(id){
    return `<div id=${id} class="id-oculta"> 
            </div>`
}

export default{
    mapeoTiempo,
    mapeoPoster,
    mapeoAnuncioHorario,
    mapeoColumnas,
    mapeoFilasDisponibles,
    mapeoFilasNoDisponibles,
    mapeoAuxiliar,
}