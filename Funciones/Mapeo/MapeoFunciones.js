
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

export function MensajeAlternativo(){
  return `<h2>No existen funciones coincidentes con los filtros establecidos<h2>` //Dar Estilo
};

export default {
  Mapeofunciones,
  MensajeAlternativo,
};
