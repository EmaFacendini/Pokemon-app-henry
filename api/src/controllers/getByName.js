const axios = require("axios");
const {Pokemon, Type} = require("../db");
const { Sequelize } = require('sequelize');
const URL_API_POKEMON = "https://pokeapi.co/api/v2/pokemon";

async function getPokemonApiByName(nameSearch) {
    try{
        const searchPokemonsApi = await axios.get(`${URL_API_POKEMON}/${nameSearch}`);

        if (searchPokemonsApi) {

            let p = searchPokemonsApi;
            return {
                id: p.data.id,
                name: p.data.name,
                image: p.data.sprites.other.dream_world.front_default,  // url imagen
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[3].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map((t) => { return {name: t.type.name}})
            };  // return

        }else {
            return null;
        }
    } catch(error){
        return ({error : "Not found"});
        
    }
}


async function getPokemonsDbByName(nameSearch){ 

    try{
        const searchPokemon = await Pokemon.findOne({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('pokemon.name')), 
                Sequelize.fn('lower', nameSearch)
              ),

            include:{
                attributes: ["name"],
                model: Type,

            }
        });

        return searchPokemon;
    } catch(error){
        return error;
    }
}


module.exports ={
        
        getPokemonApiByName,
        getPokemonsDbByName
    };