import { io } from "socket.io-client";

export const socket = io(
  // "https://mobile-app-server-3331c93a3d85.herokuapp.com"
  // "http://192.168.249.36:5001"
  "http://192.168.1.22:5001"
);

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

export const changeName = (name: string) => {
  socket.emit("changeName", name);
};

export const handleAlert = (message: any) => alert(message);
