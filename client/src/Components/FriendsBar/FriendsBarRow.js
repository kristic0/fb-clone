import React from 'react'
import { Avatar } from '@material-ui/core'
import './FriendsBarRow.css'

const FriendsBarRow = ({ src, name}) => {
    return (
        <div className='friendsBarRow'>
            {src && <Avatar src={src} />}
            <p>{name}</p>
            
        </div>
    )
}

export default FriendsBarRow