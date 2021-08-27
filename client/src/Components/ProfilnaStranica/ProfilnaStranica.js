import React, { useState, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CreateIcon from "@material-ui/icons/Create";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";

import "./ProfilnaStranica.css";
import ObjaveTab from "./ObjaveTab.js";
import Informacije from "./Informacije.js";
import Prijatelji from "./Prijatelji.js";
import Fotografije from "./Fotografije.js";
import Header from "../Header";

import axios from "axios";

const ProfilnaStranica = () => {
  let korisnik = JSON.parse(localStorage.getItem("trenutniKorisnik"));

  const [stanje, setStanje] = useState(1);

  const [prijatelj, postaviPrijatelje] = useState([]);

  const [prikazSlike, setPrikazSlike] = useState(false);

  const [izvorSlike, setIzvorSlike] = useState(false);

  const [profil, setProfil] = useState(korisnik); //localStorage.getItem("korisnicki id");

  useEffect(() => {
    let called = false;
    let postovi = () => {
      let idKorisnika = JSON.parse(
        localStorage.getItem("trenutniKorisnik")
      )._id;
      axios
        .get(`/korisnik/getSvePostoveKorisnika/${idKorisnika}`)
        .then((response) => {
          if (!called) {
            postaviPostove((oldArray) => [...oldArray, response.data]);
          }
        });
    };
    postovi();
  }, []);
  const [post, postaviPostove] = useState([]);

  useEffect(() => {
    let setProfil = () => {
      let idKorisnika = JSON.parse(localStorage.getItem("trenutniKorisnik"));
      axios
        .get(`/korisnik/getPrijatelja/${idKorisnika}`)
        .then((response) => setProfil((profil) => [...profil, response.data]));
    };
    setProfil();
  }, []);

  useEffect(() => {
    let prijatelji = () => {
      let listaPrijatelja = JSON.parse(
        localStorage.getItem("trenutniKorisnik")
      ).friends;
      for (let i = 0; i < listaPrijatelja.length; i++) {
        axios
          .get(`/korisnik/getPrijatelja/${listaPrijatelja[i]}`)
          .then((response) =>
            postaviPrijatelje((prijatelj) => [...prijatelj, response.data])
          );
      }
    };
    prijatelji();
  }, []);

  const kojeStanje = (index) => {
    setStanje(index);
  };

  const prikaziSliku = (param) => {
    setPrikazSlike(param);
  };

  const postaviIzvorSlike = (param) => {
    setIzvorSlike(param);
  };

  return (
    <div className="glavniDiv">
      <div>
        <Header />
      </div>
      <div>
        <Dialog
          fullScreen
          className="dialogFotografija"
          open={prikazSlike}
          onClose={() => {
            prikaziSliku(false);
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <div className="divDialogFotografija">
              <div className="divDialogFotografijaSlika">
                <CloseIcon
                  className="IskljuciDialogFotografija"
                  onClick={() => {
                    prikaziSliku(false);
                  }}
                />

                <img src={izvorSlike} alt="" />
              </div>

              <div className="divDialogFotografijaKomentari">
                <h1>nesto</h1>
              </div>
            </div>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>

      <div className="gornjiDeo">
        <div className="divBeo">
          <img
            className="naslovnaSlika"
            src={profil.naslovnaSlika}
            alt="Naslovna Slika"
            onClick={() => {
              prikaziSliku(true);
              postaviIzvorSlike(profil.naslovnaSlika);
            }}
          />

          <img
            className="profilnaSlika"
            src={profil.profilnaSlika}
            alt="Profilna Slika"
            onClick={() => {
              prikaziSliku(true);
              postaviIzvorSlike(profil.profilnaSlika);
            }}
          />
          <h1 className="korisnickoIme">{profil.name}</h1>
          <div className="divListe">
            <ul className="meniLevo">
              <li
                className={stanje === 1 ? "aktivanLi" : "li"}
                onClick={() => kojeStanje(1)}
              >
                Objave
              </li>
              <li
                className={stanje === 2 ? "aktivanLi" : "li"}
                onClick={() => kojeStanje(2)}
              >
                Informacije
              </li>
              <li
                className={stanje === 3 ? "aktivanLi" : "li"}
                onClick={() => kojeStanje(3)}
              >
                Prijatelji{" "}
              </li>
              <li
                className={stanje === 4 ? "li" : "li"}
                onClick={() => kojeStanje(4)}
              >
                Još <ArrowDropDownIcon />
              </li>
            </ul>
            <ul className="meniDesno">
              <li className="pricaLi">
                <AddCircleIcon />
                Dodajte u pricu
              </li>
              <li className="izmenaLi" onClick={() => kojeStanje(2)}>
                <CreateIcon />
                Izmenite profil
              </li>
              <li className="tackiceLi">
                <MoreHorizIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="donjiDeo">
        <div className={stanje === 1 ? "aktivno" : "neaktivno"}>
          <ObjaveTab
            setProfilParentComponent={setProfil}
            setStanjeParentComponent={setStanje}
            getIdProfila={profil}
            getPrijatelje={prijatelj}
            getPostove={post}
          />
        </div>
        <div className={stanje === 2 ? "aktivno" : "neaktivno"}>
          <Informacije getIdProfila={profil} />
        </div>
        <div className={stanje === 3 ? "aktivno" : "neaktivno"}>
          <Prijatelji
            setIdProfilaParentComponent={setProfil}
            setStanjeParentComponent={setStanje}
            getIdProfila={profil}
            getPrijatelje={prijatelj}
          />
        </div>
        <div className={stanje === 4 ? "aktivno" : "neaktivno"}>
          <Fotografije getIdProfila={profil} getPrijatelje={prijatelj} />
        </div>
      </div>
    </div>
  );
};

export default ProfilnaStranica;
