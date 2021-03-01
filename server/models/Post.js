const mongoose = require('mongoose');

// // prettier-ignore
// const ReactionEnum = Object.freeze({
//     like:   1,
//     love:   2,
//     care:   3,
//     haha:   4,
//     wow:    5,
//     sad:    6,
//     angry:  7,
//   });
// // prettier-ignore-end

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  reactions: {
    type: [{ userId: String, reaction: Number }],
    required: false,
  },
  reactionsCount: {
    type: Number,
  },
});

module.exports = mongoose.model('Post', PostSchema, 'post');
