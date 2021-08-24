import React, { useState } from 'react'
import './Novosti.css'
import Objava from './Objava'
import Postavi from './Postavi'
import PricaPregled from './Prica/PricaPregled'

const Novosti = () => {
    
    return (
        <div className='novosti'>
            <PricaPregled />
            <Postavi />
            <Objava
                profilna='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' 
                tekst='Moj prvi post!'
                vreme='1629999999990'
                slika='' 
                imeKorisnika='Nikola Francuski' 
            />


            
        </div>
    )
}

export default Novosti
