import swaggerJsdoc from "swagger-jsdoc";
import express from "express";
import fs from "fs";
import swaggerUI from "swagger-ui-express";
import path from "path";
import { connection } from "./pomocni/baza.js";
import dotenv from "dotenv";
import indexRouter from "./rute/index.js";
import userRouter from "./rute/korisnicka.js";
import { createServer } from "http";
import { Server } from "socket.io";

const opcije = {
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
  apis: ["./rute/*.js"],
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

if (!fs.existsSync("uploads/")) {
  fs.mkdirSync("uploads/");
} else {
  console.log("Folder vec postoji");
}

// povezivanje ruta za aplikacijom
app.use("/", indexRouter);
app.use("/korisnik", userRouter);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsdoc(opcije)));

// error 404 resavanje
app.use(function (req, res) {
  res.status(404);
  res.json({ error: "Ruta nije pronadjena" });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`Server je pokrenut na: http://localhost:${process.env.PORT}`);
  console.log(
    `Swagger je pokrenut na: http://localhost:${process.env.PORT}/api-docs`
  );
});

export default app;
