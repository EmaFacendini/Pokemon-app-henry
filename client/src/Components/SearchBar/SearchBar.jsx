import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getByName } from "../../Redux/actions/actions"
import Styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("")


  
  const handleInputChange = (e) => {
    e.preventDefault()
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getByName(name))
  }

  return (
    <div>
      <input
        className="search"
        type="text"
        onChange= {(e) => handleInputChange(e)}
        placeholder="Buscar pokemon..."
      />
      <button className ="boton" type="submit" onClick= {(e) => handleSubmit(e)}> Buscar </button>
    </div>
  );
}