import { cargarPelicula } from "../services/getPeliculas.JS";
import { mapeadorInformacion } from "./mapeo/mapeoPelicula.JS";


export async function busquedaPelicula(id){
    const pelicula = await cargarPelicula(id);
    const infoPelicula = mapeadorInformacion(pelicula.titulo, pelicula.poster, pelicula.trailer, pelicula.genero.nombre, pelicula.sinopsis);
    mostarInfoPelicula(infoPelicula,id);
}

function mostarInfoPelicula(pelicula,id){
    const informacionPelicula = document.getElementById("desplegable-pelicula");
    informacionPelicula.innerHTML = pelicula;
    let boton = document.getElementById('consultar-funciones-dia-horario');
    boton.addEventListener( "click", () => {
        window.open(`../ticket/compraTickets.html?pelicula=${id}`);
    });
}

