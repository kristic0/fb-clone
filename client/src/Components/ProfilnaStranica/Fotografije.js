import { React, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";

import "./Fotografije.css";
import nizSlika from "./databaseSimulation.json";

const Fotografije = () => {
  const [prikazSlike, setPrikazSlike] = useState(false);
  const [izvorSlike, setIzvorSlike] = useState(false);

  const prikaziSliku = (param) => {
    setPrikazSlike(param);
  };

  const postaviIzvorSlike = (param) => {
    setIzvorSlike(param);
  };

  let prviFilter = [];

  for (let i = 0; i < nizSlika.length; i++) {
    if (nizSlika[i].id === 1) {
      prviFilter = nizSlika[i].slike;
    }
  }

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
          {prviFilter.map((slika) => (
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
