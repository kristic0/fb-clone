import React from 'react'

import './PrijateljiTraka.css'
import PrijateljiTrakaRed from './PrijateljiTrakaRed'
import friendsList from './databaseSimulation.json'


const PrijateljiTraka = () => {
   

    return (
        <div className='prijateljiTraka'>
            <p>Prijatelji</p>
            {/* <PrijateljiTrakaRed
            src='https://i.stack.imgur.com/l60Hf.png'
            ime='Prijatelj 1'
            />
            <PrijateljiTrakaRed
            src='https://i.stack.imgur.com/l60Hf.png'
            ime='Prijatelj 2'
            /> */}

            
            {
       friendsList.map(friend => <PrijateljiTrakaRed src={friend.profilnaSlika} ime={friend.ime + " " +friend.prezime} />)
            }
            
                       
        </div>
    )
}

export default PrijateljiTraka