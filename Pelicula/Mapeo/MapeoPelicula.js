export function mapeadorInformacion(titulo,poster,trailer,genero,descripcion){
    return `<div id="Marco-Informacion"> 
      <div id="Contenedor-Poster">
        <img class="Poster" src=${poster} alt="Poster de ${titulo}">
        <h3 id="Titulo-Poster">${titulo}</h3>
      </div>
      <div id="InfoPelicula">
        <div id="trailer">
          <iframe src=${trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div id="Descripcion">
          <p>Genero: ${genero} <br>Duración: 2:30hs <br>Sinopsis: ${descripcion}</p>
        </div>
        <div id="Contenedor-Boton">
          <button id="ConsultarFunciones-Dia-Horario">Ver fechas de funciones</button>
        </div>
    </div>
  </div>`
  }