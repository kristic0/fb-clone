const express = require('express');
const router = express.Router();
const verify = require('../helpers/verifyToken.js');
const { removeUserValidation } = require('../helpers/validation');
const User = require('../models/User');
const connection = require('../helpers/db');

/* GET home page. */
router.get('/', function (req, res) {
  res.send('server is working').status(200);
});

router.post('/admin/removeUser', verify, async (req, res) => {
  const { error } = removeUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.removeUserEmail });
  if (!user) return res.send("User doesn't exist");

  const isDeleted = await User.deleteOne(user);
  if (isDeleted) return res.status(200).send('Successfully deleted!');

  return res.status(400).send('Idk wtf');
});

router.get('/admin/allUsers', async (req, res) => {
  let users = await User.find({});
  let allUsers = [];
  let data = {
    allUsers: allUsers,
    count: null,
  };

  users.forEach((user) => {
    allUsers.push({
      id: user._id,
      name: user.name,
    });
  });

  data.allUsers = allUsers;
  data.count = await connection.db.collection('users').countDocuments();

  res.send(data);
});

module.exports = router;
