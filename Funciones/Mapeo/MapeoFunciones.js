
function mapeadorPosters(id,titulo,poster)
{ return `<div data-id=${id} class="card">            
            <img id=${id} src=${poster} class="card-img-top" alt="Poster de " ${titulo}>
            <div id=${id} class="card-body">
              <p id=${id} class="card-text">${titulo}</p>
            </div>
          </div>`
};

export function mapeofunciones(cartelera){
  let funcionesMapeadas = cartelera.map((funcion) => {
    return mapeadorPosters( funcion.pelicula.peliculaId, funcion.pelicula.titulo, funcion.pelicula.poster);
  }).join("");;
  return funcionesMapeadas;
}

export function mensajeAlternativo(){//Crear clases propias y dejar de depender del css de impresion tickets
  return `<div class="mensaje">
          <div class="contenedor-gato-triste">
          <img class="imagen-gato-triste" src="../../img/Gato-Triste.png" alt="">
          </div>
          <div class="contenedor-dialogo-negativo">
          <img class="imagen-dialogo-negativo" src="../../img/Cuadro-Dialogo-NotFound.png" alt="">
          </div>
          </div>` 
};

export default {
  mapeofunciones,
  mensajeAlternativo,
  mensajeAlternativo,
};
