const express = require("express");
const fs = require("fs");

require("path");
require("./helpers/db");
require("dotenv").config();

let indexRouter = require("./routes/index");
let userRouter = require("./routes/user");
let chatRouter = require("./routes/chat");

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const http = require("http").Server(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

// uploads folder needed for file uploads (multer)
if (!fs.existsSync("uploads/")) {
  fs.mkdirSync("uploads/");
} else {
  console.log("Folder already exists");
}

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404);
  res.json({ error: "Route not found" });
});

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("message", (data) => {
    console.log(data);
    socket.send(data);
  });
});

http.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running on: http://localhost:${process.env.PORT}`)
);

module.exports = app;
