const express = require('express');
const router = express.Router();
const User = require('../models/User');
const connection = require('../db');
// const verify = require('../verifyToken.js');
const bCrypt = require('bcrypt');
const { registerValidation, loginValidation, removeUserValidation } = require('../validation');


// **NEW** 
//search users 
router.get('/search' , async (req, res) => {
  let name = req.query.name;

  await User.find({
     name: {
      $regex: new RegExp(".*"+name+".*","i")
     }
  }, {
    name: 1,
    id: 1
  }, function (err, data){
    res.json(data);
  });
});



router.get('/allUsers', async (req, res) => {
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

router.post('/register', async (req, res) => {
  // Check if req is valid
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send('Email already exists');

  //Hash pwd
  const hashedPassword = await bCrypt.hash(req.body.password, 10);

  //Create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/remove', async (req, res) => {
  const {error} = removeUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({email: req.body.removeUserEmail});
  if (!user) return res.send('User doesn\'t exist');

  const isDeleted = await User.deleteOne(user);
  if (isDeleted) return res.status(200).send("Successfully deleted!");

  return res.status(400).send("Idk wtf");
});

module.exports = router;
