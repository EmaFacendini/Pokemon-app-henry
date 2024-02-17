import React from "react";
import style from './LandingPage'
import logo from "../image/logo.png"
import {Link} from "react-router-dom"


const LandingPage = () => {
    return (
        <div className="LandingPage">
          

            <div className={style.tittle} >
                <img src={logo} alt="welcome to my pokemon's application" />
            </div>
            <Link to = "/home">
                <button className="buttonImage" ><img src="" alt="" /></button>
            </Link>

            <img src="" alt="pokeApi By Ema Facendini" className={style.createdBy} />

          
        </div>

    )
};

export default LandingPage;