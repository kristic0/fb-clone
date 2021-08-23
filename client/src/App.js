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
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";


import { Link } from 'react-router-dom';

import "./App.css";
import Login from './Login.js';
import Sidebar from "./Components/Sidebar";
import Feed from "./Components/Feed";
import Header from "./Components/Header";


function App() {
  return (
      <div className="App">
      <Router>
        <Switch>
          <Route path = "/login">
            <Login/>
          </Route>
        </Switch>
      </Router>
      </div>
  );
}

export default App;
