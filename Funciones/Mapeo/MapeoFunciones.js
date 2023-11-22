
function MapeadorPosters(id,titulo,poster)
{ return `<div data-id=${id} class="card">            
            <img id=${id} src=${poster} class="card-img-top" alt="Poster de " ${titulo}>
            <div id=${id} class="card-body">
              <p id=${id} class="card-text">${titulo}</p>
            </div>
          </div>`
};

export function Mapeofunciones(cartelera){
  let funcionesMapeadas = cartelera.map((funcion) => {
    return MapeadorPosters( funcion.pelicula.peliculaId, funcion.pelicula.titulo, funcion.pelicula.poster);
  }).join("");;
  return funcionesMapeadas;
}

export function MensajeAlternativo(){//Crear clases propias y dejar de depender del css de impresion tickets
  return `<div class="Mensaje">
          <div class="Contenedor-Gato-Triste">
          <img class="Imagen-Gato-Triste" src="../../img/Gato-Triste.png" alt="">
          </div>
          <div class="Contenedor-Dialogo-Negativo">
          <img class="Imagen-Dialogo-Negativo" src="../../img/Cuadro-Dialogo-NotFound.png" alt="">
          </div>
          </div>` 
};

export default {
  Mapeofunciones,
  MensajeAlternativo,
};
