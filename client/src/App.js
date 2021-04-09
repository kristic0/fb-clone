
import './App.css';
import React, {useState} from 'react';
import {ReactComponent as ZvonoIkonica} from './icons/bell.svg';
import {ReactComponent as MessengerIkonica} from './icons/messenger.svg';
import {ReactComponent as KaretIkonica} from './icons/caret.svg';
import {ReactComponent as PlusIkonica} from './icons/plus.svg';
import {ReactComponent as ZubcanikIkonica} from './icons/cog.svg';
import {ReactComponent as CevronIkonica} from './icons/chevron.svg';
import {ReactComponent as StrelicaIkonica} from './icons/arrow.svg';
import {ReactComponent as MunjaIkonica} from './icons/bolt.svg';


function App() {
  return (
    <Navbar>
      <NavItem ikonica={<PlusIkonica/>} />
      <NavItem ikonica={<ZvonoIkonica/>} />
      <NavItem ikonica={<MessengerIkonica/>} />

      <NavItem ikonica = {<KaretIkonica/>}>
        
        {/* Ovde pisem spustajuci meni*/}
        <SpustajuciMeni />


      </NavItem>

    </Navbar>
  );
}

function SpustajuciMeni(){

  function SpustajuciItem(props){
    return(
      <a href = "#" className = "menu-item">

          {props.children}

      </a>
    );


  }


  return(
    <div className="spustanje">



    </div>
  );
}

function Navbar(props) {
  return (

    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );

}

function NavItem(props) {

  const[open,setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="ikonica-button" onClick = {() => setOpen(!open)}>
        {props.ikonica}
      </a>

      {open && props.children}
    </li>
  );

}

export default App;
