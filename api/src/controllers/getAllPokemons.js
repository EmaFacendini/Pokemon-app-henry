const { Pokemon, Type } = require("../db");
const recursiveGetPokemons = require("../handlers/funRecGetPokemons");

async function getAllPokemons(req, res) {
  try {
    // Obtener información detallada de Pokémon desde la API externa
    const pokemonsFromApi = await recursiveGetPokemons("https://pokeapi.co/api/v2/pokemon");

    // Obtener todos los Pokémon de la base de datos local, incluyendo información sobre los tipos
    const pokemonsFromDb = await Pokemon.findAll({ include: Type });

    if (pokemonsFromDb.length > 0) {
      // Mapear los Pokémon de la base de datos para estructurar la información adecuadamente
      const arregloPokemonsDb = pokemonsFromDb.map((obj) => {
        const { id, name, types, attack } = obj.dataValues;
        const typesNames = types.map((ty) => ty.name);
        return {
          name,
          id,
          attack,
          types: typesNames,
        };
      });

      // Esperar a que todas las promesas generadas por la API externa se resuelvan
      const promesasApi = await Promise.all(pokemonsFromApi);

      // Combinar las promesas generadas por la API externa y los Pokémon de la base de datos local
      const arregloCompleto = promesasApi.concat(arregloPokemonsDb);

      // Enviar la respuesta completa al cliente
      return res.send(arregloCompleto);
    } else {
      // Si no hay Pokémon en la base de datos, enviar directamente los de la API externa
      const results = await Promise.all(pokemonsFromApi);
      return res.send(results);
    }
  } catch (error) {
    // Capturar cualquier error que ocurra durante el proceso y enviar un código de estado 400 junto con el mensaje de error
    console.error(error);
    return res.status(400).send(error.message);
  }
}

module.exports = getAllPokemons;
