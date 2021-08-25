import React from 'react'
import { Avatar } from '@material-ui/core'
import './PrijateljiTrakaRed.css'

const PrijateljiTrakaRed = ({ src, ime}) => {
    return (
        <div className='prijateljiTrakaRed'>
            {src && <Avatar src={src} />}
            <p>{ime}</p>
            
        </div>
    )
}

export default PrijateljiTrakaRed