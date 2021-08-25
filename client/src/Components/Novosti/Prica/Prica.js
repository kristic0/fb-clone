import { Avatar } from '@material-ui/core'
import React from 'react'
import './Prica.css'

const Prica = ({ slika, profilna, ime}) => {
    return (
        <div style={{ backgroundImage: `url(${slika})`}} 
        className='prica'>
            <Avatar src={profilna} className='prica__avatar' />
            <h4>{ime}</h4>
        </div>
    )
}

export default Prica
 