const axios = require("axios");
const {Pokemon, Type} = require("../db");


async function getById (req,res){
    const {idPokemon} = req.params;
    
    if(idPokemon.length < 6){
        // 10220 es el utlimo id de un pokemon en la api de pokemones
        // en este if entra en la api
    const res_api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);
    if(!res_api) return res.status(404)
    console.log("llego aca")
    const details = res_api.data;   
        console.log(details.name)
    // aca son todos los datos que se tiene que traer de la api para la ruta de detalle
    const name = details.name;
    const img = details.sprites.other["official-artwork"].front_default;
    const id = details.id;
    const weight = details.weight;
    const height = details.height;
    const health = details.stats.find(obj=> obj.stat.name === "hp");
    const attack = details.stats.find(obj=> obj.stat.name === "attack");
    const defense = details.stats.find(obj=> obj.stat.name === "defense");
    const speed = details.stats.find(obj=> obj.stat.name === "speed");
    const types = details.types
    // aca me creo el pokemon
    const pokemon = {
        name,
        img,
        id,
        weight,
        height,
        health: health.base_stat,
        attack: attack.base_stat,
        defense: defense.base_stat,
        speed: speed.base_stat,
        types: types.map(el => el.type.name) //como es un arreglo me traigo solo el nombre de cada objeto tipo
    } 
  
    return res.status(200).send(pokemon)
    }
    else {
        if(typeof idPokemon === "string" && idPokemon.length >25){
        const res_bd = await Pokemon.findByPk(idPokemon, {include: Type})
        if(!res_bd) return res.status(404);
        
        // lo que traiga la consulta a la bd va a ser un monton de datos 
        // nosotros solo queremos los dataValues 
        const p = res_bd.dataValues;
        // me agarro los valores de la base de datos 
        const name = p.name;
        const id = p.id;
        const weight = p.weight;
        const height = p.height;
        const health = p.health;
        const attack = p.attack;
        const defense = p.defense;
        const speed = p.speed;
        const types = p.types.map(tipo=> tipo.name);

        const poke = {
            name,
            id,
            weight,
            height,
            health,
            attack,
            defense,
            speed,
            types
        }
        
        return res.send(poke)
    }
}
    
}

module.exports = getById;