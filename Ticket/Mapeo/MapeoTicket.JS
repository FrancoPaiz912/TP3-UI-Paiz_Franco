export function mapeoTiempo(Fecha){
    return  `
    <div id="Contenedor-MostrarFechas">
        <p>${Fecha}</p>
    </div>
    `
}

export function mapeoPoster(poster,titulo){
    return `<img id="${titulo}" class="Poster" src=${poster} alt="Poster de ${titulo}">`
}

export function mapeoAnuncioHorario(){
    return `<h2>Horarios de la funciones</h2>`
}

export function mapeoColumnas(){
    return `<table>
            <thead>
                <tr>
                    <th>Sala</th>
                    <th>Entradas dispobles</th>
                    <th>Comprar</th>
                </tr>
            </thead>
            <tbody id="Datos-Funciones">
            </tbody>
          </table>`
}

export function mapeoFilas(id,sala,entradas){
    return `<tr>
            <td class="Ancho-Columna">${sala}</td>
            <td class="Ancho-Columna">${entradas}</td>
            <td id="${id}" type="button" class="btn btn-primary Ancho-Columna Boton-Ticket" data-bs-toggle="modal" data-bs-target="#exampleModal">Comprar Tickets</td>
            </tr>`
}

export function mapeoAuxiliar(id){
    return `<div id=${id} class="id-oculta"> 
            </div>`
}