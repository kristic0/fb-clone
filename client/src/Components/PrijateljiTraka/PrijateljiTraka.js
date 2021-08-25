import React from "react";

import "./PrijateljiTraka.css";
import PrijateljiTrakaRed from "./PrijateljiTrakaRed";
import friendsList from "./databaseSimulation.json";
import axios from "axios";

const PrijateljiTraka = () => {
  let logovaniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"));

  let prijatelji;
  (async () => {
    let listaPrijatelja = JSON.parse(
      localStorage.getItem("trenutniKorisnik")
    ).friends;

    await Promise.all(
      listaPrijatelja.map(async (prijateljId) => {
        const { data } = await axios.get(`/user/getFriend/${prijateljId}`);
        console.log(data.naslovnaSlika);
      })
    );
  })();

  return (
    <div className="prijateljiTraka">
      <p>Prijatelji</p>

      {/* {
            friendsList.map(friend => <PrijateljiTrakaRed src={friend.profilnaSlika} ime={friend.ime + " " +friend.prezime} key={friend.id} />)
            } */}
      {/* {
                prijatelji.map(prijatelj => <PrijateljiTrakaRed src={prijatelj.profilnaSlika} ime={prijatelj.ime + " " + prijatelj.prezime} key={prijatelj.id}/>)
            }
         */}
    </div>
  );
};

export default PrijateljiTraka;
