
function MapeadorPosters(id,titulo,poster)
{ return `<a href="#Desplegable-Pelicula">
          <div data-id=${id} class="card">            
            <img id=${id} src=${poster} class="card-img-top" alt="Poster de ${titulo}">
            <div class="card-body">
              <p class="card-text">${titulo}</p>
            </div>
          </div>
          </a>`
};

export function Mapeofunciones(cartelera){
  let funcionesMapeadas = cartelera.map((funcion) => {
    return MapeadorPosters( funcion.pelicula.peliculaId, funcion.pelicula.titulo, funcion.pelicula.poster);
  });
  return funcionesMapeadas;
}

export function MensajeAlternativo(){
  return `<h2>No existen funciones coincidentes con los filtros establecidos<h2>` 
};

export function MapeadorInformacion(titulo,poster,trailer,genero,descripcion){
  return `<div id="Marco-Informacion"> 
    <div id="Contenedor-Poster">
      <img id ="Poster" src=${poster} alt="Poster de ${titulo}">
    </div>
    <div id="InfoPelicula">
      <div id="trailer">
        <video src=${trailer}  alt="Trailer de ${titulo}">
      </div>
      <div id="Descripcion">
        <p>Titulo: ${titulo} <br>Genero: ${genero} <br>Duración: 2:30hs <br>Sinopsis: ${descripcion}</p>
      </div>
      <div id="Contenedor-Boton">
        <button id="ConsultarFunciones-Dia-Horario">Ver Fecha y hora de las funciones</button>
      </div>
  </div>
</div>`
}

export default {
  Mapeofunciones,
  MensajeAlternativo,
};
