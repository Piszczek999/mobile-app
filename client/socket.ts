import { io } from "socket.io-client";

export const socket = io("http://192.168.249.36:3000");

export const login = (token: string) => {
  socket.emit("login", token);
};

export const logout = () => {
  socket.emit("logout");
};

export const explorationStart = (mapId: string) => {
  socket.emit("explorationStart", mapId);
};

export const explorationComplete = () => {
  socket.emit("explorationComplete");
};
