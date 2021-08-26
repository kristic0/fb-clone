import express from "express";
const router = express.Router();

import { Korisnik } from "../modeli/Korisnik.js";
import { Image } from "../modeli/Image.js";

import { connection } from "../pomocni/baza.js";
import bCrypt from "bcrypt";
import { upload } from "../pomocni/multerOpcije.js";
import {
  dodajSlikuNaKorisnika,
  pronadjiIdeveSlikaKorisnika,
} from "../pomocni/pomocnaKlasaZaRute.js";
import fs from "fs";
import {
  registracijaValidacija,
  loginValidacija,
  dodajPrijateljaValidacija,
  getZahteveZaPrijateljaValidacija,
  uploadSlikeValidacija,
  daLiJePoslatIdKorisnika,
  dodajPostValidacija,
  reagujNaPostValidacija,
} from "../pomocni/validacija.js";
import { Post } from "../modeli/Post.js";

/**
 * @openapi
 * /pretraga:
 *   get:
 *     tags:
 *        - Korisnik
 *     description: Vraca JSON
 *     responses:
 *       200:
 *         description: Vraca listu korisnika za prosledjene parametre
 */

router.get("/pretraga", async (req, res) => {
  let ime = req.body.name;

  await Korisnik.find(
    {
      name: {
        $regex: new RegExp(".*" + ime + ".*", "i"),
      },
    },
    {
      name: 1,
      id: 1,
    },
    function (err, podaci) {
      res.status(200).json(podaci);
    }
  );
});

// ============= POST SECTION ============= //

