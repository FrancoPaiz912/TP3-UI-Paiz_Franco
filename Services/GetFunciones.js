export async function cargarCartelera(titulo, genero, fecha){
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



export default 
{
    cargarCartelera,
};