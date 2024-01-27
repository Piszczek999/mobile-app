import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { signIn } from "./auth.js";
import { getCharacter, save } from "./firestore.js";
import { maps } from "./constants.js";
import { explorationComplete } from "./utils.js";

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
  let explorationTimer;
  console.log(socket.id + " connected");

  socket.on("login", async (tokenId) => {
    try {
      uid = await signIn(tokenId);
      character = await getCharacter(uid);
      socket.emit("updateCharacter", character);
      if (character.exploration) {
        explorationTimer = setTimeout(() => {
          explorationComplete(socket, character);
        }, character.exploration.startTime + character.exploration.duration - Date.now());
      }
    } catch (error) {
      socket.emit("alert", error);
    }
  });

  socket.on("logout", async () => {
    await save(character);
    character = null;
    socket.emit("logout");
  });

  socket.on("explorationStart", (mapId) => {
    if (character.exploration) {
      socket.emit("alert", "You are already exploring!");
      return;
    }

    character.exploration = {
      mapId: mapId,
      startTime: Date.now(),
      duration: maps[mapId].duration,
    };
    socket.emit("updateCharacter", character);

    explorationTimer = setTimeout(() => {
      explorationComplete(socket, character);
    }, character.exploration.duration);
  });

  socket.on("disconnect", async () => {
    console.log(socket.id + " disconnected");

    clearTimeout(explorationTimer);

    await save(character);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
