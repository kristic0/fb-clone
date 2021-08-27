import React, { useEffect, useState } from "react";
import "./Novosti.css";
import Objava from "./Objava";
import Postavi from "./Postavi";
import PricaPregled from "./Prica/PricaPregled";
import axios from "axios";

const Novosti = () => {
  const [postovi, postaviPostove] = useState([]);
  let logovaniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"));

  let listaPrijatelja = JSON.parse(
    localStorage.getItem("trenutniKorisnik")
  ).friends;
    listaPrijatelja.push(logovaniKorisnik._id)
  

  useEffect(() => {
    let called = false;
    for (let i = 0; i < listaPrijatelja.length; i++) {
      axios
        .get(`/korisnik/getSvePostoveKorisnika/${listaPrijatelja[i]}`)
        .then((response) => {
          if (!called) {
            postaviPostove((oldArray) => [...oldArray, response.data]);
          }
        });
    }
    return () => (called = true);
  }, []);
  console.log(postovi);

  return (
    <div className="novosti">
      <PricaPregled />
      <Postavi />

      {postovi.map((item) => {
        return Object.entries(item).map(([key, datum], i) => {
          return (
            <div key={i}>
              <Objava
                profilna={datum.profilnaSlika}
                imeKorisnika={datum.name}
                tekst={datum.post.content}
                slika={datum.post.imageUrl}
                vreme={datum.post.time}
              />
            </div>
          );
        });
      })}
    </div>
  );
};

export default Novosti;
