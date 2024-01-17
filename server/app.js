import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db, save } from "./firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { validateCharacter } from "./utils.js";

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

const auth = getAuth();

app.use(express.static("public"));

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

io.on("connection", async (socket) => {
  let user = undefined;
  let character = undefined;
  console.log(socket.id + " connected");

  socket.on("register", async ({ email, name, password }) => {
    try {
      const { user: userDB } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newCharacter = {
        name: name,
        level: 1,
        exp: 0,
        gold: 100,
        equipment: { head: null, chest: null, legs: null, boots: null },
      };
      await setDoc(doc(db, "users", userDB.uid), newCharacter);
      character = newCharacter;
      user = userDB;
      socket.emit("logged", character);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        socket.emit(
          "alert",
          "Email is already in use. Please choose a different email."
        );
      } else {
        console.error(error);
        socket.emit(
          "alert",
          "An error occurred during registration. Please try again."
        );
      }
    }
  });

  socket.on("login", async ({ email, password }) => {
    try {
      const { user: userDB } = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const res = await getDoc(doc(db, "users", userDB.uid));
      character = validateCharacter(res.data());
      user = userDB;
      socket.emit("logged", character);
    } catch (error) {
      console.error(error);
      socket.emit("alert", "Invalid email or password. Please try again.");
    }
  });

  socket.on("logout", async () => {
    await save(character, user.uid);
    user = undefined;
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
