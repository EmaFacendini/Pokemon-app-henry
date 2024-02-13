import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail, clearDetail} from "../../Redux/actions/actions";
import { Link, useParams } from "react-router-dom";
import './Detail.css'

const PokemonDepth = () => {
  const dispatch = useDispatch();
  const pokemonByID = useSelector((state) => state.pokeDetail);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getPokemonDetail(id));
    dispatch(clearDetail());
  }, [dispatch, id]);

  if (pokemonByID.length === 0) {
    return (
      <div className="loading__id">
        <div>
          <img className="loadin__img" alt="Loading" />
        </div>
      </div>
    );
  } else {
    // console.log(pokemonByID);
    return (
      <div className="container__pokemon">
        <div className="id__card">
          <img className="logo__id"  alt="Pokemon" />
          <div>
            <div className="pokemon__id">
              <img
                className="size__img"
                src={pokemonByID.img}
                alt={pokemonByID.name}
              />
            </div>
            <div className="item">
              <div className="letras__chinas">
                <p>ポケットモンスター</p>
              </div>
              <div className="id">
                <h1>#{pokemonByID.id}</h1>
              </div>
              <div className="name_id">
                <h2>{pokemonByID.name}</h2>
              </div>
              {/* ================= */}
              <div className="details_poke">
                <div>
                  <p className="emojis">🩸 health {pokemonByID.health}</p>
                  <progress max="100" value={pokemonByID.health}></progress>
                </div>
                <div>
                  <p className="emojis">💨 speed {pokemonByID.speed}</p>
                  <progress max="100" value={pokemonByID.speed}></progress>
                </div>
                <div>
                  <p className="emojis">🗡 attack {pokemonByID.attack}</p>
                  <progress max="100" value={pokemonByID.attack}></progress>
                </div>
                <div>
                  <p className="emojis">🛡 defense {pokemonByID.defense}</p>
                  <progress max="100" value={pokemonByID.defense}></progress>
                </div>
                <div>
                  <p className="emojis">📏 height {pokemonByID.height}</p>
                  <progress max="100" value={pokemonByID.height}></progress>
                </div>
                <div>
                  <p className="emojis">🟣 weight {pokemonByID.weight}</p>
                  <progress max="100" value={pokemonByID.weight}></progress>
                </div>
              </div>
              {/* ========== */}
            </div>
          </div>
          {pokemonByID.types.length === 2 ? (
                  <div>
                    <h3 className="type1">
                    <ul className="type">
                      <li>
                        {
                        typeof pokemonByID.types[0] === 'string' ? pokemonByID.types[0] : pokemonByID.types[0]?.name}-  
                         {
                         typeof pokemonByID.types[1] === 'string' ? pokemonByID.types[1] : pokemonByID.types[1]?.name}
                
                      </li>
                    </ul>
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3 className="type2">{
                    typeof pokemonByID.types[0] === 'string' ? pokemonByID.types[0] : pokemonByID.types[0]?.name}</h3>
                  </div>
                )}
          <div className="btn__position">
            <Link to="/home">
              <button className="buttonDark">Home</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};
export default PokemonDepth;