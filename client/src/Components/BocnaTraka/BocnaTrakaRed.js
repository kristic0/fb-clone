import React from 'react'
import { Avatar, Icon } from '@material-ui/core'
import './BocnaTrakaRed.css'

const BocnaTrakaRed = ({ src, Icon, naslov}) => {
    return (
        <div className='bocnaTrakaRed'>
            {src && <Avatar src={src} />}
            {Icon && <Icon />}

            <p>{naslov}</p>
            
        </div>
    )
}

export default BocnaTrakaRed
