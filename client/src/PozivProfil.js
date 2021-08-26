import React, {useState} from "react";

import GlavniJS from "./Components/ProfilnaStranica/GlavniJS";
import './PozivProfil.css'







const PozivProfil = () => {
  return (
    <>
 
      <div className="app__body">
        <GlavniJS/>
        {/* {()=>{GlavniJS()}} */}

      </div>
    </>
  );
};

export default PozivProfil;