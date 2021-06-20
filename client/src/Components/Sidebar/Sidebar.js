import React from 'react'

import './Sidebar.css'
import SidebarRow from './SidebarRow'

import LocalHospitalIcon from '@material-ui/icons/LocalHospital'
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags'
import PeopleIcon from '@material-ui/icons/People'
import ChatIcon from '@material-ui/icons/Chat'
import StorefrontIcon from '@material-ui/icons/Storefront'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import ExpandMoreOutlined from '@material-ui/icons/ExpandLessOutlined'



const Sidebar = () => {
   

    return (
        <div className='sidebar'>
            <SidebarRow src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
            title='Shinguyaba' />
            <SidebarRow Icon={LocalHospitalIcon}
            title='COVID-19 Information Center' />

            <SidebarRow Icon={EmojiFlagsIcon}
            title='Pages' />
            <SidebarRow Icon={PeopleIcon}
            title='Friends' />
            <SidebarRow Icon={ChatIcon}
            title='Messenger' />
            <SidebarRow Icon={StorefrontIcon}
            title='Marketplace' />
            <SidebarRow Icon={VideoLibraryIcon}
            title='Videos' />
            <SidebarRow Icon={ExpandMoreOutlined}
            title='More' />
            

            <SidebarRow />            
        </div>
    )
}

export default Sidebar
