import React from "react"
import style from "./Card.module.css"


export default function Card({ name, types, image }) {
  return (
    <div className="stylesCard">
      <h3 className="name"> {name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <img src={image} alt="imagen" className="img" width="120px" height="120px"/>
      {types.length === 2 ? (
                  <div>
                    <h3 className="type1">
                    <ul className="type">
                      <li>
                        {
                        typeof types[0] === 'string' ? types[0] : types[0]?.name}-  
                         {
                         typeof types[1] === 'string' ? types[1] : types[1]?.name}
                
                      </li>
                    </ul>
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3 className="type2">{
                    typeof types[0] === 'string' ? types[0] : types[0]?.name}</h3>
                  </div>
                )}
    </div>
  );
}


