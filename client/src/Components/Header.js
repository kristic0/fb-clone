import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import StorefrontOutLinedIcon from "@material-ui/icons/StorefrontOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import {Avatar, IconButton} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import {ReactComponent as KaretDole} from "../icons/caret-down.svg";
import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {ReactComponent as ZubcanikIkonica} from "../icons/cog.svg";
import {ReactComponent as CevronIkonica} from "../icons/chevron.svg";
import {ReactComponent as Katanac} from "../icons/154684.svg";
import {ReactComponent as Upitnik} from "../icons/question-mark-svgrepo-com.svg";


import "./Header.css";

const Header = () => {
    let logovaniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"))
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
                    <HomeIcon fontSize='large' />
                </div>
                <div className="header__opcije">
                    <FlagIcon fontSize='large' />
                </div>
                <div className="header__opcije">
                    <SubscriptionsOutlinedIcon fontSize='large' />
                </div>
                <div className="header__opcije">
                    <StorefrontOutLinedIcon fontSize='large' />
                </div>
                <div className="header__opcije">
                    <SupervisedUserCircleIcon fontSize='large' />
                </div>
            </div>

            <div className="header__desni">
                <div className="header__info">
                    <Avatar src={logovaniKorisnik.profilnaSlika} />
                    <h4>{logovaniKorisnik.name}</h4>

                    <IconButton>
                    <AddIcon />
                </IconButton>

                <IconButton>
                    <ForumIcon />
                </IconButton>

                <IconButton>
                    <NotificationsActiveIcon />
                </IconButton>
                </div>

                

                <NavItem icon = {<KaretDole/>}>
                    <SpustajuciMeni></SpustajuciMeni>
                </NavItem>

            </div>
        </div>
    )

    function NavItem(props) {

        const[open,setOpen] = useState(false);
        return (
            <li className="nav-item">
                <a href="#" className="ikonica-dugme" onClick = {() => setOpen(!open)}>
                    {props.icon}
                </a>

                {open && props.children}
            </li>
        );
    }
    function SpustajuciMeni(){

        const [activeMeni, setActiveMeni] = useState('main');
        const [meniVisina, setMeniVisina] = useState(null);

        function calcVisina(el){
            const visina = el.offsetVisina;
            setMeniVisina(visina);
        }

        function SpustajuciItem(props){
            return(
                <a href = "#" className = "meni-item" onClick={() => props.goToMeni && setActiveMeni(props.goToMeni)}>
                    <span className = "ikonica-dugme">{props.leftIcon}</span>
                    {props.children}
                    <span className = "icon-right">{props.rightIcon}</span>

                </a>
            );
        }

        return(
            <div className="spustanje" style = {{visina: meniVisina}}>

                <CSSTransition
                    in = {activeMeni === 'main'}
                    unmountOnExit
                    timeout={500}
                    classNames = "meni-primary"

                >
                    <div className = "meni">

                        <SpustajuciItem leftIcon = {<Avatar/>}>Moj Profil</SpustajuciItem>
                        <SpustajuciItem
                            leftIcon = {<ZubcanikIkonica/>}
                            rightIcon = {<CevronIkonica/>}
                            goToMeni = "settings">
                            Opcije

                        </SpustajuciItem>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in = {activeMeni === 'settings'}
                    unmountOnExit
                    timeout={500}
                    classNames = "meni-secondary"
                >
                    <div className = "meni">

                        <SpustajuciItem leftIcon = {<KaretDole/>}  goToMeni = "main"/>
                        <SpustajuciItem leftIcon = {<ZubcanikIkonica/>}>Opcije</SpustajuciItem>
                        <SpustajuciItem leftIcon = {<Katanac/>}>Sigurnosne Opcije</SpustajuciItem>
                        <SpustajuciItem leftIcon = {<Upitnik/>}>Pomoc i Podrska</SpustajuciItem>

                    </div>
                </CSSTransition>
            </div>
        );
    }
}

export default Header;