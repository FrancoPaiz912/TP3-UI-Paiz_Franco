import { MapeadorInformacion, Mapeofunciones, MensajeAlternativo} from "../../Mapeos/MapeoFunciones.js";
import { EvitarRepeticion, FuncionesAMapear, MostarInfoPelicula, MostrarFunciones } from "../../html dinamicos/Muestreo.js";
import { seccion } from "../../html dinamicos/llamados.js";
import { CargarPeliculas } from "../PeliculasServices/GetPeliculas.js";
// export var funciones = [];

window.onload = async function() {
    let funciones = await CargarFunciones("","",""); 
    let indices = EvitarRepeticion(funciones);
    let cartelera = FuncionesAMapear(funciones, indices);
    let funcionesMapeadas = Mapeofunciones(cartelera);
    MostrarFunciones(funcionesMapeadas); 
};

export async function CargarFunciones (titulo, genero, fecha){
    const config = {
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }
    ;
    try{
        const response = await fetch (`https://localhost:7030/api/v1/Funcion?fecha=${fecha}&titulo=${titulo}&genero=${genero}`, config);
        return await response.json(); 
    }catch(error){
        console.log(error);
    }
};

async function BusquedaFiltrada (){
    let funcionesMapeadas;
    const titulo = await document.getElementById("Titulo").value;
    let genero = document.getElementById("Genero").value; 
    let fecha = document.getElementById("Fecha").value;
    if (genero != "") genero = parseInt(genero);
    let result = await CargarFunciones(titulo, genero, fecha)
    if (result.length > 0){
    let indices = EvitarRepeticion(result);
    let cartelera = FuncionesAMapear(result, indices);
    funcionesMapeadas = Mapeofunciones(cartelera);
    }
    else funcionesMapeadas = MensajeAlternativo();
    MostrarFunciones(funcionesMapeadas);
}


const boton = document.getElementById("BotonBusqueda");    
boton.addEventListener("click", (e) => {
    e.preventDefault();
    BusquedaFiltrada();
});

async function BusquedaPelicula(id){
    const pelicula=await CargarPeliculas(id);
    const InfoPelicula=MapeadorInformacion(pelicula.titulo, pelicula.poster, pelicula.trailer, pelicula.genero.nombre, pelicula.sinopsis);
    MostarInfoPelicula(InfoPelicula);
}

seccion.addEventListener("click", (e) => {
    e.preventDefault();
    let elementoClicado = e.target;
    BusquedaPelicula(elementoClicado.id);
    let PeliculaReferencia = document.getElementById("Desplegable-Pelicula");
    PeliculaReferencia.scrollIntoView({ behavior: "smooth" });
});




export default 
{
    CargarFunciones,
    BusquedaFiltrada,
};