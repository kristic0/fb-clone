
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import  HomeIcon  from '@material-ui/icons/Home'
import  FlagIcon  from '@material-ui/icons/Flag'
import  SubscriptionsOutlinedIcon  from '@material-ui/icons/SubscriptionsOutlined'
import  StorefrontOutLinedIcon  from '@material-ui/icons/StorefrontOutlined'
import  SupervisedUserCircleIcon  from '@material-ui/icons/SupervisedUserCircle'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import { Avatar, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ForumIcon from '@material-ui/icons/Forum'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {ReactComponent as KaretIkonica} from './icons/caret.svg';
import {ReactComponent as ZubcanikIkonica} from './icons/cog.svg';
import {ReactComponent as CevronIkonica} from './icons/chevron.svg';
import { ReactComponent as KaretDole } from './icons/caret-down.svg';
import {ReactComponent as Katanac} from './icons/154684.svg';
import {ReactComponent as Upitnik} from './icons/question-mark-svgrepo-com.svg';



import {CSSTransition} from 'react-transition-group';
import {useState} from 'react';

import './App.css';
import './Header.css';

const Header = () => {
    return (
        <div
        className='header'>
            <div className='header__levi'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/600px-Facebook_f_logo_%282019%29.svg.png" 
                alt="Facebook logo"/>
            </div>

            <div className="header__unos">
                <SearchIcon />
                <input placeholder='Pretrazi 
                Fejsbuk' type="text" />
            </div>

            <div className="header__centar">
                <div className="header__opcije 
                header__opcije--aktivno">
                    <HomeIcon fontsize='large' />
                </div>
                <div className="header__opcije">
                    <FlagIcon fontsize='large' />
                </div>
                <div className="header__opcije">
                    <SubscriptionsOutlinedIcon fontsize='large' />
                </div>
                <div className="header__opcije">
                    <StorefrontOutLinedIcon fontsize='large' />
                </div>
                <div className="header__opcije">
                    <SupervisedUserCircleIcon fontsize='large' />
                </div>
            </div>

            <div className="header__desni">
                    <div className="header__info">
                        <Avatar />
                        <h4>Pavle</h4>

                    </div>

                    <IconButton>
                        <AddIcon />
                    </IconButton>

                    <IconButton>
                        <ForumIcon />
                    </IconButton>

                    <IconButton>
                        <NotificationsActiveIcon />
                    </IconButton>

                    <NavItem icon = {<KaretDole/>}>
                        <DropdownMenu></DropdownMenu>
                    </NavItem>

                </div>   
        </div>   
    )
    
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
        
        >
          <div className = "menu">

      <DropdownItem leftIcon = {<Avatar/>}>Moj Profil</DropdownItem>
      <DropdownItem 
        leftIcon = {<ZubcanikIkonica/>}
        rightIcon = {<CevronIkonica/>}
        goToMenu = "settings">
        Opcije
          
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

          <DropdownItem leftIcon = {<KaretDole/>}  goToMenu = "main"/>
          <DropdownItem leftIcon = {<ZubcanikIkonica/>}>Opcije</DropdownItem>   
          <DropdownItem leftIcon = {<Katanac/>}>Sigurnosne Opcije</DropdownItem> 
          <DropdownItem leftIcon = {<Upitnik/>}>Pomoc i Podrska</DropdownItem> 
  
    </div>
      </CSSTransition>
    </div>
  );
  }
}
export default Header
