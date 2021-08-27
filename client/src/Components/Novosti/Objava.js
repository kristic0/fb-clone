import React from "react";
import "./Objava.css";

import { Avatar } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import NearMeIcon from "@material-ui/icons/NearMe";
import AccountCircleIclon from "@material-ui/icons/AccountCircle";
import ExpandMoreOutlined from "@material-ui/icons/ExpandMoreOutlined";

const Objava = ({ profilna, imeKorisnika, tekst, slika, vreme }) => {
  return (
    <div className="objava">
      <div className="objava__vrh">
        <Avatar src={profilna} className="objava__avatar" />
        <div className="objava__vrhInfo">
          <h3>{imeKorisnika}</h3>
          <p>{vreme}</p>
        </div>
      </div>

      <div className="objava__dno">
        <p>{tekst}</p>
      </div>

      <div className="objava__slika">
        <img src={slika} alt="" />
      </div>

      <div className="objava__dugmad">
        <div className="objava__dugme">
          <ThumbUpIcon />
          <p>Sviđa mi se</p>
        </div>
        <div className="objava__dugme">
          <ChatBubbleOutlineIcon />
          <p>Komentar</p>
        </div>
        <div className="objava__dugme">
          <NearMeIcon />
          <p>Podeli</p>
        </div>
      </div>
    </div>
  );
};

export default Objava;
