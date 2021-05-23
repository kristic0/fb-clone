import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connection = mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db')
); 
