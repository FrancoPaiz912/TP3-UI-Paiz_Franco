
function MapeadorPosters(titulo,poster)
{ return `<div class="card">
            <img src=${poster} class="card-img-top" alt="Poster de ${titulo}">
            <div class="card-body">
              <p class="card-text">${titulo}</p>
            </div>
          </div> `
};

export function Mapeo(cartelera){
  let funcionesMapeadas = cartelera.map((funcion) => {
    return MapeadorPosters(funcion.pelicula.titulo, funcion.pelicula.poster);
  });
  return funcionesMapeadas;
}

export function MensajeAlternativo(){
  return `<h2>No existen funciones coincidentes con los filtros establecidos<h2>` 
};

export default {
  Mapeo,
  MensajeAlternativo,
};
