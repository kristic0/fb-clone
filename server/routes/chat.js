const express = require("express");
const router = express.Router();
const connection = require("../helpers/db");
const User = require("../models/User");
const Chat = require("../models/Chat");

router.post("/:userId", async (req, res) => {
  let userId = req.params.userId;

  let user1 = { user: "602d39500ba1413cd434f37d" };
  let user2 = "603020450339db2e14a78a19";

  await Chat.collection.insertOne(user1);

  res.sendStatus(200);
});

module.exports = router;