/**
 * @openapi
 * /dodajPost:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Dodaj post
 *     parameters:
 *       - name: userid
 *         description: Id korisnika
 *         required: true
 *         type: string
 *       - name: content
 *         description: Tekst posta (max 500char)
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.post("/dodajPost", async (req, res) => {
  const { error } = dodajPostValidacija(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const korisnickiId = req.body.korisnickiId;

  const post = new Post({
    content: req.body.content,
    imageUrl: req.body.imageUrl,
  });

  await Korisnik.findOne({ _id: korisnickiId }, async (err, korisnik) => {
    if (err) res.send(err);

    const sacuvanPost = await post.save();
    if (!sacuvanPost) return res.status(500).send("Neuspesno upisivanje");

    korisnik.posts = [...korisnik.posts, sacuvanPost._id];

    const azuriranjeKorisnikaRez = korisnik.save();
    if (!azuriranjeKorisnikaRez) return res.status(500).send("");

    return res.status(201).send(post);
  });
});

/**
 * @openapi
 * /komentarisiNaPost:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Dodaj post
 *     parameters:
 *       - name: userid
 *         description: Id korisnika
 *         required: true
 *         type: string
 *       - name: comment
 *         description: Komentar
 *         required: true
 *         type: string
 *       - name: postId
 *         description: Id posta koji se komentarise
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.post("/komentarisiNaPost", async (req, res) => {
  const korisnikId = req.body.korisnikId;
  const postId = req.body.postId;
  const komentar = req.body.komentar;

  await Post.findOne({ _id: postId }, async (err, post) => {
    if (err) res.send(err);

    let noviKomentar = {
      userId: korisnikId,
      comment: komentar,
    };

    post.comments = [...post.comments, noviKomentar];

    const sacuvanPost = post.save();
    if (!sacuvanPost)
      return res.status(500).send("Neuspesno postavljanje komentara");

    return res.status(201).send("Uspesno postavljanje");
  });
});

/**
 * @openapi
 * /addPost:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Get sve postove korisnika
 *     parameters:
 *       - name: userId
 *         description: Id korisnika
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.post("/getSvePostoveKorisnika", async (req, res) => {
  const { error } = daLiJePoslatIdKorisnika(req.body);
  if (error) return res.status(400).send("Los zahtev");

  const korisnickiId = req.body.korisnickiId;
  const svihPostovaIdevi = await Korisnik.findOne(
    { _id: userId },
    { posts: 1 }
  );

  let sviPostoviJson = [];
  for (let i = 0; i < svihPostovaIdevi.posts.length; i++) {
    let post = await Post.findById(svihPostovaIdevi.posts[i]);
    sviPostoviJson.push(post);
  }

  return res.status(201).json(sviPostoviJson);
});

/**
 * @openapi
 * /staviReakcijuNaPost:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Endpoint za reakcije na postu
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.post("/staviReakcijuNaPost", async (req, res) => {
  const { error } = reagujNaPostValidacija(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const reactionBody = {
    userId: req.body.korisnickiId,
    reaction: req.body.reakcija,
  };

  await Post.findById({ _id: req.body.postId }, async (err, post) => {
    if (err) res.send(500).send(err);

    let duplikatPronadjen = false;
    for (let i = 0; i < post.reactions.length; i++) {
      if (post.reactions[i].userId == req.body.userId) {
        post.reactions.splice(i, 1);
        duplikatPronadjen = true;
      }
    }

    if (duplikatPronadjen) {
      const duplikatReakcijeNaPostPronadjen = await post.save();
      res.status(200).send(duplikatReakcijeNaPostPronadjen);
    } else {
      post.reactions = [...post.reactions, reactionBody];
      const sacuvanPost = await post.save();

      if (!sacuvanPost)
        return res.status(500).send("Neuspesno cuvanje reakcije");
      res.send(sacuvanPost);
    }
  });
});

// ============= IMAGE SECTION ============= //

/**
 * @openapi
 * /dodajSliku:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Endpoint za dodavanje slike na profil
 *     parameters:
 *       - name: _id
 *         description: Fruit Object ID
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.post("/dodajSliku", upload.single("img"), async (req, res) => {
  const { error } = uploadSlikeValidacija(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let imgFajlBuffer = fs.readFileSync(req.file.path);
  let enkodovanaSlika = imgFajlBuffer.toString("base64");

  const slika = new Image({
    image: Buffer.from(enkodovanaSlika, "base64"),
    contentType: req.file.mimetype,
  });

  slika
    .save()
    .then((imgFajl) => {
      dodajSlikuNaKorisnika(imgFajl.id, req.body.userId);
      res.status(200).send("Slika uspesno dodata " + imgFajl.id);
    })
    .catch((err) => res.status(500).json(err));
});

/**
 * @openapi
 * /sveSlikeKorisnika:
 *   get:
 *     tags:
 *        - Korisnik
 *     description: Endpoint koji vraca sve slike datog korisnika
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.get("/sveSlikeKorisnika", async (req, res) => {
  const { error } = daLiJePoslatIdKorisnika(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let imageIdsRes = await pronadjiIdeveSlikaKorisnika(req.body.userId);

  let image = await Image.find({
    _id: {
      $in: imageIdsRes.images,
    },
  });
  let allImages = [];

  image.forEach((img) => {
    allImages.push({
      id: img._id,
      imageBuffer: img.image,
    });
  });

  let data = {
    allImages: allImages,
    //count: await connection.db.collection("pictures").countDocuments(),
  };

  res.send(data);
});

// ============= LOGIN - REGISTER SECTION ============= //

/**
 * @openapi
 * /registracija:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Dodaj post
 *     parameters:
 *       - name: email
 *         description: Email
 *         required: true
 *         type: string
 *       - name: password
 *         description: Sifra
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.post("/registracija", async (req, res) => {
  const { error } = registracijaValidacija(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await Korisnik.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const hashedPassword = await bCrypt.hash(req.body.password, 10);

  const user = new Korisnik({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    profilnaSlika: "",
    naslovnaSlika: "",
    osnovneInformacije: {
      mesto: "",
      skola: "",
      posao: "",
      pol: "",
      datum: "",
      jezici: "",
    },
  });

  try {
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @openapi
 * /login:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Login
 *     parameters:
 *       - name: email
 *         description: Korisnicki email
 *         required: true
 *         type: string
 *       - name: password
 *         description: Korisnicka sifra
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.post("/login", async (req, res) => {
  const { error } = loginValidacija(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const korisnik = await Korisnik.findOne({ email: req.body.email });
  if (!korisnik) return res.send("Korisnicki email ne postoji");

  const validnaSifra = await bCrypt.compare(
    req.body.password,
    korisnik.password
  );

  if (!validnaSifra)
    return res.status(400).send("Korisnicko ime ili sifra nisu tacni");

  return res.status(200).json(korisnik);
});

// ============= FRIENDS SECTION ============= //

/**
 * @openapi
 * /dodajPrijatelja:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Dodaj prijatelja
 *     parameters:
 *       - name: userid
 *         description: Id korisnika
 *         required: true
 *         type: string
 *       - name: friendId
 *         description: Id korisnika kojem se salje zahtev
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

let preskocenoDodavanjePrijatelja = false;
router.post("/dodajPrijatelja", async (req, res) => {
  const { error } = dodajPrijateljaValidacija(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const korisnik = await Korisnik.findOne(
    { _id: req.body.id },
    function (err, korisnik) {
      let uZahtevimaZaPrijatelja = korisnik.friendRequests.find((user) => {
        return user === req.body.friendId;
      });

      if (uZahtevimaZaPrijatelja) {
        preskocenoDodavanjePrijatelja = true;
      } else {
        korisnik.friendRequests = [
          ...korisnik.friendRequests,
          req.body.friendId,
        ];
        korisnik.save(function (err) {
          if (err) {
            console.error("err!");
          }
        });
      }
    }
  );

  if (!korisnik) return res.send("nije bilo moguce pronaci korisnika");
  if (preskocenoDodavanjePrijatelja)
    return res.send("vec se nalazi u listi zahteva za prijatelja");
  return res.status(200).send("Uspesan zahtev!");
});

/**
 * @openapi
 * /zahteviZaPrijatelja:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Zahtevi za prijateljstvo
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.get("/zahteviZaPrijatelja", async (req, res) => {
  const { error } = getZahteveZaPrijateljaValidacija(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Korisnik.findOne(
    { _id: req.body.id },
    { _id: 0, friendRequests: 1 },
    function (err, data) {
      if (err) {
        return res.status(500).send("Korisnicki id nije validan");
      }

      return res.status(200).json(data);
    }
  );
});

router.get("/getFriend/:id", async (req, res) => {
  let userId = req.params.id;
  let user = await Korisnik.findById(userId);

  res.json(user);
});

export default router;
