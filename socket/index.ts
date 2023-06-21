import express, { Express, Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import { redisClient } from "./model/redis.model.js";
dotenv.config();

interface Player {
  id: string;
  name: string;
}
const roomPlayerMap = new Map<string, Player[]>();

const app: Express = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

redisClient.subscribe("host-createRoom", "player-joinRoom");

const roomUserMap = new Map<string, string[]>();
const port = process.env.PORT;

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Socket server");
});

io.on("connection", (socket) => {
  socket.on("host-JoinRoom", (roomId) => {
    socket.join("cool");
    console.log("host join room " + "cool");
    io.to("cool").emit("host-Connected", "connected!");
    //console.log("host join room " + roomId);
    //roomUserMap.set(roomId, roomUserMap.get(roomId) || []);
  });

  socket.on("player-JoinRoom", () => {
    socket.join("cool");
    console.log("player join room " + "cool");
    // if (roomUserMap.has(roomId)) {
    //   //socket.join("cool");
    //   //console.log("player join room " + roomId);
    //   // const player = roomUserMap.get(roomId) || [];
    //   // player.push(userName);
    //   // socket.to(roomId).emit("host-PlayerList", player);
    //   // socket.to(roomId).emit("player-JoinRoomResult", { success: true });
    // } else {
    //   socket.emit("player-JoinRoomResult", { success: false });
    // }
  });

  socket.on("player-send-me-message", () => {
    console.log("send");
    socket.to("cool").emit("player-JoinRoomResult", "message");
    socket.to("cool").emit("host-PlayerList", ["Leo"]);
  });
});

redisClient.on("message", (channel: string, message: string) => {
  const response = JSON.parse(message);
  console.log(response);
  if (channel === "host-createRoom") {
    console.log(response.contestId);
  } else if (channel === "player-joinRoom") {
    io.emit("host-playerJoinRoom", response.playerName);
  }
});

httpServer.listen(port, () => {
  console.log("Socket server listening on http://localhost:" + port);
});
