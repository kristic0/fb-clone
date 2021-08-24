import React from 'react'

import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from '@material-ui/icons/Chat'
import StorefrontIcon from '@material-ui/icons/Storefront'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import ExpandMoreOutlined from '@material-ui/icons/ExpandLessOutlined'
import BocnaTrakaRed from './BocnaTrakaRed.js'



const BocnaTraka = () => {
   

    return (
        <div className='bocnaTraka'>
            <BocnaTrakaRed src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
            naslov='Nikola Francuski' />
            <BocnaTrakaRed Icon={LocalHospitalIcon}
            naslov='COVID-19 Informativni centar' />
            <BocnaTrakaRed Icon={EmojiFlagsIcon}
            naslov='Grupe' />
            <BocnaTrakaRed Icon={PeopleIcon}
            naslov='Prijatelji' />
            <BocnaTrakaRed Icon={ChatIcon}
            naslov='Messenger' />
            <BocnaTrakaRed Icon={StorefrontIcon}
            naslov='Prodavnica' />
            <BocnaTrakaRed Icon={VideoLibraryIcon}
            naslov='Gledaj' />
            <BocnaTrakaRed Icon={ExpandMoreOutlined}
            naslov='More' />
            

                       
        </div>
    )
}

export default BocnaTraka
