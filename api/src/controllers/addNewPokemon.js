const { v4 } = require('uuid');
const {Pokemon, Type, conn} = require("../db");


async function addPokemon(req,res){

    try {
        const {name, health, attack, defense, speed, weight, height, type1, type2} = req.body
        if(!name) return res.status(400).send("falta el nombre")
        let nuevoid = v4()
        const pokemon = await Pokemon.create({
            id: nuevoid,
            name,
            speed, 
            attack,
            defense,
            height,
            weight,
            health
        })
        console.log(pokemon.dataValues)
        // chequeamos hay uno o dos tipos 
        if(type1){
            // nos fijamos en la base de datos si hay un tipo con ese nombre, y si no lo creamos 
            let type_1 = await Type.findOrCreate({
                where:{
                    name: type1
                }
            })
            type_1[0].addPokemon(pokemon)
            // console.log(type_1[0].dataValues)
            //  pokemon.setTypes(type_1[0])
        }
        
        if(type2){
            // nos fijamos en la base de datos si hay un tipo con ese nombre, y si no lo creamos 
            let type_2 = await Type.findOrCreate({
                where:{
                    name: type2
                }
            })
            type_2[0].addPokemon(pokemon)
            // console.log(type_2[0].dataValues)
            // pokemon.setTypes(type_2[0])
        }
        
        return res.send(pokemon)
        
    } catch (error) {
        return res.status(400).send("no se pudo crear el pokemon")
    }
   

}

module.exports = addPokemon;