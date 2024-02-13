
const getPokemonTypes = require("../controllers/getTypes")


const getTypesHandler = async (req, res) => {
    const pokemonTypes = await getPokemonTypes();
    return res.json(pokemonTypes);
  };
  
  module.exports =
        
  getTypesHandler;