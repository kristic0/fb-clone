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
import * as http from "http";
import { Server, Socket } from "socket.io";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let httpServer = http.Server(app);

const io = new Server(httpServer, { cors: { origin: "*" } });
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
  console.log("user connected");

  socket.on("message", (data) => {
    console.log(data);
    socket.send(data);
  });
});

httpServer.listen(process.env.PORT || 4001, () =>
  console.log(`Server is running on: http://localhost:${process.env.PORT}`)
);

export default app;
