import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import FlagIcon from "@material-ui/icons/Flag";
import SubscriptionsOutlinedIcon from "@material-ui/icons/SubscriptionsOutlined";
import StorefrontOutLinedIcon from "@material-ui/icons/StorefrontOutlined";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

import { Avatar, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ReactComponent as KaretIkonica } from "./icons/caret.svg";
import { ReactComponent as ZubcanikIkonica } from "./icons/cog.svg";
import { ReactComponent as CevronIkonica } from "./icons/chevron.svg";
import { ReactComponent as KaretDole } from "./icons/caret-down.svg";
import { ReactComponent as Katanac } from "./icons/154684.svg";
import { ReactComponent as Upitnik } from "./icons/question-mark-svgrepo-com.svg";

import { CSSTransition } from "react-transition-group";
import { useState } from "react";

import "./App.css";
//import Sidebar from "./Components/Sidebar";
//import Feed from "./Components/Feed";
import Header from "./Components/Header";
import GlavniJS from "./Components/ProfilnaStranica/GlavniJS";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app__body">{GlavniJS()}</div>
    </div>
  );
}

export default App;
