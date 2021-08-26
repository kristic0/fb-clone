// import React from "react";

// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";

// import LocationOnIcon from "@material-ui/icons/LocationOn";
// import SchoolIcon from "@material-ui/icons/School";
// import WorkIcon from "@material-ui/icons/Work";
// import { Avatar } from "@material-ui/core";
// import VideocamIcon from "@material-ui/icons/Videocam";
// import ImageIcon from "@material-ui/icons/Image";
// import TuneIcon from "@material-ui/icons/Tune";
// import SettingsIcon from "@material-ui/icons/Settings";
// import ReorderIcon from "@material-ui/icons/Reorder";
// import ViewModuleIcon from "@material-ui/icons/ViewModule";
// import CloseIcon from "@material-ui/icons/Close";
// import Post from "../Feed/Post";
// import "./ObjaveTab.css";
// import prijatelji from "./databaseSimulation.json";

// let src = "";

// const mesto = (id) => {
//   let korisnik = null;
//   for (let key in prijatelji) {
//     if (prijatelji[key].id === id) {
//       korisnik = prijatelji[key];
//       break;
//     }
//   }
//   return korisnik.mesto;
// };

// const skola = (id) => {
//   let korisnik = null;
//   for (let key in prijatelji) {
//     if (prijatelji[key].id === id) {
//       korisnik = prijatelji[key];
//       break;
//     }
//   }

//   return korisnik.skola;
// };

// const posao = (id) => {
//   let korisnik = null;
//   for (let key in prijatelji) {
//     if (prijatelji[key].id === id) {
//       korisnik = prijatelji[key];
//       break;
//     }
//   }
//   return korisnik.posao;
// };

// const slike = (id) => {
//   let korisnik = null;
//   for (let key in prijatelji) {
//     if (prijatelji[key].id === id) {
//       korisnik = prijatelji[key];
//       break;
//     }
//   }
//   return korisnik.slike;
// };

// class ObjaveTab extends React.Component {
//   constructor(props) {
//     super();
//   }

//   async nesto() {
//     const response = await fetch("http://localhost:4000/user/search", {
//       method: "post",
//       body: JSON.stringify({ name: "test1" }),
//     });
//     const json = await response.json();
//     console.log(json);
//     this.setState({ data: json });
//   }

//   state = {
//     prikazSlika: false,
//     prikazDialog: false,
//   };

//   prikaziSliku = (param) => this.setState(() => ({ prikazSlika: param }));

//   prikazDialoga = (param) => this.setState(() => ({ prikazDialog: param }));

//   render() {
//     return (
//       <div className="divDoleObjave">
//         <div>
//           <Dialog
//             className="dialogIzmena"
//             open={this.state.prikazDialog}
//             onClose={() => {
//               this.prikazDialoga(false);
//             }}
//             aria-labelledby="form-dialog-title"
//           >
//             <DialogTitle className="naslovDialogaIzmena">
//               Izmenite detalje
//             </DialogTitle>
//             <DialogContent>
//               <div className="divDialogIzmena">
//                 <h2>Uredite Vas uvod</h2>
//                 <h3>
//                   Detalji koje izaberete ce biti javni i nece biti objavljeni na
//                   stranici Novosti
//                 </h3>
//                 <h2>Posao</h2>
//                 {posao(this.props.getIdProfila)}
//                 <h2>Obrazovanje</h2>
//                 {skola(this.props.getIdProfila)}
//                 <h2>Trenutno prebivaliste</h2>
//                 {mesto(this.props.getIdProfila)}
//                 <h2>Veza</h2>
//                 {}
//               </div>
//             </DialogContent>
//             <DialogActions>
//               <Button
//                 onClick={() => {
//                   this.prikazDialoga(false);
//                 }}
//                 color="primary"
//               >
//                 Otkaži
//               </Button>
//               <Button
//                 onClick={() => {
//                   this.prikazDialoga(false);
//                   this.props.setStanjeParentComponent(2);
//                 }}
//                 color="primary"
//               >
//                 Izmeni
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>

