import React from 'react'
import BocnaTraka from '../BocnaTraka/BocnaTraka'
import Novosti from './Novosti'
import PrijateljiTraka from '../PrijateljiTraka/PrijateljiTraka'
import Header from '../Header'

const MainPage = () => {
    return (
        <>
          <Header/>
<div className="app__body">
            <BocnaTraka/>
            <Novosti />
            <PrijateljiTraka/>
          </div>   
        </>
    )
}

export default MainPage