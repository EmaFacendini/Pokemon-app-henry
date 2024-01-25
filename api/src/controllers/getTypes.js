const axios = require("axios")
const {Type} = require("../db")


async function getTypes(req,res){

    try {
        const url = "https://pokeapi.co/api/v2/type";
    // este es el arreglo de objetos types
        const apitypes = await axios.get(url);

    // lo que vamos a hacer es formar un arreglo con los nombres 
    // de los distintos tipos de pokemones 
    const tipos = apitypes.data.results.map(obj=> obj.name)

    // aca agregamos cada tipo a la base de datos 
    // con el map a cada string del arreglo, y crea en la tablas types 
    for(let i = 0 ; i < tipos.length; i++){
        await Type.findOrCreate({
            where:{name: tipos[i]}
        })
    }

    const alltypes = await Type.findAll();
    const typenames =  alltypes.map(el=> el.name)
    return res.status(200).send(typenames)
        
    } catch (error) {
        console.log(error)
        return res.status(400).send("fallo la request de los tipos")
    }
    
}


module.exports = getTypes;