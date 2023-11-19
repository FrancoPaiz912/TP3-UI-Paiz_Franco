export async function CargarPelicula(id){
    const config = {
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }
    ;
    try{
        const response = await fetch (`https://localhost:7030/api/v1/Pelicula/${id}`, config); //Si no funca puede que sea el / antes del i
        return await response.json();
    }catch(error){
        console.log(error);
    }
}