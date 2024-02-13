const { Pokemon, Type } = require("../db");
const axios = require("axios");

const URL_API_POKEMON = "https://pokeapi.co/api/v2/pokemon";


async function getPokemonsApi() {
    try {
        const response = await axios.get(`${URL_API_POKEMON}`);
        const arrayResultApi = response.data.results;
        const arrayPromises = arrayResultApi.map((p) => axios.get(p.url));

        const pokemons = await Promise.all(arrayPromises);

        return pokemons.map((p) => ({
            id: p.data.id,
            name: p.data.name,
            image: p.data.sprites.other.dream_world.front_default,
            hp: p.data.stats[0].base_stat,
            attack: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            speed: p.data.stats[3].base_stat,
            height: p.data.height,
            weight: p.data.weight,
            types: p.data.types.map((t) => ({
                name: t.type.name,
            })),
        }));
    } catch (error) {
        console.error("Error in getPokemonsApi:", error);
        throw error;
    }
}

async function getPokemonsDb() {
    try {
        const arrayPokemonsDb = await Pokemon.findAll({
            include: {
                attributes: ["name"],
                model: Type,
                through: {
                    attributes: [],
                },
            },
        });

        return arrayPokemonsDb.map((p) => ({
            id:p.id,
            name:p.name,
            image:p.image,
            hp:p.hp,
            attack: p.attack,
            defense: p.defense,
            speed: p.speed, 
            height: p.height,
            weight: p.weight,
            types:p.types.map((type)=>type.name),
            createdInDb:p.createdInDb
            // Agrega otras propiedades según tus necesidades
        }));
    } catch (error) {
        console.error("Error in getPokemonsDb:", error);
        throw error;
    }
}

async function getAllPokemons() {
    try {
        const apiPokemons = await getPokemonsApi();
        const dbPokemons = await getPokemonsDb();
        return apiPokemons.concat(dbPokemons);
    } catch (error) {
        console.error("Error in getAllPokemons:", error);
        throw error;
    }
}

module.exports = {
    getPokemonsApi,
    getPokemonsDb,
    getAllPokemons,
};
