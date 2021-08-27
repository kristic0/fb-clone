import React from 'react'
import Prica from './Prica'
import './PricaPregled.css'

let price = [
{ime:'Peter Griffin',profilna:'',slika:'https://images-ext-2.discordapp.net/external/6318OfEXwsmab0rgSrH5-Dh3Ob18y__VugQv2g_u5M4/https/m.media-amazon.com/images/I/41cuQnJf5kL._AC_.jpg'},
{ime:'Louis Griffin',profilna:'',slika:'https://upload.wikimedia.org/wikipedia/en/a/a5/Lois_Griffin.png'}, 
{ime:'Brian Griffin',profilna:'',slika:'https://www.kindpng.com/picc/m/153-1530010_brian-griffin-and-vinny-griffin-hd-png-download.png'}, 
{ime:'Megan Griffin',profilna:'',slika:'https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Meg_Griffin.png/220px-Meg_Griffin.png'}, 
{ime:'Chris Griffin',profilna:'',slika:'https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Chris_Griffin.png/220px-Chris_Griffin.png'}]; 
const PricaPregled = () => {
    let logovaniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"));
    return (
        <div className='pricaPregled'>
            {
                price.map((s) => 
                <Prica
                slika={s.slika}
                profilna={s.profilna}
                ime={s.ime}
            />
            )}

           
    
        </div>
    )
}

export default PricaPregled
