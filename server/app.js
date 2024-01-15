import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { save } from "./firebase.js";

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
  console.log(socket.id + " connected");

  socket.on("register", async ({ email, password }) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      socket.emit("alert", "Account created");
      socket.emit("logged", { username: "test" });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        socket.emit(
          "alert",
          "Email is already in use. Please choose a different email."
        );
      } else {
        console.log(error);
        socket.emit(
          "alert",
          "An error occurred during registration. Please try again."
        );
      }
    }
  });

  socket.on("login", async ({ email, password }) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      socket.emit("alert", "Logged successfully");
      socket.emit("logged", { username: "test" });
    } catch (error) {
      console.error(error);
      socket.emit("alert", "Invalid email or password. Please try again.");
    }
  });

  socket.on("disconnect", async () => {
    console.log(socket.id + " disconnected");
    await save();
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
