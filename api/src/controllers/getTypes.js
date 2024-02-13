const axios = require("axios")
const {Type} = require("../db")


async function getPokemonTypes() {
    let pokemonDb = await Type.findAll();
    if (pokemonDb.length > 0) {
      return pokemonDb;
    } else {
      const response = await axios.get("https://pokeapi.co/api/v2/type");
      const data = Promise.all(
        response.data.results.map(async (t, index) => {
          let types = await Type.create({
            id: index + 1,
            name: t.name,
          });
          return types;
        })
      );
      return data;
    }
  }
  
  module.exports = 
    
    getPokemonTypes
  ;