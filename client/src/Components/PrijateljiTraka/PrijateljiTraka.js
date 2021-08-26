import { React, useEffect, useState } from "react";

import "./PrijateljiTraka.css";
import PrijateljiTrakaRed from "./PrijateljiTrakaRed";
import friendsList from "./databaseSimulation.json";
import axios from "axios";

const PrijateljiTraka = () => {
  const [prijatelj, postaviPrijatelje] = useState([]);
  let logovaniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"));

  useEffect(() => {
    let prijatelji = () => {
      let listaPrijatelja = JSON.parse(
        localStorage.getItem("trenutniKorisnik")
      ).friends;
      for (let i = 0; i < listaPrijatelja.length; i++) {
        axios
          .get(`/user/getFriend/${listaPrijatelja[i]}`)
          .then((response) =>
            postaviPrijatelje((prijatelj) => [...prijatelj, response.data])
          );
      }
    };
    prijatelji();
  }, []);

  return (
    <div className="prijateljiTraka">
      <p>Prijatelji</p>

      {prijatelj.map((p) => (
        <PrijateljiTrakaRed src={p.profilnaSlika} ime={p.name} key={p._id} />
      ))}
    </div>
  );
};

export default PrijateljiTraka;
