import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

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
  console.log(socket.id + " connected");
  socket.emit("alert", "Hello ;)");

  socket.on("disconnect", async () => {
    console.log(socket.id + " disconnected");
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
