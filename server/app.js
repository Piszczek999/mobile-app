import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, save } from "./firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { validateCharacter } from "./utils.js";
import { createUser, signIn } from "./auth.js";

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

io.on("connection", async (socket) => {
  let character = undefined;
  console.log(socket.id + " connected");

  socket.on("register", async ({ email, name, password }) => {
    try {
      character = await createUser(email, name, password);
      socket.emit("logged", character);
    } catch (error) {
      socket.emit("alert", error);
    }
  });

  socket.on("login", async ({ email, password }) => {
    try {
      character = await signIn(email, password);
    } catch (error) {
      socket.emit("alert", error);
    }
  });

  socket.on("logout", async () => {
    await save(character);
    character = undefined;
    socket.emit("logout");
  });

  socket.on("disconnect", async () => {
    console.log(socket.id + " disconnected");
    await save(character);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
