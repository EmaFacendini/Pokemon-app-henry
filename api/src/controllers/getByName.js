const axios = require("axios");
const {Pokemon, Type} = require("../db");


async function getByName (req,res,next){
    
    if(!req.query.name) return next();
    const name_pokemon = req.query.name;
    // nos fijamos si hay un pokemon con ese nobre en la base de datos  
    try {

        var arreglo_devolver = []
        const db_respuesta = await Pokemon.findAll({
            where:{name:name_pokemon},
            include:{model:Type}
        });
     
        if(db_respuesta.length !== 0){
            var arreglo_db_pokemones = db_respuesta.map(p=>{
                console.log(p.dataValues.name)
                return {
                name: p.dataValues.name,
                id: p.dataValues.id,
                attack: p.dataValues.attack,
                types: p.dataValues.types.map(t=> t.name)
            }})
        
            arreglo_devolver = arreglo_devolver.concat(arreglo_db_pokemones)
        }
   
            // si no se encontro en la base de datos 
            // significa que tampoco se encontro en la api, por lo tanot el pokemon no existe 
            // if(!db_respuesta) return res.status(404)   
        

     
            const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name_pokemon.toLowerCase()}`);   
            // .catch(err=> res.status(404).send("no hay pokemones con ese nombre"));
    
            if(data){
            // ahora me armo el pokemonn para devolverlo 
            console.log("encontro un pokemon: ", data.name)
            const name = data.name 
            const img = data.sprites.other["official-artwork"].front_default;
            const id = data.id;
            const attack = data.stats.find(obj=> obj.stat.name === "attack").base_stat
            const types = data.types.map(el=> el.type.name)
    
            const pokemondevueltoapi ={
                name,
                id,
                img,
                attack,
                types
            }
             console.log("formo el objeto de la api")
             console.log("antes de la api",arreglo_devolver)
            arreglo_devolver.push(pokemondevueltoapi)
             console.log("array depues del req a api", arreglo_devolver)
        }
        console.log(arreglo_devolver)

       
        return res.send(arreglo_devolver)
            
 
    } catch (error) {
        return res.status(404).send("no se encontro el pokemon")
    }
    
    
}

module.exports = getByName; 