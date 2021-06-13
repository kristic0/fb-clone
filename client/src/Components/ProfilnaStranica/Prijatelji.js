import React from 'react';
import SearchIcon from "@material-ui/icons/Search";

import "./Prijatelji.css";

let prijatelji = [
    {ime:'prvi', slika:'https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238599.jpg'},
    {ime:'drugi',slika:'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlc2h8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'},
    {ime:'treci',slika:'https://images.unsplash.com/photo-1610085927744-7217728267a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVsbCUyMGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'},
    {ime:'cetvrti',slika:'https://images.unsplash.com/photo-1610085927744-7217728267a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVsbCUyMGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'},
    {ime:'peti',slika:'https://images.unsplash.com/photo-1610085927744-7217728267a6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVsbCUyMGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'}
];


const Prijatelji =()=>{

    return(
        <div className="divPrijatelji">
            <div className="divCeoPrijatelji">

            <div className="divNaslov">
                    <h1>Prijatelji</h1>
                    <div className="pretragaPrijatelja">
                    <SearchIcon/>
                    <input placeholder='Pretraga' type="text" />
                    </div>
             </div>
                <div className="divDole">
                    {prijatelji.map(prijatelj => (
                        <div className="divPrikazPrijatelj" key={prijatelj.ime}>
                            <div className="divPrijateljSlika"><img src={prijatelj.slika} alt="" /></div>
                            <div className="divPrijateljIme">{prijatelj.ime}</div>
                        </div>
                    ))}
                </div>

            </div>
            </div>
    )
}

export default Prijatelji;