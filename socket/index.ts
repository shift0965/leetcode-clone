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

const roomUserMap = new Map<string, string[]>();
const port = process.env.PORT;

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Socket server");
});

io.on("connection", (socket) => {
  socket.on("ws-host-createGame", (msg) => {
    socket.join(msg.gameId);
  });
  socket.on("ws-player-joinGame", (msg) => {
    socket.join(msg.gameId);
  });
});

redisClient.subscribe(
  "ps-player-joinGame",
  "ps-player-exitGame",
  "ps-host-terminateGame"
);
redisClient.on("message", (channel: string, message: string) => {
  const response = JSON.parse(message);
  if (channel === "ps-player-joinGame") {
    io.to(response.contestId).emit("ws-host-playerJoinGame", {
      id: response.id,
      name: response.name,
    });
  } else if (channel === "ps-player-exitGame") {
    io.to(response.contestId).emit("ws-host-playerExitGame", {
      id: response.id,
    });
  } else if (channel === "ps-host-terminateGame") {
    io.to(response.contestId).emit("ws-player-hostTerminateGame");
  }
});

httpServer.listen(port, () => {
  console.log("Socket server listening on http://localhost:" + port);
});