//         <div className="divTabovi">
//           <div className="divUvod">
//             <h1>Uvod</h1>
//             <ul className="listaUvod">
//               <li>
//                 <LocationOnIcon className="lokacija" /> Iz mesta {}
//                 {mesto(this.props.getIdProfila)}
//               </li>
//               <li>
//                 <SchoolIcon className="skola" /> Pohađa/o{" "}
//                 {skola(this.props.getIdProfila)}
//               </li>
//               <li>
//                 <WorkIcon className="posao" />
//                 Radi u {posao(this.props.getIdProfila)}
//               </li>
//               <li
//                 className={1 === 1 ? "izmena" : "sakrij"}
//                 onClick={() => {
//                   this.prikazDialoga(true);
//                 }}
//               >
//                 Izmenite detalje
//               </li>
//               <li className={1 === 1 ? "dodavanje" : "hide"}>Dodajte hobije</li>
//             </ul>
//           </div>
//           <div className={1 === 1 ? "razmisljanje" : "hide"}>
//             <div className="razmisljanjeGornjiDeo">
//               <div className="noviStatus">
//                 <Avatar />
//                 <h1>O cemu razmisljate?</h1>
//               </div>
//             </div>
//             <div className="razmisljanjeDonjiDeo">
//               <div className="kamera">
//                 <VideocamIcon className="prenosUzivo" />
//                 <h1>Prenos uzivo</h1>
//               </div>
//               <div className="fotoVideo">
//                 <ImageIcon className="foto" />
//                 <h1>Fotografija/Video</h1>
//               </div>
//             </div>
//           </div>
//           <div className="fotografije">
//             <h1
//               onClick={() => {
//                 this.props.setStanjeParentComponent(4);
//               }}
//             >
//               Fotografije
//             </h1>
//             <div className="fotografijeDiv">
//               {slike(this.props.getIdProfila)
//                 .slice(0, 9)
//                 .map((slika) => (
//                   <div className="divFotografija">
//                     <img
//                       src={slika}
//                       onClick={() => {
//                         this.prikaziSliku(true);
//                         src = slika;
//                       }}
//                       alt=""
//                     />
//                   </div>
//                 ))}
//               {this.state.prikazSlika && (
//                 <div>
//                   <Dialog
//                     fullScreen
//                     className="dialogFotografija"
//                     open={this.state.prikazSlika}
//                     onClose={() => {
//                       this.prikaziSliku(false);
//                     }}
//                     aria-labelledby="form-dialog-title"
//                   >
//                     <DialogContent>
//                       <div className="divDialogFotografija">
//                         <div className="divDialogFotografijaSlika">
//                           <CloseIcon
//                             className="IskljuciDialogFotografija"
//                             onClick={() => {
//                               this.prikaziSliku(false);
//                             }}
//                           />

//                           <img src={src} alt="" />
//                         </div>

//                         <div className="divDialogFotografijaKomentari">
//                           <h1>nesto</h1>
//                         </div>
//                       </div>
//                     </DialogContent>
//                     <DialogActions></DialogActions>
//                   </Dialog>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="objaveOpcije">
//             <div className="objaveGornjiDeo">
//               <h1>Objave</h1>
//               <div className="filteri">
//                 <TuneIcon />
//                 <h1>Filteri</h1>
//               </div>
//               <div className="upravljanje">
//                 <SettingsIcon />
//                 <h1>Upravljanje objavama</h1>
//               </div>
//             </div>

//             <div className="objaveDonjiDeo">
//               <div className="prikazUViduListe">
//                 <ReorderIcon />
//                 <h1>Prikaz u vidu liste</h1>
//               </div>
//               <div className="prikazUViduMreze">
//                 <ViewModuleIcon />
//                 <h1>Prikaz u vidu mreze</h1>
//               </div>
//             </div>
//           </div>

//           <div className="prijatelji">
//             <div className="gridPrijatelji">
//               <h1
//                 onClick={() => {
//                   this.props.setStanjeParentComponent(3);
//                 }}
//               >
//                 Prijatelji
//               </h1>
//               <div className="divPrijateljiUObjavama">
//                 {prijatelji.slice(0, 9).map((prijatelj) => (
//                   <div className="divObjavePrijatelji">
//                     <div
//                       className="divObjavePrijateljiSlika"
//                       onClick={() => {
//                         this.props.setIdProfilaParentComponent(prijatelj.id);
//                         this.props.setStanjeParentComponent(1);
//                         window.scrollTo(0, 0);
//                         console.log(this.props.getIdProfila);
//                       }}
//                     >
//                       <img src={prijatelj.profilnaSlika} alt="" />
//                     </div>
//                     <div
//                       className="divObjavePrijateljiIme"
//                       onClick={() => {
//                         this.props.setIdProfilaParentComponent(prijatelj.id);
//                         this.props.setStanjeParentComponent(1);
//                         window.scrollTo(0, 0);
//                       }}
//                     >
//                       {prijatelj.ime + " " + prijatelj.prezime}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="objave">
//             <h1>Neke objave </h1>

//             <Post />
//             <Post />
//             <Post />
//             <Post />
//             <Post />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default ObjaveTab;
