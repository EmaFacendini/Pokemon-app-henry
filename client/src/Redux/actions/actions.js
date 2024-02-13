import  axios  from "axios";
import {GET_BY_NAME,
        GET_POKEMON, 
        GET_POKEMON_DETAIL, 
        POKE_POST, 
        FILTER_BY_CREATE, 
        GET_TYPES, 
        ORDER_BY_NAME,
        ORDER_BY_ATTACK, 
        FILTER_BY_TYPE,
         CLEAR_DETAIL, 
         CLEAR_HOME, 
         EMPTY } from "../actions/actionTypes"



export const getPokemon = () => {
    return async function (dispatch) {
      
        const pokemon = await axios.get("http://localhost:3001/pokemons");
        return dispatch({
          type: GET_POKEMON,
          payload: pokemon.data,
        });

    };
  };
  
  export function  getPokemonDetail (id) {
     return async function (dispatch) {
      try {
        const pokemonDetail = await axios.get(`http://localhost:3001/pokemons/${id}`);
        console.log(pokemonDetail.data);
        
        return dispatch({
          type: GET_POKEMON_DETAIL,
          payload: pokemonDetail.data,
        });
      } catch (error) {
        dispatch({ type: "GET_POKEMON_DETAIL", payload: null });
      }
    };
  };

 


    export const getByName = (name) =>{
      
      const endpoint = "http://localhost:3001/pokemons?name=";

  return async function (dispatch) {
    try {
      const namePokemon = await axios.get(endpoint + name);
      return dispatch({
        type: GET_BY_NAME,
        payload: namePokemon.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
    

    export const createPokemon =  (pokemon) => {
          return async function(dispatch) {
            let payload = await axios.post('http://localhost:3001/pokemons', pokemon)
            
              return dispatch({
                type : POKE_POST,
                payload
              })
         }
  };

  export function getTypes(){
    return async function (dispatch) {
      var json = await axios.get("http://localhost:3001/types");
      return dispatch({
        type: GET_TYPES,
        payload: json.data
      })
    }
  }

  export const filterByCreate =(payload) => {
      return{
        type: FILTER_BY_CREATE,
        payload
      }
  }

  export const orderByName = (payload) => {
    return {
      type: ORDER_BY_NAME,
      payload
    }
  }
  
  export const orderByAttack = (payload) => {
    return {
      type: ORDER_BY_ATTACK,
      payload
    }
  }
  export const filterByType = (type)=>{
    return{
      type: FILTER_BY_TYPE,
      payload: type,
    }
  }
  export const clearDetail = () => {
    return {
      type: CLEAR_DETAIL,
    };
  };
  export const clearHome = () => {
    return {
      type : CLEAR_HOME,
    }
  }
  export const empty = ()=>{
    return{
      type : EMPTY,
    }
  }

  