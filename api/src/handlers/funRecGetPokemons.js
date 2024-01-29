const axios = require("axios");

async function recursiveGetPokemons(url){
    
    
        try {

        const res_api = await axios.get(url);
        const api = res_api.data   
        const array_urls = await api.results.map(obj=>obj.url)
    
        const arreglo_pokemones =  array_urls.map(async (url)=>{        

        try{
            const {data} = await axios.get(url);
            console.log(data.name)
          
            return{
                name: data.name,
                id: data.id,
                attack:data.stats.find(obj=> obj.stat.name === "attack").base_stat,
                img: data.sprites.other["official-artwork"].front_default ,
                types: data.types.map(el => el.type.name) 

            } }catch(next){
                console.log("catch wifi request individual pokemon n: ", url.slice(34, -1))
                    return "vacio"     
                
            }  
             
    })

         return arreglo_pokemones;


        } catch (error) {
            console.log(error)
            console.log("mal en el catch de la recursion")
            return array_pokemones
             
        }
    
        
  
}
    

module.exports = recursiveGetPokemons;