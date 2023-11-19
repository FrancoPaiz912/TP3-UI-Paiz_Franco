import { CargarPelicula } from "../Services/GetPeliculas.js";
import { InformacionPelicula } from "../html dinamicos/llamados.js";
import { MapeadorInformacion } from "./Mapeo/MapeoPelicula.js";


export async function BusquedaPelicula(id){
    const pelicula=await CargarPelicula(id);
    const InfoPelicula=MapeadorInformacion(pelicula.titulo, pelicula.poster, pelicula.trailer, pelicula.genero.nombre, pelicula.sinopsis);
    MostarInfoPelicula(InfoPelicula,id);
}

function MostarInfoPelicula(Pelicula,id){
    if(InformacionPelicula.children.length > 0){
        InformacionPelicula.removeChild(InformacionPelicula.children[0]);
    };
    const Hijo= document.createElement('Hijo');
    Hijo.innerHTML = Pelicula;
    InformacionPelicula.appendChild(Hijo);
    let Boton= document.getElementById('ConsultarFunciones-Dia-Horario');
    Boton.addEventListener( "click", () => {
        window.open(`./Ticket/CompraTickets.html?Pelicula=${id}`);
    });




}

