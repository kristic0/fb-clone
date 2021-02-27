const User = require('../models/User');

async function addImageIdToUser(imageId, userId) {
  await User.findOne({ _id: userId }, function (err, user) {
    user.images = [...user.images, imageId];

    user.save((err) => {
      if (err) {
        console.error('err!');
      }
    });
  });
}

async function findUserImageIds(userId) {
  let imageIds;

  await User.findOne(
    { _id: userId },
    { _id: 0, images: 1 },
    function (err, data) {
      if (err) {
        imageIds = null;
      } else {
        imageIds = data;
      }
    }
  );

  return imageIds;
}

module.exports.addImageIdToUser = addImageIdToUser;
module.exports.findUserImageIds = findUserImageIds;
