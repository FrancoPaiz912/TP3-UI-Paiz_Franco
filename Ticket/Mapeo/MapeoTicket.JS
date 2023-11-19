export function MapeoFechas(Fecha){
    return  `
    <div id="Contenedor-MostrarFechas">
        <p>${Fecha}</p>
    </div>
    `
}

export function MapeoPoster(poster,titulo){
    return `<img id="${titulo}" class="Poster" src=${poster} alt="Poster de ${titulo}">`
}

export function MapeoColumnas(){
    return `<table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Día</th>
                    <th>Hora</th>
                    <th>Sala</th>
                    <th>Entradas dispobles</th>
                    <th>Comprar</th>
                </tr>
            </thead>
            <tbody id="Datos-Funciones">
            </tbody>
          </table>`
}

export function MapeoFilas(fecha,dia,horario,sala,entradas){
    return `<tr>
            <td id="Ancho-Columna">${fecha}</td>
            <td id="Ancho-Columna">${dia}</td>
            <td id="Ancho-Columna">${horario}</td>
            <td id="Ancho-Columna">${sala}</td>
            <td id="Ancho-Columna">${entradas}</td>
            <td id="Ancho-Columna"><button>Comprar Tickets</button></td>
            </tr>`
}