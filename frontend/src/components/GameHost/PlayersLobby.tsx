import { PLAYER_AVATAR_URL } from "../../api.const";
import { Player } from "../../types.const";

interface PlayerLobbyProps {
  players: Player[];
}

const PlayersLobby = ({ players }: PlayerLobbyProps) => {
  const playersDiamonds = [4, 3, 5, 10, 1, 2, 11, 8, 0, 9, 6, 7];
  return (
    <div className="flex flex-wrap w-[760px] mx-auto justify-left">
      {playersDiamonds.map((playerId, id) => {
        const playerData = players[playerId];
        return (
          <div
            className={` -mb-[28px] h-[120px] w-[120px] mx-[32px] bg-dark-fill-3 rotate-45 flex justify-center items-center rounded-md
              ${(id === 0 || id === 7) && " ml-[124px]"}
              ${id === 10 && " ml-[215px]"}
              ${playerData && "bg-green-200 bg-opacity-40"}
               transition-all duration-300`}
            key={id}
          >
            <div
              className={`-rotate-45 ${
                !playerData && "opacity-0"
              } transition-all duration-300`}
            >
              {playerData && (
                <>
                  <img
                    alt="image"
                    src={`${PLAYER_AVATAR_URL}&seed=${players[playerId]?.name}`}
                    className="h-20 mb-[34px]"
                  />
                  <div
                    className={`absolute left-[50%] -translate-x-[50%] bottom-[3px] text-white w-20 break-all text-center max-h-8 overflow-hidden leading-4
             ${
               playerData.name.length > 10 ? "text-sm" : "font-medium text-md"
             }`}
                  >
                    {playerData.name}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayersLobby;
