export async function CapacidadDisponible(id){
    const config = {
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }
    ;
    try{
        const response = await fetch (`https://localhost:7030/api/v1/Funcion/${id}/tickets`, config);
        return await response.json(); 
    }catch(error){
        console.log(error);
    }
};