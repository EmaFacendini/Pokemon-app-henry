const {Pokemon, Type} = require("../db");
const recursiveGetPokemons = require("../handlers/funRecGetPokemons")

async function getAllPokemons(req,res){
    // primeros
    try {
        const pokemonsFromApi = await recursiveGetPokemons("https://pokeapi.co/api/v2/pokemon");
        console.log("hasta el primer entry")
        const pokemonsFromDb = await Pokemon.findAll({include: Type});

    // console.log(pokemonsFromDb.map(obj=>obj.dataValues))
   
        
        if(pokemonsFromDb.length > 0){
            console.log("entro al db")
        const arregloPokemonsDb = pokemonsFromDb.map(obj=>{
            const {id, name, types, attack} = obj.dataValues;      
            const typesNames = types.map(ty=> ty.name)
            return {
                name,
                id,
                attack,
                types: typesNames
            }

        })
         const promesasApi = await Promise.all(pokemonsFromApi);

        // const promesasBd = await Promise.all(arregloPokemonsDb);
        console.log("entro a combinar las dos promesas")
        Promise.all([promesasApi, arregloPokemonsDb])
        .then(respuesta=>{
            const [pokesApi,pokesBd] = respuesta;
            const arregloCompleto = pokesApi.concat(pokesBd);
            return res.send(arregloCompleto)
        } )
                
    
    }
    else{
        console.log("vino solo a los de las api")
        Promise.all(pokemonsFromApi)
        .then(results=> res.send(results))
        console.log("espera a las promesas")        
   

        // return res.json(pokemonsFromApi)
    }
        
    } catch (error) {
        console.log(error)
        console.log("ENTRO AL CATCH")
        res.status(400).send(error)
    }
    
   
}
module.exports = getAllPokemons;