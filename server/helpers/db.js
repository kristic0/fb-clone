const mongoose = require('mongoose');
require('dotenv').config();

try {
  mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db')
  );
} catch (error) {
  console.log(error);
}

module.exports = mongoose.connection;
