export async function capacidadDisponible(id){
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

export async function comprarTicket(id,usuario,cantidad){
    const config = {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "cantidad":cantidad,
            "usuario":usuario
        }),
    }
    ;
    try{
        const response = await fetch (`https://localhost:7030/api/v1/Funcion/${id}/tickets`, config);
        return await response.json(); 
    }catch(error){
        console.log(error);
    }
};

export default {
    capacidadDisponible,
    comprarTicket,
}