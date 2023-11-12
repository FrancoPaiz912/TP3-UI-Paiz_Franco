async function CargarPeliculas(){
    let Conjunto= new Conjunto();
    const config = {
        method: 'GET',
        headers:{
            'Content-Type':'application/json'
        }
    }
    ;
    for (let i = 1; i < cars.length; i++) { //Al no haber un get all, se traeran todas las funciones existentes en la base de datos.
        try{
            const response = await fetch (`https://localhost:7030/api/v1/Pelicula/${i}`, config); //Si no funca puede que sea el / antes del i
            const result = await response.json();
            Conjunto.add(result); 
        }catch(error){
            console.log(error);
        }
    }
}