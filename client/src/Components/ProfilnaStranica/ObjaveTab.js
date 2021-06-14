import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import {Avatar} from "@material-ui/core";
import VideocamIcon from '@material-ui/icons/Videocam';
import ImageIcon from '@material-ui/icons/Image';
import TuneIcon from '@material-ui/icons/Tune';
import SettingsIcon from '@material-ui/icons/Settings';
import ReorderIcon from '@material-ui/icons/Reorder';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import Post from "../Post";
import "./ObjaveTab.css";

let mesto = "Zrenjanin";
let skola = "Srednja uzaludna";
let posao = "Tamo negde";
let slika = "https://images.unsplash.com/photo-1468083684825-012f39547b23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80";
let prijatelj = "Candice";


class ObjaveTab extends React.Component {
    constructor(props) { 
        super();
    }
 
    render() {
        return(
            <div className="divDoleObjave">
            <div className="divTabovi">
            <div className="divUvod">
            <h1>Uvod</h1>
                <ul className="listaUvod">
                    <li><LocationOnIcon className="lokacija"/> Iz mesta {mesto}</li>
                    <li><SchoolIcon className="skola"/> Pohađa/o {skola}</li>
                    <li><WorkIcon className="posao"/>Radi u {posao}</li>
                    <li className="izmena">Izmenite detalje</li>
                    <li className="dodavanje">Dodajte podatke</li>
                </ul>
            </div>
            <div className="razmisljanje">
                <div className="razmisljanjeGornjiDeo"><div className="noviStatus"><Avatar/><h1>O cemu razmisljate?</h1></div></div>
                <div className="razmisljanjeDonjiDeo"><div className="kamera"><VideocamIcon className="prenosUzivo"/>
                <h1>Prenos uzivo</h1></div>
                <div className="fotoVideo"><ImageIcon className="foto"/>
                <h1>Fotografija/Video</h1></div>
                
                </div>
                
                
            </div>
            <div className="fotografije">
                <h1 onClick= { () => { this.props.setStanjeParentComponent(4) } } >Fotografije</h1>
                <div>
                    <div className="vrsta">
                        <div className="kolona"><img src={slika} alt="slika1" /></div>
                        <div className="kolona"><img src={slika} alt="slika2" /></div>
                        <div className="kolona"><img src={slika} alt="slika3" /></div>
                    </div>
                    <div className="vrsta">
                        <div className="kolona"><img src={slika} alt="slika4" /></div>
                        <div className="kolona"><img src={slika} alt="slika5" /></div>
                        <div className="kolona"><img src={slika} alt="slika6" /></div>
                    </div>
                    <div className="vrsta">
                        <div className="kolona"><img src={slika} alt="slika7" /></div>
                        <div className="kolona"><img src={slika} alt="slika8" /></div>
                        <div className="kolona"><img src={slika} alt="slika9" /></div>
                    </div>
                </div>
            </div>
            <div className="objaveOpcije">
                <div className="objaveGornjiDeo">
                <h1>Objave</h1>
                <div className="filteri"><TuneIcon/><h1>Filteri</h1></div>
                <div className="upravljanje"><SettingsIcon/><h1>Upravljanje objavama</h1></div>
                </div>
                
                <div className="objaveDonjiDeo">
                    <div className="prikazUViduListe"><ReorderIcon/><h1>Prikaz u vidu liste</h1></div>
                    <div className="prikazUViduMreze"><ViewModuleIcon/><h1>Prikaz u vidu mreze</h1></div>
                </div>
    
            </div>
                
            <div className="prijatelji">
            <div className="gridPrijatelji">
                <h1 onClick= { () => { this.props.setStanjeParentComponent(3) } }>Prijatelji</h1>
                <div>
                    <div className="prijateljiVrsta">
                        <div className="prijateljiKolona"><img src={slika} alt="slika1" />{prijatelj}</div>
                        <div className="prijateljiKolona"><img src={slika} alt="slika2" />{prijatelj}</div>
                        <div className="prijateljiKolona"><img src={slika} alt="slika3" />{prijatelj}</div>
                    </div>
                    <div className="prijateljiVrsta">
                        <div className="prijateljiKolona"><img src={slika} alt="slika4" />{prijatelj}</div>
                        <div className="prijateljiKolona"><img src={slika} alt="slika5" />{prijatelj}</div>
                        <div className="prijateljiKolona"><img src={slika} alt="slika6" />{prijatelj}</div>
                    </div>
                    <div className="prijateljiVrsta">
                        <div className="prijateljiKolona"><img src={slika} alt="slika7" />{prijatelj}</div>
                        <div className="prijateljiKolona"><img src={slika} alt="slika8" />{prijatelj}</div>
                        <div className="prijateljiKolona"><img src={slika} alt="slika9" />{prijatelj}</div>
                    </div>
                </div>
            </div>
    
            </div>
    
            <div className="objave">
                <h1>Neke objave </h1><Post/>
            </div>
    
            </div>
            </div>
        )
    }
}


export default ObjaveTab;