import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPokemon, getTypes, empty } from "../../Redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import validate from "./validate"

import "./Form.module.css"


/*function validate(pokemon){
  let errors = {};
  if (!pokemon.name){
    errors.name = "Se requiere un nombre"
  } return errors
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.pokeTypes);

  const [errors,setErrors] = useState({});

  const [pokemon, setPokemon] = useState({
    name: "",
    types: [],
    image: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
  });

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  function handleSelect(e) {
    setPokemon({
      ...pokemon,
      type: [...pokemon.types, e.target.value],
    });
  }


function onInputChange(e) {
  e.preventDefault();
  setPokemon({
    ...pokemon,
    [e.target.name]: e.target.value,
  });
  setErrors(
    validate({
      ...pokemon,
      [e.target.name]: e.target.value,
    })
  );
}


function onSubmit(e) {
  e.preventDefault();
  dispatch(createPokemon(pokemon));
  alert("Personaje creado con exito");
  setPokemon({
    name: "",
    types: [],
    image: "",
    life: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
  });
  history.push("/home");
}

  return (
    <form className="form" onSubmit={onSubmit}>
      <h3 className="title"> ¡Crea tu pokemon!</h3>
      
        <label for="name"> Nombre: </label>
        <input
          onChange={onInputChange}
          id="name"
          name="name"
          type="text"
          value={pokemon.name}
          required
          className="input"
        />{" "}
        {errors.name && <p className="error"> {errors.name}</p>}
     
     
        <label htmlFor="">Imagen: </label>
        <input
          onChange={onInputChange}
          name="image"
          type="text"
          value={pokemon.image}
          className="input"
        />{" "}
      
      
        {" "}
        <label htmlFor="">Vida: </label>
        <input
          onChange={onInputChange}
          name="life"
          type="number"
          value={pokemon.life}
          className="input"
        />{" "}
    
     
        <label htmlFor="">Fuerza: </label>
        <input
          onChange={onInputChange}
          name="attack"
          type="number"
          value={pokemon.attack}
          className="input"
        />{" "}
     
     
        <label htmlFor="">Defensa: </label>
        <input
          onChange={onInputChange}
          name="defense"
          type="number"
          value={pokemon.defense}
          className="input"
        />{" "}
     
     
        <label htmlFor="">Velocidad: </label>
        <input
          onChange={onInputChange}
          name="speed"
          type="number"
          value={pokemon.speed}
          className="input"
        />{" "}
      
     
        {" "}
        <label htmlFor="">Altura: </label>
        <input
          onChange={onInputChange}
          name="height"
          type="number"
          value={pokemon.height}
          className="input"
        />{" "}
     
     
        <label htmlFor="">Peso: </label>
        <input
          onChange={onInputChange}
          name="weight"
          type="number"
          value={pokemon.weight}
          className="input"
        />{" "}
      
      
        {" "}
        <p className="types-s">
        <select onChange={handleSelect}>
          {types.map((e) => (
            <option  value={e.name}>{e.name}</option>
          ))}{" "}
        </select>
        <ul>
          <li>{pokemon.types.map((e) => e + " , ")}</li>
        </ul>
        </p>
        <Link to="/home">
      <button type="submit" className="atras">Atrás</button></Link>
      <button type="submit" className="bottom">Crear</button>
    </form>
  );
}*/

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.pokeTypes);
  const pokemon = useSelector((state) => state.allPokemon);
  const history = useHistory();

  const [error, setError] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validate({ ...input, [e.target.name]: e.target.value }, pokemon));
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
      setError(
        validate({ ...input, types: [...input.types, e.target.value] }, pokemon)
      );
    } else {
      setInput({
        ...input,
        types: input.types.filter(
          (c) => input.types.indexOf(c) !== input.types.indexOf(e.target.value)
        ),
      });
      setError(
        validate(
          {
            ...input,
            types: input.types.filter(
              (c) =>
                input.types.indexOf(c) !== input.types.indexOf(e.target.value)
            ),
          },
          pokemon
        )
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    console.log({
      name: input.name,
      hp: Number(input.hp),
      attack: Number(input.attack),
      defense: Number(input.defense),
      speed: Number(input.speed),
      height: Number(input.height),
      weight: Number(input.weight),
      types: input.types.map((type) => {
        for (let i = 0; i < types.length; i++) {
          if (types[i].name === type) return types[i].id
        }
      })
    });
    dispatch(createPokemon({
      name: input.name,
      hp: Number(input.hp),
      attack: Number(input.attack),
      defense: Number(input.defense),
      speed: Number(input.speed),
      height: Number(input.height),
      weight: Number(input.weight),
      types: input.types.map((type) => {
        for (let i = 0; i < types.length; i++) {
          if (types[i].name === type) return types[i].id
        }
      })
    }));
    alert("Pokemon registrado con exito");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
    dispatch(empty());
    history.push("/home");
  };

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  console.log(input.types);
  return (
    <div className="containerForm">
      <Link to={"/home"}>
        <button  className="homeButton">Go home</button>
      </Link>
      <div className="createPokemonContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form" >
            <div className="inputsAndTypes">
            <div className="inputs" >

              <div>
                <label className="formLabel">Name:</label>
                <input
                  autoComplete="off"
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="formLabel">Hp:</label>
                <input
                  type="number"
                  value={input.hp}
                  name="hp"
                  placeholder="1-255"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="formLabel">Attack:</label>
                <input
                  type="number"
                  value={input.attack}
                  name="attack"
                  placeholder="1-190"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="formLabel">Defense:</label>
                <input
                  type="number"
                  value={input.defense}
                  name="defense"
                  placeholder="1-250"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="formLabel">Speed:</label>
                <input
                  type="number"
                  value={input.speed}
                  name="speed"
                  placeholder="1-200"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="formLabel">Height:</label>
                <input
                  type="number"
                  value={input.height}
                  name="height"
                  placeholder="1-200"
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="formLabel">Weight:</label>
                <input
                  type="number"
                  value={input.weight}
                  name="weight"
                  placeholder="1-1000"
                  required
                  onChange={handleChange}
                />
              </div>

             
            </div>
            <div className="types" >

              <h3 className="typesTittle">Types:</h3>
              <div className="typesCreate">
                {types?.map((type) => (
                  <div className="typeCreate" key={type.id}>
                    <label >{type.name}</label>
                    <input
                      type={"checkbox"}
                      value={type.name}
                      name={type.name}
                      onChange={(e) => handleCheck(e)}
                    />
                  </div>
                ))}
              </div>
            

            </div>
            </div>
            <div className="errors">
                {error.name && <p className="pStyled">{error.name}</p>}
                {error.hp && <p className="pStyled">{error.hp}</p>}
                {error.atk && <p className="pStyled">{error.attack}</p>}
                {error.def && <p className="pStyled">{error.defense}</p>}
                {error.speed && <p className="pStyled">{error.speed}</p>}
                {error.height && <p className="pStyled">{error.height}</p>}
                {error.weight && <p className="pStyled">{error.weight}</p>}
                {error.types && <p className="pStyled">{error.types}</p>}
              </div>
            <div>
            <button
              className="homeButton"
              type="submit"
              disabled={
                error.name ||
                error.hp ||
                error.attack ||
                error.defense ||
                error.speed ||
                error.height ||
                error.weight ||
                error.types
              }
            >
              Create new Pokemon
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePokemon;