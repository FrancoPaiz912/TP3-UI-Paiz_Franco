import { Mapeo, MensajeAlternativo} from "../../Mapeos/MapeoFunciones.js";
import { EvitarRepeticion, FuncionesAMapear, MostrarFunciones } from "../../html dinamicos/Muestreo.js";
export var funciones = [];

window.onload = async function() {
    funciones = await CargarFunciones("","",""); 
    let indices = EvitarRepeticion(funciones);
    let cartelera = FuncionesAMapear(funciones, indices);
    let funcionesMapeadas = Mapeo(cartelera);
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
        const result = await response.json();
        return result; 
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
    funcionesMapeadas = Mapeo(cartelera);
    }
    else funcionesMapeadas = MensajeAlternativo();
    MostrarFunciones(funcionesMapeadas);
}


const boton = document.getElementById("BotonBusqueda");    
boton.addEventListener("click", (e) => {
    e.preventDefault();
    BusquedaFiltrada();
    });


export default 
{
    CargarFunciones,
    BusquedaFiltrada,
};