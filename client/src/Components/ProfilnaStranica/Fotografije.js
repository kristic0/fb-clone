import { React, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import Post from "../Novosti/Objava";

import "./Fotografije.css";

let trenutni = JSON.parse(localStorage.getItem("trenutniKorisnik"));

const Fotografije = () => {
  const [prikazSlike, setPrikazSlike] = useState(false);
  const [izvorSlike, setIzvorSlike] = useState(false);

  const prikaziSliku = (param) => {
    setPrikazSlike(param);
  };

  const postaviIzvorSlike = (param) => {
    setIzvorSlike(param);
  };

  return (
    <div className="divFotografije">
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

      <div className="divCeoFotografije">
        <div className="divNaslov">
          <h1>Fotografije</h1>
        </div>
        <div className="divDoleFoto">
          {trenutni.images.map((slika) => (
            <div className="divFoto">
              <img
                src={slika}
                alt=""
                onClick={() => {
                  prikaziSliku(true);
                  postaviIzvorSlike(slika);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fotografije;
