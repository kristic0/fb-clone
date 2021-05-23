import mongoose from 'mongoose';

export const Image = mongoose.model('Image', new mongoose.Schema({
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
}), 'pictures');
