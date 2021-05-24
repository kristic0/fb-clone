import mongoose from 'mongoose';

export const Chat = mongoose.model("Chat", new mongoose.Schema({
  log: {
    type: [],
  },
}));
