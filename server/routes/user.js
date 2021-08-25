import express from "express";
const router = express.Router();

import { User } from "../models/User.js";
import { Image } from "../models/Image.js";

import { connection } from "../helpers/db.js";
import bCrypt from "bcrypt";
import { upload } from "../helpers/multerSettings.js";
import { addImageIdToUser, findUserImageIds } from "../helpers/routerHelper.js";
import fs from "fs";
import {
  registerValidation,
  loginValidation,
  addFriendValidation,
  getFriendRequests,
  uploadImageValidation,
  isUserIdSent,
  addPostValidation,
  reactToPostValidation,
} from "../helpers/validation.js";
import { Post } from "../models/Post.js";

/**
 * @openapi
 * /search:
 *   get:
 *     tags:
 *        - Korisnik
 *     description: Vraca JSON
 *     responses:
 *       200:
 *         description: Vraca listu korisnika za prosledjene parametre
 */

router.get("/search", async (req, res) => {
  let name = req.body.name;

  await User.find(
    {
      name: {
        $regex: new RegExp(".*" + name + ".*", "i"),
      },
    },
    {
      name: 1,
      id: 1,
    },
    function (err, data) {
      res.json(data);
    }
  );
});

// ============= POST SECTION ============= //

/**
 * @openapi
 * /addPost:
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

router.post("/addPost", async (req, res) => {
  const { error } = addPostValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userId = req.body.userId;
  const post = new Post({
    content: req.body.content,
  });

  await User.findOne({ _id: userId }, async (err, user) => {
    if (err) res.send(err);

    const savedPost = await post.save();
    if (!savedPost) return res.status(400).send("Couldn't save post");

    user.posts = [...user.posts, savedPost._id];

    const userSaveRes = user.save();
    if (!userSaveRes) return res.status(400).send("User err");

    return res.status(201).send("Successfully posted");
  });
});

/**
 * @openapi
 * /commentOnPost:
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

router.post("/commentOnPost", async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  const comment = req.body.comment;

  await Post.findOne({ _id: postId }, async (err, post) => {
    if (err) res.send(err);

    let newComment = {
      userId: userId,
      comment: comment,
    };

    post.comments = [...post.comments, newComment];

    const savePost = post.save();
    if (!savePost) return res.status(400).send("Couldnt save comment");

    return res.status(201).send("Success");
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

router.get("/getAllUserPosts", async (req, res) => {
  const { error } = isUserIdSent(req.body);
  if (error) return res.status(400).send("Bad request");

  const userId = req.body.userId;
  const allPostIds = await User.findOne({ _id: userId }, { posts: 1 });

  let allPostsJson = [];
  for (let i = 0; i < allPostIds.posts.length; i++) {
    let res = await Post.findById(allPostIds.posts[i]);
    allPostsJson.push(res);
  }

  return res.status(201).json(allPostsJson);
});

/**
 * @openapi
 * /reactToPost:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Endpoint za reakcije na postu
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.post("/reactToPost", async (req, res) => {
  const { error } = reactToPostValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const reactionBody = {
    userId: req.body.userId,
    reaction: req.body.reaction,
  };

  await Post.findById({ _id: req.body.postId }, async (err, post) => {
    if (err) res.send(400).send(err);

    let duplicateFound = false;
    for (let i = 0; i < post.reactions.length; i++) {
      if (post.reactions[i].userId == req.body.userId) {
        post.reactions.splice(i, 1);
        duplicateFound = true;
      }
    }

    if (duplicateFound) {
      const duplicatePostReactionFound = await post.save();
      res.status(200).send(duplicatePostReactionFound);
    } else {
      post.reactions = [...post.reactions, reactionBody];
      const postSaved = await post.save();

      if (!postSaved) return res.status(400).send("Couldn't save reaction");
      res.send(postSaved);
    }
  });
});

// ============= IMAGE SECTION ============= //

/**
 * @openapi
 * /uploadImage:
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

router.post("/uploadImage", upload.single("img"), async (req, res) => {
  const { error } = uploadImageValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let imgFile = fs.readFileSync(req.file.path);
  let encodeImage = imgFile.toString("base64");

  const image = new Image({
    image: Buffer.from(encodeImage, "base64"),
    contentType: req.file.mimetype,
  });

  image
    .save()
    .then((imgFile) => {
      addImageIdToUser(imgFile.id, req.body.userId);
      res.status(200).send("Image added successfully " + imgFile.id);
    })
    .catch((err) => res.json(err));
});

/**
 * @openapi
 * /images:
 *   get:
 *     tags:
 *        - Korisnik
 *     description: Endpoint koji vraca sve slike datog korisnika
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.get("/images", async (req, res) => {
  const { error } = isUserIdSent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let imageIdsRes = await findUserImageIds(req.body.userId);

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
    count: await connection.db.collection("pictures").countDocuments(),
  };

  res.send(data);
});

// ============= LOGIN - REGISTER SECTION ============= //

/**
 * @openapi
 * /register:
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

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  const hashedPassword = await bCrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
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
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Invalid username or password");

  const validPassword = await bCrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid username or password");

  return res.status(200).json(user);
});

// ============= FRIENDS SECTION ============= //

/**
 * @openapi
 * /addFriend:
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

let skippedAddingFriend = false;
router.post("/addFriend", async (req, res) => {
  const { error } = addFriendValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ _id: req.body.id }, function (err, user) {
    let inFriendRequests = user.friendRequests.find((user) => {
      return user === req.body.friendId;
    });

    if (inFriendRequests) {
      skippedAddingFriend = true;
    } else {
      user.friendRequests = [...user.friendRequests, req.body.friendId];
      user.save(function (err) {
        if (err) {
          console.error("err!");
        }
      });
    }
  });

  if (!user) return res.send("could not find the user");
  if (skippedAddingFriend) return res.send("already in friend reqs");
  return res.send("Success!");
});

/**
 * @openapi
 * /friendRequests:
 *   post:
 *     tags:
 *        - Korisnik
 *     description: Zahtevi za prijateljstvo
 *     responses:
 *       200:
 *         description: Ukoliko su validni parametri prosledjeni
 */

router.get("/friendRequests", async (req, res) => {
  const { error } = getFriendRequests(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne(
    { _id: req.body.id },
    { _id: 0, friendRequests: 1 },
    function (err, data) {
      if (err) {
        return res.status(400).send("Invalid user id");
      }

      return res.status(200).json(data);
    }
  );
});

router.get("/getFriend/:id", async (req, res) => {
  let userId = req.params.id;
  let user = await User.findById(userId);

  res.json(user);
});

export default router;
