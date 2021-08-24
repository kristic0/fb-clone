import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Postavi.css";

import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import axios from 'axios';

const Postavi = () => {

  const [unos, postaviUnos] = useState("");
  const [slika, postaviSliku] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/user/addPost', { unos, slika })
    .then(res => {
      console.log(res);
    })
    postaviUnos("");
    postaviSliku("");
  };

  return (
    <div className="postavi">
      <div className="postavi__vrh">
        <Avatar src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" />
        <form>
          <input
            type="text"
            className="postavi__unos"
            placeholder="O čemu razmišljate?"
            value={unos}
            onChange={(e) => postaviUnos(e.target.value)}
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
