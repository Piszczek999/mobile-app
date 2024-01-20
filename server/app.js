import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { signIn } from "./auth.js";
import { getCharacter, save } from "./firestore.js";

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
  let uid = "";
  let character = undefined;
  console.log(socket.id + " connected");

  socket.on("login", async (tokenId) => {
    try {
      uid = await signIn(tokenId);
      character = await getCharacter(uid);
      socket.emit("logged", character);
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
