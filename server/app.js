import swaggerJsdoc from "swagger-jsdoc";
import express from "express";
import fs from "fs";
import swaggerUI from "swagger-ui-express";
import path from "path";
import { connection } from "./helpers/db.js";
import dotenv from "dotenv";
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import chatRouter from "./routes/chat.js";
import { createServer } from "http";
import { Server } from "socket.io";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Facebook clone API",
      version: "1.0.0",
      description: "Express API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

dotenv.config();

let app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// uploads folder needed for file uploads (multer)
if (!fs.existsSync("uploads/")) {
  fs.mkdirSync("uploads/");
} else {
  console.log("Folder already exists");
}

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(options)));

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.status(404);
  res.json({ error: "Route not found" });
});

io.on("connection", (socket) => {
  console.log("New user connected");

  //default username
  socket.username = "Anonymous";

  //listen on change_username
  socket.on("change_username", (data) => {
    socket.username = data.username;
  });

  //listen on new_message
  socket.on("client:message", (data) => {
    //broadcast the new message
    io.sockets.emit("server:message", {
      message: data.message,
      username: socket.username,
    });

    console.log(data);
  });

  //listen on typing
  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", { username: socket.username });
  });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on: http://localhost:${process.env.PORT}`);
  console.log(
    `Swagger running on: http://localhost:${process.env.PORT}/api-docs`
  );
});

export default app;
