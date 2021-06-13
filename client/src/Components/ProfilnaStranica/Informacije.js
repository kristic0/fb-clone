import React, { useState } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import LanguageIcon from '@material-ui/icons/Language';

import "./Informacije.css";
import Prijatelji from "./Prijatelji.js";

let mesto = "Zrenjanin";
let skola = "Neka skola";
let veza = "U braku";
let posao = "Nigde";
let detalji = "ASdasdasdad";
let mejl = "randomIme@gmail.com";
let pol = "musko";
let rodjendan = "28.12.1999";
let jezici = ["srpski","engleski"];
let datum = "12.06.2021";

const Informacije =() =>{

    const [stanje, setStanje] = useState(1);

    const kojeStanje = (index) =>{
        setStanje(index);
    }

    return(
        <div className="glavniDiv">
            <div className="divSve">
                <div className="informacije">
                    <div className="levoInformacije">
                    <h1>Informacije</h1>
                    <ul className="listaInformacija">
                        <li className={stanje === 1 ? "aktivanLiInfo" : "neaktivanLiInfo"} onClick={() => kojeStanje(1)}>Pregled</li>
                        <li className={stanje === 2 ? "aktivanLiInfo" : "neaktivanLiInfo"} onClick={() => kojeStanje(2)}>Posao i obrazovanje</li>
                        <li className={stanje === 3 ? "aktivanLiInfo" : "neaktivanLiInfo"} onClick={() => kojeStanje(3)}>Mesta na kojima je korisnik ziveo</li>
                        <li className={stanje === 4 ? "aktivanLiInfo" : "neaktivanLiInfo"} onClick={() => kojeStanje(4)}>Kontakt i osnovne informacije</li>
                        <li className={stanje === 5 ? "aktivanLiInfo" : "neaktivanLiInfo"} onClick={() => kojeStanje(5)}>Porodica i status veze</li>
                        <li className={stanje === 6 ? "aktivanLiInfo" : "neaktivanLiInfo"} onClick={() => kojeStanje(6)}>Detalji o vama</li>
                        <li className={stanje === 7 ? "aktivanLiInfo" : "neaktivanLiInfo"} onClick={() => kojeStanje(7)}>Zivotni dogadjaji</li>
                    </ul>
                    </div>
                    <div className="desnoInformacije">
                        <div className={stanje === 1 ? "aktivanDiv" : "neaktivanDiv"}>
                            <ul className="listaPregled">
                                <li><LocationOnIcon className="lokacija"/>Iz mesta {mesto}</li>
                                <li><SchoolIcon className="skola"/>Pohadja {skola}</li>
                                <li><FavoriteIcon className="veza"/>{veza}</li>
                                <li><WorkIcon className="posao"/>{posao}</li>
                            </ul>
                        </div>

                        <div className={stanje === 2 ? "aktivanDiv" : "neaktivanDiv"}>
                            <ul className="listaPosaoObrazovanje">
                                <h1>Posao</h1>
                                <li><WorkIcon className="posao"/>{posao}</li>
                                <h1>Obrazovanje</h1>
                                <li><SchoolIcon className="skola"/>Pohadja {skola}</li>
                            </ul>
                        </div>

                        <div className={stanje === 3 ? "aktivanDiv" : "neaktivanDiv"}>
                            <ul className="listaMesta">
                                <h1>Mesta na kojima je korisnik ziveo</h1>
                            <li><LocationOnIcon className="lokacija"/>Iz mesta {mesto}</li>
                            </ul>
                        </div>

                        <div className={stanje === 4 ? "aktivanDiv" : "neaktivanDiv"}>
                            <ul className="listaKontaktInfo">
                                <h1>Kontakt podaci</h1>
                            <li><MailIcon className="mejl"/>{mejl}</li>
                            <h1 className="osnovneInformacije">Osnovne informacije</h1>
                            <li><PersonIcon className="pol"/>{pol}</li>
                            <li><CakeIcon className="rodjendan"/>{rodjendan}</li>
                            <li><LanguageIcon className="jezici"/>{jezici}</li>
                            </ul>
                        </div>

                        <div className={stanje === 5 ? "aktivanDiv" : "neaktivanDiv"}>
                            <ul className="listaPorodicaVeza">
                                <h1>Veza</h1>
                                <li><FavoriteIcon className="veza"/>{veza}</li>
                            </ul>
                        </div>

                        <div className={stanje === 6 ? "aktivanDiv" : "neaktivanDiv"}>
                            <ul className="listaPorodicaVeza">
                                <h1>O vama</h1>
                                <li>{detalji}</li>
                            </ul>
                        </div>

                        <div className={stanje === 7 ? "aktivanDiv" : "neaktivanDiv"}>
                            <ul className="listaPorodicaVeza">
                                <h1>Zivotni dogadjaji</h1>
                                <li><SchoolIcon className="skola"/>Pohadja {skola} od {datum}</li>
                                <li><FavoriteIcon className="veza"/>{veza} od {datum}</li>
                                <li><WorkIcon className="posao"/>{posao} od {datum}</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <Prijatelji/>
            </div>
        </div>
    )
}

export default Informacije;