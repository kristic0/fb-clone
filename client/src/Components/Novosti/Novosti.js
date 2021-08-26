import React, { useState } from "react";
import "./Novosti.css";
import Objava from "./Objava";
import Postavi from "./Postavi";
import PricaPregled from "./Prica/PricaPregled";

const Novosti = () => {
    const [postovi, postaviPostove] = useState([]);
  let logovaniKorisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"));

  useEffect(() => {
    let sviPostovi = () => {
      let listaPrijatelja = JSON.parse(
        localStorage.getItem("trenutniKorisnik")
      ).friends;
      for (let i = 0; i < listaPrijatelja.length; i++) {
        axios
          .get(`/user/getAllUserPosts/${listaPrijatelja[i]}`)
          .then((response) =>
            postaviPostove((postoviKorisnika) => [...postoviKorisnika, response.data])
          );
      }
    };
    sviPostovi();
  }, []);

  return (
    <div className="novosti">
      <PricaPregled />
      <Postavi />
      <Objava
        profilna="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
        tekst="Moj prvi post!"
        vreme="1629999999990"
        slika={logovaniKorisnik.profilnaSlika}
        imeKorisnika="Nikola Francuski"
      />

      {postovi.map((p) => (
        <Objava tekst={p.profilnaSlika} imeKorisnika={p.name} tekst={p.content} slika={p.slika} key={p._id} />
      ))}
    </div>
  );
};

export default Novosti;
