import mongoose from "mongoose";

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

export const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
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
    comments: {
      type: [{ userId: String, comment: String }],
      required: false,
    },
  }),
  "post"
);
