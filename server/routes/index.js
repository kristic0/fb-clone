const express = require('express');
const router = express.Router();
const verify = require('../helpers/verifyToken.js');
const { removeUserValidation } = require('../helpers/validation');
const User = require('../models/User');

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

module.exports = router;
