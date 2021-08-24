import React from 'react'
import Sidebar from "./Components/Sidebar/Sidebar";
import Feed from "./Components/Feed/Feed";
import Header from "./Components/Header";
import FriendsBar from './Components/FriendsBar/FriendsBar'
import "./App.css";



function SpojZaFid() {
    return (
        <div className = 'app__body'>
        <Header/>
        <div>
            
            <Sidebar/>
            <Feed/>
            <FriendsBar></FriendsBar>

            
        </div>
        </div>
    )
}

export default SpojZaFid
