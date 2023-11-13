import { InformacionPelicula, seccion } from "./llamados.js";

export function EvitarRepeticion(funciones){
    const contenedor = new Set();
    funciones.forEach(element => {   
        if(!contenedor.has(element.pelicula.peliculaId)){
            contenedor.add(element.pelicula.peliculaId);
        } 
    });
    return contenedor;
}

export function FuncionesAMapear(funciones, contenedor){
    let functions = [];
    funciones.forEach(element => {
        if(contenedor.has(element.pelicula.peliculaId)){
            functions.push(element);
            contenedor.delete(element.pelicula.peliculaId);
        }        
    });
    return functions;
}

export function MostrarFunciones(funcionesMapeadas){
    seccion.removeChild(seccion.firstChild);
    const Hijo = document.createElement('Hijo');
    Hijo.innerHTML = funcionesMapeadas;
    seccion.appendChild(Hijo);
}; //¿Debería eliminar los hijos? 

export function MostarInfoPelicula(Pelicula){
    if(InformacionPelicula.children.length > 0){
        InformacionPelicula.removeChild(InformacionPelicula.children[0]);
    };
    const Hijo= document.createElement('Hijo');
    Hijo.innerHTML = Pelicula;
    InformacionPelicula.appendChild(Hijo);
}


export default{
    MostrarFunciones,
    FuncionesAMapear,
    EvitarRepeticion,
}
