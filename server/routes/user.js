const express = require('express');
const router = express.Router();
const User = require('../models/User');
const connection = require('../helpers/db');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Image = require('../models/Image');
const { upload } = require('../helpers/multerSettings');
const {
  addImageIdToUser,
  findUserImageIds,
} = require('../helpers/routerHelper');
const fs = require('fs');
const {
  registerValidation,
  loginValidation,
  addFriendValidation,
  getFriendRequests,
  uploadImageValidation,
  getImageValidation,
} = require('../helpers/validation');

router.get('/search', async (req, res) => {
  let name = req.body.name;

  await User.find(
    {
      name: {
        $regex: new RegExp('.*' + name + '.*', 'i'),
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

// ============= IMAGE SECTION ============= //

router.post('/uploadImage', upload.single('img'), (req, res) => {
  const { error } = uploadImageValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let imgFile = fs.readFileSync(req.file.path);
  let encodeImage = imgFile.toString('base64');

  const image = new Image({
    image: Buffer.from(encodeImage, 'base64'),
    contentType: req.file.mimetype,
  });

  image
    .save()
    .then((imgFile) => {
      addImageIdToUser(imgFile.id, req.body.userId);
      res.status(200).send('Image added successfully ' + imgFile.id);
    })
    .catch((err) => res.json(err));
});

router.get('/images', async (req, res) => {
  const { error } = getImageValidation(req.body);
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
    count: await connection.db.collection('pictures').countDocuments(),
  };

  res.send(data);
});

// ============= LOGIN - REGISTER SECTION ============= //

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('Email already exists');

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

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send('Invalid username or password');

  const validPassword = await bCrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send('Invalid username or password');

  const accessToken = jwt.sign(
    { _id: user.id },
    process.env.ACCESS_TOKEN_SECRET
  );
  return res.status(200).header('auth-token', accessToken).send('Success!');
});

// ============= FRIENDS SECTION ============= //

// Dumbfuck way of solving this piece of shit
let skippedAddingFriend = false;
router.post('/addFriend', async (req, res) => {
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
          console.error('err!');
        }
      });
    }
  });

  if (!user) return res.send('could not find the user');
  if (skippedAddingFriend) return res.send('already in friend reqs');
  return res.send('Success!');
});

router.get('/friendRequests', async (req, res) => {
  const { error } = getFriendRequests(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne(
    { _id: req.body.id },
    { _id: 0, friendRequests: 1 },
    function (err, data) {
      if (err) {
        return res.status(400).send('Invalid user id');
      }

      return res.status(200).json(data);
    }
  );
});

module.exports = router;
