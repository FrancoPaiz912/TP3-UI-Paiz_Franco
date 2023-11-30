import { cargarPelicula } from "../Services/GetPeliculas.js";
import { mapeadorInformacion } from "./Mapeo/MapeoPelicula.js";


export async function busquedaPelicula(id){
    const pelicula = await cargarPelicula(id);
    const infoPelicula = mapeadorInformacion(pelicula.titulo, pelicula.poster, pelicula.trailer, pelicula.genero.nombre, pelicula.sinopsis);
    mostarInfoPelicula(infoPelicula,id);
}

function mostarInfoPelicula(pelicula,id){
    const informacionPelicula = document.getElementById("Desplegable-Pelicula");
    informacionPelicula.innerHTML = pelicula;
    let boton = document.getElementById('ConsultarFunciones-Dia-Horario');
    boton.addEventListener( "click", () => {
        window.open(`../Ticket/CompraTickets.html?Pelicula=${id}`);
    });




}

