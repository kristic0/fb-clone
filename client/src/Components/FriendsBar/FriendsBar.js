import React from 'react'

import './FriendsBar.css'
import FriendsBarRow from './FriendsBarRow'

const Sidebar = () => {
   

    return (
        <div className='friendsBar'>
            <p>Kontakti</p>
            <FriendsBarRow
            src='https://i.stack.imgur.com/l60Hf.png'
            name='Prijatelj 1'
            />
                       
        </div>
    )
}

export default Sidebar