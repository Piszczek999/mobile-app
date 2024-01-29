import express, { Express, Request, Response } from "express";
import { Server as NodeServer, createServer } from "http";

import { Server, Socket } from "socket.io";
import { signIn } from "./src/auth";
import { MAPS } from "./src/constants";
import { getCharacter, save } from "./src/firestore";
import { Character } from "./src/types";
import { receiveRewards } from "./src/utils";

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
  let ch: Character | null = null;
  let explorationTimer: NodeJS.Timeout;
  console.log(socket.id + " connected");

  socket.on("login", async (tokenId: string) => {
    console.log(socket.id + " login");

    try {
      uid = await signIn(tokenId);
      ch = await getCharacter(uid);
      socket.emit("updateCharacter", ch);

      if (ch.exploration?.completed == false) {
        explorationTimer = setTimeout(() => {
          if (!ch?.exploration) return;
          ch.exploration.completed = true;
          socket.emit("updateCharacter", ch);
        }, ch.exploration.startTime + ch.exploration.duration - Date.now());
      }
    } catch (error) {
      socket.emit("alert", error);
    }
  });

  socket.on("explorationStart", (mapId: string) => {
    console.log(socket.id + " explorationStart");
    if (!ch) return;
    if (ch.exploration) {
      socket.emit("alert", "You are already exploring!");
      return;
    }

    ch.exploration = {
      mapId: mapId,
      startTime: Date.now(),
      duration: MAPS[mapId].duration,
      completed: false,
    };
    socket.emit("updateCharacter", ch);
    explorationTimer = setTimeout(() => {
      if (!ch?.exploration) return;
      ch.exploration.completed = true;
      socket.emit("updateCharacter", ch);
    }, ch.exploration.duration);
  });

  socket.on("receiveRewards", () => {
    console.log(socket.id + " receiveRewards");

    if (!ch) return;
    if (ch.exploration && ch.exploration.completed == true) {
      receiveRewards(ch);

      socket.emit("alert", "completed");
      socket.emit("updateCharacter", ch);
    }
  });

  socket.on("logout", async () => {
    console.log(socket.id + " logout");
    if (!ch) return;
    await save(ch);
    ch = null;
    clearTimeout(explorationTimer);
    socket.emit("logout");
  });

  socket.on("disconnect", async () => {
    if (!ch) return;
    console.log(socket.id + " disconnected");
    await save(ch);
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
