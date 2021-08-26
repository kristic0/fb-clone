import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Postavi.css";

import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import axios from 'axios';

const Postavi = () => {

  const [content, postaviContent] = useState("");
  const [slika, postaviSliku] = useState("");
  let logovaniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"))
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    let logovaniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"))

    //let vreme = new Date().toLocaleString()
    axios.post('/user/addPost', logovaniKorisnik._id, content, slika )
    .then(res => {
      console.log(res);
    })



    postaviContent("");
    postaviSliku("");
  };

  return (
    <div className="postavi">
      <div className="postavi__vrh">
        <Avatar src={logovaniKorisnik.profilnaSlika} />
        <form>
          <input
            type="text"
            className="postavi__unos"
            placeholder="O čemu razmišljate?"
            value={unos}
            onChange={(e) => postaviContent(e.target.value)}
          />
          <input
            value={slika}
            placeholder="URL slike..."
            onChange={(e) => postaviSliku(e.target.value)}
            
            className="postavi__fajl"
          />
          <button onClick={handleSubmit} type="submit">
            Skrivena potvrda
          </button>
        </form>
      </div>

      <div className="postavi__dno">
        <div className="postavi__dugme">
          <VideocamIcon style={{ color: "red" }} />
          <h3>Prenos uživo</h3>
        </div>
        <div className="postavi__dugme">
          <PhotoLibraryIcon style={{ color: "green" }} />
          <h3>Fotografija/video</h3>
        </div>
        <div className="postavi__dugme">
          <InsertEmoticonIcon style={{ color: "orange" }} />
          <h3>Osećanje/aktivnost</h3>
        </div>
      </div>
    </div>
  );
};

export default Postavi;
