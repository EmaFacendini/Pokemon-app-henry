const {getPokemonApiByName,
getPokemonsDbByName} = require("../controllers/getByName")

const {getAllPokemons} = require("../controllers/getAllPokemons")

const getByNamehandler = async (req, res, next) => {

    try {       
        const {name} = req.query;
        if (name){
            // -------------------------------- consultar por name           
            // busqueda en la API externa
            let pokemonSearch = await getPokemonApiByName(name);

            // busqueda en la base de datos
            if (pokemonSearch.error){ // no encontrado en la API externa
                pokemonSearch = await getPokemonsDbByName(name); 

                if (!pokemonSearch){
                    return res.status(404).json({"message": "Pokemon not found"});
                }
            }
            return res.status(200).json(pokemonSearch);
        }

        // ------------------------------------- retornar todos los pokemon
        const allPokemons = await getAllPokemons(); 
        return res.status(200).json(allPokemons);
    } catch (error) {
        next(error);
    }
};

module.exports =
        
    getByNamehandler;