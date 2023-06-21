import express, { Express, Request, Response } from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import { redisClient } from "./model/redis.model.js";

interface Player {
  id: string;
  name: string;
}
const roomPlayerMap = new Map<string, Player[]>();

redisClient.subscribe("host-createRoom");
redisClient.subscribe("player-joinRoom");
redisClient.on("message", (channel: string, message: string) => {
  const response = JSON.parse(message);
  if (channel === "host-createRoom") {
    roomPlayerMap.set(response.roomId, []);
    console.log("host create room", roomPlayerMap);
  } else if (channel === "player-joinRoom") {
    roomPlayerMap.set(response.roomId, [
      {
        id: response.playerId,
        name: response.playerName,
      },
    ]);
    console.log("player-joinRoom", roomPlayerMap);
  }
});

const app: Express = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

dotenv.config();

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

httpServer.listen(port, () => {
  console.log("Socket server listening on http://localhost:" + port);
});
