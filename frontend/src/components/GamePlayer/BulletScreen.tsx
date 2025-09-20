import { useState, useEffect, useRef } from "react";
import { uniqueId } from "lodash";
import { Bullet, Player } from "../../types.const";
import { io } from "socket.io-client";
import { WEB_SOCKET_URL } from "../../api";

interface BulletScreenProps {
  player: Player;
}

const BulletScreen = ({ player }: BulletScreenProps) => {
  const socket = useRef(io(WEB_SOCKET_URL)).current;
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const colorNameArray = [
    "bg-sky-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-slate-500",
    "bg-green-500",
    "bg-purple-500",
  ];

  useEffect(() => {
    socket.emit("ws-player-joinGame", { gameId: player.gameId });
    socket.on(
      "ws-player-sendMessageToPlayer",
      function (item: { id: number; message: string }) {
        if (item.id === -1 || item.id === player.id) {
          console.log(new Date().toLocaleString());
          console.log("Host message", item.message);
          sendBullet(item.message);
        }
      }
    );

    return () => {
      socket.off("ws-player-sendMessageToPlayer");
    };
  }, [socket]);

  const sendBullet = (message: string) => {
    const randomHeight = 0 + Math.random() * 400;
    const id = uniqueId();
    const duration = 15 + Math.floor(Math.random() * 8);
    const colorName =
      colorNameArray[Math.floor(Math.random() * colorNameArray.length)];
    setBullets((prev) => [
      ...prev,
      {
        message: message,
        height: randomHeight,
        id: id,
        duration: duration,
        colorName: colorName,
      },
    ]);
    setTimeout(() => {
      setBullets((prev) => prev.filter((bullet) => bullet.id !== id));
    }, duration * 1000);
  };

  return (
    <div className="bg-transparent h-[calc(100vh-48px)] w-full absolute overflow-hidden top-0 z-40 pointer-events-none">
      {bullets.map((bullet) => {
        return (
          <div
            className="bullet"
            style={{
              top: bullet.height,
              animationDuration: `${bullet.duration}s`,
            }}
            key={bullet.id}
          >
            <div
              className={`bg-opacity-50 ${bullet.colorName} flex shrink-0 items-center py-0.5 pl-3 pr-2 rounded-l-3xl rounded-r-lg truncate max-w-[800px]`}
            >
              <img src="./gameHost.png" alt="GameHost" className="h-7 mr-2" />
              {bullet.message}
            </div>
            <img src="fire.gif" className=" rotate-90 h-8 opacity-90" />
          </div>
        );
      })}
    </div>
  );
};

export default BulletScreen;
