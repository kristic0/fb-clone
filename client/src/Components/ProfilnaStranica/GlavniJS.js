import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CreateIcon from '@material-ui/icons/Create';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import "./GlavniCSS.css";
import ObjaveTab from "./ObjaveTab.js";
import Informacije from "./Informacije.js";
import Prijatelji from "./Prijatelji.js";
import Fotografije from "./Fotografije.js";

let korisnickoIme = "Nikola Francuski";
let profilnaSlika ="https://images.unsplash.com/photo-1611316185995-9624c94487d1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80";
let naslovnaSlika = "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";

const GlavniJS= () => {
    
    const [stanje, setStanje] = useState(1);

    const kojeStanje = (index) =>{
        setStanje(index);
    }

    return(
        <div className="glavniDiv">
            <div className="gornjiDeo">
            <div className="divBeo">
                <img className="naslovnaSlika" src={naslovnaSlika} alt="Naslovna Slika"/>
            
            <img className="profilnaSlika" src = {profilnaSlika} alt="Profilna Slika"/>
            <h1 className="korisnickoIme">{korisnickoIme}</h1>
            <div className="divListe">
            <ul className="meniLevo">
                <li className={stanje === 1 ? "aktivanLi" : "li"} onClick={() => kojeStanje(1)}>Objave</li>
                <li className={stanje === 2 ? "aktivanLi" : "li"} onClick={() => kojeStanje(2)}>Informacije</li>
                <li className={stanje === 3 ? "aktivanLi" : "li"} onClick={() => kojeStanje(3)}>Prijatelji </li>
                <li className={stanje === 4 ? "li" : "li"} onClick={() => kojeStanje(4)}>Još <ArrowDropDownIcon/></li>
            </ul>
            <ul className="meniDesno">
                <li className="pricaLi"><AddCircleIcon/>Dodajte u pricu</li>
                <li className="izmenaLi"><CreateIcon/>Izmenite profil</li>
                <li className="tackiceLi"><MoreHorizIcon/></li>
            </ul>
            </div>
            </div>

            </div>
            <div className="donjiDeo">
                <div className={stanje === 1 ? "aktivno" : "neaktivno"}>
                    <ObjaveTab setStanjeParentComponent = { setStanje } />
                </div>
                <div className={stanje === 2 ? "aktivno" : "neaktivno"}>
                    <Informacije/>
                </div>
                <div className={stanje === 3 ? "aktivno" : "neaktivno"}>
                    <Prijatelji/>
                </div>
                <div className={stanje === 4 ? "aktivno" : "neaktivno"}>
                    <Fotografije/>
                </div>
            </div>
        </div>
            
    )
}



export default GlavniJS;