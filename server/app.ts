import express, { Express, Request, Response } from "express";
import { createServer, Server as NodeServer } from "http";

import { signIn } from "./src/auth";
import { getCharacter, save } from "./src/firestore";
import { maps } from "./src/constants";
import { explorationComplete } from "./src/utils";
import { Server, Socket } from "socket.io";

const port: number = 3000;
const app: Express = express();
const server: NodeServer = createServer(app);
const io: Server = new Server(server);

app.use(express.static("public"));

app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "Hello world",
  });
});

io.on("connection", async (socket: Socket) => {
  let uid: string = "";
  let character: any = undefined;
  let explorationTimer: NodeJS.Timeout;
  console.log(socket.id + " connected");

  socket.on("login", async (tokenId: string) => {
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

  socket.on("explorationStart", (mapId: string) => {
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
