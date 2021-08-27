import React, { useState, useEffect } from "react";
import BocnaTraka from "../BocnaTraka/BocnaTraka";
import Novosti from "./Novosti";
import PrijateljiTraka from "../PrijateljiTraka/PrijateljiTraka";
import Header from "../Header";
import "./MainPage.css";
import Objava from "./Objava";
import axios from "axios";

let data = [
  {
    name: "fdas",
    profilnaSlika: "fdas1",
    post: {
      id: "1",
      content: "fdasfdasfdasfdsa",
    },
  },
  {
    name: "fdas2",
    profilnaSlika: "fdas2",
    post: {
      id: "2",
      content: "fdasfdasfdasfdsa2",
    },
  },
  {
    name: "fdas3",
    profilnaSlika: "fdas3",
    post: {
      id: "3",
      content: "fdasfdasfdasfdsa3",
    },
  },
];

const MainPage = () => {
  return (
    <>
      <Header />
      <div className="app__body">
        <BocnaTraka />
        <Novosti />
        <PrijateljiTraka />
      </div>
    </>
  );
};

export default MainPage;
