import mongoose from "mongoose";

export const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 3,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    groups: {
      type: [Number],
      required: false,
    },
    posts: {
      type: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    friends: {
      type: [String],
      required: false,
    },
    friendRequests: {
      type: [String],
      required: false,
    },
    profilnaSlika: {
      type: String,
      required: false,
    },
    naslovnaSlika: {
      type: String,
      required: false,
    },
    osnovneInformacije: {
      type: {
        mesto: String | null,
        skola: String | null,
        posao: String | null,
        pol: String | null,
        datum: String | null,
        jezici: String | null,
        veza: String | null,
      },

      required: false,
    },
  }),
  "users"
);
