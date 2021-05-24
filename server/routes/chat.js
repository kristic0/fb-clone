import express from "express";
const router = express.Router();
import { connection } from "../helpers/db.js";
import { User } from "../models/User.js";
import { Chat } from "../models/Chat.js";

router.post("/:userId", async (req, res) => {
  let userId = req.params.userId;

  let user1 = { user: "602d39500ba1413cd434f37d" };
  let user2 = "603020450339db2e14a78a19";

  await Chat.collection.insertOne(user1);

  res.sendStatus(200);
});

export default router;
