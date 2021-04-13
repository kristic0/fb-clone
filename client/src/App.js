
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
import {CSSTransition} from 'react-transition-group';


function App() {
  return (
    <Navbar>
      <NavItem icon={<PlusIkonica/>} />
      <NavItem icon={<ZvonoIkonica/>} />
      <NavItem icon={<MessengerIkonica/>} />

      <NavItem icon = {<KaretIkonica/>}>
        
        {/* Ovde pisem spustajuci meni*/}
        <DropdownMenu />


      </NavItem>

    </Navbar>
  );
}

function DropdownMenu(){
  
  const [activeMenu, setActiveMenu] = useState('main'); // settings i zivotinje

  function DropdownItem(props){
    return(
      <a href = "#" className = "menu-item">
          <span className = "icon-button">{props.leftIcon}</span>
          {props.children}
          <span className = "icon-right">{props.rightIcon}</span>

      </a>
    );


  }

  return(
    <div className="dropdown">

      <CSSTransition
        in = {activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames = "menu-primary"
        >
          <div className = "menu">

      <DropdownItem>My profile</DropdownItem>
      <DropdownItem 
        leftIcon = {<ZubcanikIkonica/>}
        rightIcon = {<CevronIkonica/>}>Settings
          
      </DropdownItem>
    </div>
      
      </CSSTransition>


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
      <a href="#" className="icon-button" onClick = {() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );

}

export default App;
