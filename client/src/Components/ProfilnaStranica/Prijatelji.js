import { React, Component } from "react";
import SearchIcon from "@material-ui/icons/Search";

import "./Prijatelji.css";
import PrijateljiList from "./databaseSimulation.json";

class Prijatelji extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="divPrijatelji">
        <div className="divCeoPrijatelji">
          <div className="divNaslov">
            <h1>Prijatelji</h1>
            <div className="pretragaPrijatelja">
              <SearchIcon />
              <input placeholder="Pretraga" type="text" />
            </div>
          </div>
          <div className="divDole">
            {PrijateljiList.map((prijatelj) => (
              <div className="divPrikazPrijatelj" key={prijatelj.ime}>
                <div className="divPrijateljSlika">
                  <img
                    src={prijatelj.profilnaSlika}
                    alt=""
                    onClick={() => {
                      this.props.setIdProfilaParentComponent(prijatelj.id);
                      this.props.setStanjeParentComponent(1);
                    }}
                  />
                </div>
                <div
                  className="divPrijateljIme"
                  onClick={() => {
                    this.props.setIdProfilaParentComponent(prijatelj.id);
                    this.props.setStanjeParentComponent(1);
                  }}
                >
                  {prijatelj.ime + " " + prijatelj.prezime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Prijatelji;
