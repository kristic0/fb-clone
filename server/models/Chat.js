const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  log: {
    type: [],
  },
});

module.exports = mongoose.model("Chat", ChatSchema);
