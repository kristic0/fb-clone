const express = require('express');
require('path');
require('./db');
require('dotenv').config();

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// catch 404 and forward to error handler

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function (req, res) {
  res.status(404);
  res.json({ error: 'Not found' });
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running on: http://localhost:${process.env.PORT}`)
);

module.exports = app;
