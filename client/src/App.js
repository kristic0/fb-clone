
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
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el){
    const height = el.offsetHeight;
    setMenuHeight(height);
  }



  function DropdownItem(props){
    return(
      <a href = "#" className = "menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
          <span className = "icon-button">{props.leftIcon}</span>
          {props.children}
          <span className = "icon-right">{props.rightIcon}</span>

      </a>
    );


  }

  return(
    <div className="dropdown" style = {{height: menuHeight}}>

      <CSSTransition
        in = {activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames = "menu-primary"
        onEnter = {calcHeight}
        >
          <div className = "menu">

      <DropdownItem>My profile</DropdownItem>
      <DropdownItem 
        leftIcon = {<ZubcanikIkonica/>}
        rightIcon = {<CevronIkonica/>}
        goToMenu = "settings"
        >
        Settings
          
      </DropdownItem>
    </div>
      </CSSTransition>

      <CSSTransition
        in = {activeMenu === 'settings'}
        unmountOnExit
        timeout={500}
        classNames = "menu-secondary"
        >
          <div className = "menu">


      
      <DropdownItem leftIcon = {<StrelicaIkonica/>}  goToMenu = "main"/>
        <DropdownItem>Settings</DropdownItem>   

          <DropdownItem>Settings</DropdownItem> 
          <DropdownItem>Profil</DropdownItem> 
          <DropdownItem>Druge Opcije</DropdownItem> 
          <DropdownItem>OKEJ OV JE TEST SAMO</DropdownItem> 
          <DropdownItem>Settings</DropdownItem> 
          <DropdownItem>Settings</DropdownItem> 
          <DropdownItem>Settings</DropdownItem>  
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
