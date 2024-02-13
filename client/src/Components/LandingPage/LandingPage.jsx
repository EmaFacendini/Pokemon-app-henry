import React from "react";
import style from './LandingPage'
import {Link} from "react-router-dom"


const LandingPage = () => {
    return (
        <div className="LandingPage">
          

            <div className="tittle" >
                <img src="" alt="welcome to my pokemon's application" />
            </div>
            <Link to = "/home">
                <button className="buttonImage" ><img src="" alt="" /></button>
            </Link>

            <img src="https://fontmeme.com/permalink/230302/c7cbcd67def5c92fb7afefcff79ab4de.png" alt="Created by Lisandro Romero" className="createdBy" />

          
        </div>

    )
};

export default LandingPage;