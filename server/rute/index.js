import express from "express";
const router = express.Router();
import { obrisiKorisnikaValidacija } from "../pomocni/validacija.js";
import { Korisnik } from "../modeli/Korisnik.js";
import { connection } from "../pomocni/baza.js";
import verify from "../pomocni/verifikujToken.js";
router.get("/", function (req, res) {
  res.send("server is working").status(200);
});

router.post("/admin/removeUser", async (req, res) => {
  const { error } = obrisiKorisnikaValidacija(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Korisnik.findOne({ email: req.body.removeUserEmail });
  if (!user) return res.send("User doesn't exist");

  const isDeleted = await Korisnik.deleteOne(user);
  if (isDeleted) return res.status(200).send("Successfully deleted!");

  return res.status(500).send("nedefinisan error");
});

router.get("/admin/allUsers", async (req, res) => {
  let korisnik = await Korisnik.find({});
  let sviKorisnici = [];
  let podaci = {
    allUsers: sviKorisnici,
    count: null,
  };

  korisnik.forEach((user) => {
    sviKorisnici.push(user);
  });

  podaci.allUsers = sviKorisnici;
  // data.count = await connection.db.collection("users").countDocuments();

  res.status(200).send(podaci);
});

export default router;
