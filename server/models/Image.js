const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  image: {
    type: Buffer,
  },
  contentType: {
    type: String,
  },
  uploaded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Image', imageSchema, 'pictures');
