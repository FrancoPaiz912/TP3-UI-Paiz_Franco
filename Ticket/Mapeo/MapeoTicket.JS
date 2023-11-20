export function MapeoTiempo(Fecha){
    return  `
    <div id="Contenedor-MostrarFechas">
        <p>${Fecha}</p>
    </div>
    `
}

export function MapeoPoster(poster,titulo){
    return `<img id="${titulo}" class="Poster" src=${poster} alt="Poster de ${titulo}">`
}

export function MapeoAnuncioHorario(){
    return `<h2>Horarios de la funciones</h2>`
}

export function MapeoColumnas(){
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

export function MapeoFilas(sala,entradas){
    return `<tr>
            <td class="Ancho-Columna">${sala}</td>
            <td class="Ancho-Columna">${entradas}</td>
            <td class="Ancho-Columna"><button>Comprar Tickets</button></td>
            </tr>`
}