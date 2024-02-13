import React from "react";
import CardsContainer from "../CardsContainer/CardContainer" 
import style from "./Home.module.css"


const Home = ()=>{
    return(
    <div className={style.home}>
        <CardsContainer/>
    </div>
 )
}




export default Home