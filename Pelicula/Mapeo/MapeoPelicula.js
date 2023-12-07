export function mapeadorInformacion(titulo,poster,trailer,genero,descripcion){
    return `<div id="marco-informacion"> 
      <div id="contenedor-poster">
        <img class="poster" src=${poster} alt="Poster de ${titulo}">
        <h3 id="titulo-poster">${titulo}</h3>
      </div>
      <div id="info-pelicula">
        <div id="trailer">
          <iframe src=${trailer} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div id="descripcion">
          <span class="badge text-bg-success"> ${genero} </span>  
          <br>Sinopsis: ${descripcion}</p>
        </div>
        <div id="contenedor-boton">
          <button id="consultar-funciones-dia-horario">Ver fechas de funciones</button>
        </div>
    </div>
  </div>`
  }