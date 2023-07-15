import express, { Express, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { redisClient, redisPubsub } from "./model/redis.model.js";

const app: Express = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT;

app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Socket server");
});

io.on("connection", (socket) => {
  socket.on("ws-host-joinGame", (msg) => {
    socket.join(String(msg.gameId));
  });
  socket.on("ws-player-joinGame", (msg) => {
    socket.join(String(msg.gameId));
  });
  socket.on(
    "ws-player-updateCode",
    async (msg: {
      gameId: number;
      playerId: number;
      playerName: string;
      problemId: number;
      problemTitle: string;
      code: string;
    }) => {
      const key = `playersCode-${msg.gameId}-${msg.playerId}`;
      const playerCodeJSON = await redisClient.get(key);

      if (!playerCodeJSON) {
        redisClient.set(
          key,
          JSON.stringify({
            id: msg.playerId,
            name: msg.playerName,
            problems: [
              { id: msg.problemId, title: msg.problemTitle, code: msg.code },
            ],
          })
        );
      } else {
        const playerCode: PlayerCode = JSON.parse(playerCodeJSON);
        const problemIndex = playerCode.problems.findIndex(
          (p) => p.id === msg.problemId
        );
        if (problemIndex === -1) {
          playerCode.problems.push({
            id: msg.problemId,
            title: msg.problemTitle,
            code: msg.code,
          });
        } else {
          playerCode.problems[problemIndex].code = msg.code;
        }
        redisClient.set(key, JSON.stringify(playerCode));
      }
      redisClient.expire(key, 3600, "GT");

      socket.to(String(msg.gameId)).emit("ws-host-playerUpdateCode", {
        id: msg.playerId,
        name: msg.playerName,
        problemId: msg.problemId,
        problemTitle: msg.problemTitle,
        code: msg.code,
      });
    }
  );
});

redisPubsub.subscribe(
  "ps-player-joinGame",
  "ps-player-exitGame",
  "ps-host-terminateGame",
  "ps-host-startGame",
  "ps-player-updateProgress",
  "ps-host-sendMessageToPlayer",
  "ps-host-closeGame"
);
redisPubsub.on("message", (channel: string, message: string) => {
  const response = JSON.parse(message);
  if (channel === "ps-player-joinGame") {
    io.to(String(response.contestId)).emit("ws-host-playerJoinGame", {
      id: response.id,
      name: response.name,
    });
  } else if (channel === "ps-player-exitGame") {
    io.to(String(response.contestId)).emit("ws-host-playerExitGame", {
      id: response.id,
    });
  } else if (channel === "ps-host-terminateGame") {
    io.to(String(response.contestId)).emit("ws-player-hostTerminateGame");
  } else if (channel === "ps-host-closeGame") {
    io.to(String(response.contestId)).emit("ws-player-hostCloseGame");
  } else if (channel === "ps-host-startGame") {
    io.to(String(response.contestId)).emit("ws-player-hostStartGame");
  } else if (channel === "ps-player-updateProgress") {
    io.to(String(response.contestId)).emit("ws-host-updateProgress", {
      playerId: response.playerId,
      progress: response.progress,
      finishedAt: response.finishedAt,
    });
  } else if (channel === "ps-host-sendMessageToPlayer") {
    io.to(String(response.contestId)).emit("ws-player-sendMessageToPlayer", {
      id: response.playerId,
      message: response.message,
    });
  }
});

httpServer.listen(port, () => {
  console.log("Socket server listening on http://localhost:" + port);
});

interface Player {
  id: string;
  name: string;
}

interface PlayerCode {
  id: number;
  name: string;
  problems: {
    id: number;
    title: string;
    code: string;
  }[];
}
