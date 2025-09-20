import { useState } from "react";
import { PlayerCode, PlayerProgress } from "../../types.const";
import CodeMirror from "../Workspace/CodeMirror";
import { BsCheck2Circle } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { hostApi } from "../../api";
import { toast } from "react-toastify";

interface FocusedPlayerProps {
  gameId: number;
  playersCode: PlayerCode[];
  focusedPlayerId: number;
  playersProgress: PlayerProgress[];
  setFocusedPlayerId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const FocusedPlayer = ({
  gameId,
  playersCode,
  focusedPlayerId,
  playersProgress,
  setFocusedPlayerId,
}: FocusedPlayerProps) => {
  const [message, setMessage] = useState("");
  const player = playersCode.find((p) => p.id === focusedPlayerId);
  //if (!player) return setFocusedPlayerId(undefined);

  const [currentProblemId, setCurrentProblemId] = useState<number>(
    player?.lastModifyedProblem || 0
  );
  const progress = playersProgress.find(
    (progress) => progress.id === player?.id
  )?.progress;

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    setMessage((prev) => prev.trim());
    if (message === "") return;
    if (message.length > 50)
      return toast.error("Message cannot be longer than 50 characters");
    setMessage("");

    if (e.nativeEvent.submitter.name === "sendMessage" && player) {
      hostApi.sendMessage({
        gameId: gameId,
        playerId: player.id,
        message: message,
      });
    } else if (e.nativeEvent.submitter.name === "sendGroupMessage") {
      hostApi.sendMessage({
        gameId: gameId,
        playerId: -1,
        message: message,
      });
    }
  };

  return (
    <div className="text-gray-50 flex gap-[12px] px-[10px] mt-[8px] h-[calc(100vh-64px)] w-full overflow-y-auto relative">
      {player && (
        <>
          <div className="w-full  shrink rounded-lg overflow-hidden bg-dark-layer-1">
            <CodeMirror
              userCode={player.problems[currentProblemId].code}
              readOnly={true}
              textLarge={true}
            />
          </div>

          <div className="flex flex-col w-[300px] shrink-0 text-white bg-dark-layer-2">
            <div className="w-full overflow-auto flex flex-col">
              <div className="h-14 flex items-center px-3 text-dark-gray-8 text-lg border-b-[1px] border-dark-fill-2">
                Problems
              </div>
              <div className="overflow-y-auto">
                {player.problems.map((problem, id) => (
                  <div
                    className={`flex items-center px-4 py-[7px] text-sm  cursor-pointer w-full h-14 hover:bg-dark-fill-3 ${
                      id === currentProblemId
                        ? "bg-dark-layer-1"
                        : "bg-dark-layer-2"
                    }`}
                    onClick={() => setCurrentProblemId(id)}
                    key={id}
                  >
                    <span>
                      {id + 1}. {problem.title}
                    </span>
                    {progress &&
                      progress.map((progress, id) => (
                        <span
                          key={id}
                          className={`text-dark-green-s ml-auto text-[18px] ${
                            progress.id === problem.id && progress.passed
                              ? "block"
                              : "hidden"
                          }`}
                        >
                          <BsCheck2Circle />
                        </span>
                      ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-auto h-40">
              <div className="h-14 flex items-center px-3 text-dark-gray-8 text-lg border-t-[1px] border-dark-fill-2">
                Send Message
              </div>
              <form onSubmit={handleSendMessage} autoComplete="off">
                <div className="px-2">
                  <input
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className=" w-full bg-dark-fill-2 rounded-lg outline-none text-lg px-3 py-2 resize-none"
                  ></input>
                </div>
                <div className="flex px-3 mt-3">
                  <button
                    type="submit"
                    id="send-message-btn"
                    name="sendMessage"
                    className=" px-3 py-1.5 font-medium items-center transition-all flex text-sm text-white bg-dark-green-s hover:bg-opacity-80 rounded-lg"
                  >
                    Send
                  </button>
                  <button
                    type="submit"
                    id="send-group-message-btn"
                    name="sendGroupMessage"
                    className="ml-auto px-3 py-1.5 font-medium items-center transition-all flex text-sm text-white bg-dark-gray-6 hover:bg-opacity-80 rounded-lg"
                  >
                    Send Group
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            id="close-focus-btn"
            className=" absolute text-[24px] rounded-full border-[1.5px] border-white p-1 left-1/2 -translate-x-1/2 top-[30px] opacity-30 hover:opacity-90 transition-all cursor-pointer"
            onClick={() => setFocusedPlayerId(undefined)}
          >
            <IoClose />
          </div>
        </>
      )}
    </div>
  );
};

export default FocusedPlayer;
