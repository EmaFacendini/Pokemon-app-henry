import React from "react";
import './LandingPage.css'
import {Link} from "react-router-dom"
import logo from "../image/logo.png"
import pokebolaini from "../image/pokebolaini.png"


const LandingPage = () => {
    return (
        <div className="LandingPage">
          

            <div className="tittle" >
                <img src={logo} alt="welcome to my pokemon's application" className="createdBy" />
            </div>
            
           
            <Link to="/home" className="imageButton">
    <img src={pokebolaini} alt="" />
</Link>
          
            <img src="https://i.pinimg.com/originals/66/89/dc/6689dc331be27e66349ce9a4d15ddff3.gif" alt="pokeApi By Ema Facendini" className="pikachuRun" />
            

          
        </div>

    )
};

export default LandingPage;