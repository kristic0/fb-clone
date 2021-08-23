import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CreateIcon from "@material-ui/icons/Create";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CloseIcon from "@material-ui/icons/Close";

import "./GlavniCSS.css";
import ObjaveTab from "./ObjaveTab.js";
import Informacije from "./Informacije.js";
import Prijatelji from "./Prijatelji.js";
import Fotografije from "./Fotografije.js";
import baza from "./databaseSimulation.json";

const GlavniJS = () => {
  const [stanje, setStanje] = useState(1);

  const [prikazSlike, setPrikazSlike] = useState(false);

  const [izvorSlike, setIzvorSlike] = useState(false);

  const [idProfila, setIdProfila] = useState(1);

  const kojeStanje = (index) => {
    setStanje(index);
  };

  const prikaziSliku = (param) => {
    setPrikazSlike(param);
  };

  const postaviIzvorSlike = (param) => {
    setIzvorSlike(param);
  };

  let korisnik = [];

  for (let i = 0; i < baza.length; i++) {
    if (baza[i].id === idProfila) {
      korisnik = baza[i];
    }
  }

  return (
    <div className="glavniDiv">
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
            src={korisnik.naslovnaSlika}
            alt="Naslovna Slika"
            onClick={() => {
              prikaziSliku(true);
              postaviIzvorSlike(korisnik.naslovnaSlika);
            }}
          />

          <img
            className="profilnaSlika"
            src={korisnik.profilnaSlika}
            alt="Profilna Slika"
            onClick={() => {
              prikaziSliku(true);
              postaviIzvorSlike(korisnik.profilnaSlika);
            }}
          />
          <h1 className="korisnickoIme">
            {korisnik.ime + " " + korisnik.prezime}
          </h1>
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
              <li className="izmenaLi">
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
          <ObjaveTab setStanjeParentComponent={setStanje} />
        </div>
        <div className={stanje === 2 ? "aktivno" : "neaktivno"}>
          <Informacije />
        </div>
        <div className={stanje === 3 ? "aktivno" : "neaktivno"}>
          <Prijatelji
            setIdProfilaParentComponent={setIdProfila}
            setStanjeParentComponent={setStanje}
          />
        </div>
        <div className={stanje === 4 ? "aktivno" : "neaktivno"}>
          <Fotografije />
        </div>
      </div>
    </div>
  );
};

export default GlavniJS;