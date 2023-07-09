import { IoRefreshOutline } from "react-icons/io5";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { useState, useEffect } from "react";
import Split from "react-split";
import PlaygroundFooter from "./PlaygroundFooter";
import TestCasesArea from "./TestCasesArea";
import ResultsArea from "./ResultsArea";
import CodeMirror from "./CodeMirror";
import {
  RunResult,
  ExecutionError,
  SubmitResult,
  ProblemDetails,
  PlayerProgress,
  Player,
} from "../../types.const";
import {
  RUN_EXAMPLE_CASES,
  RUN_TEST_CASES,
  PLAYER_SUBMIT,
} from "../../api.const";
import { toast } from "react-toastify";
import Loading from "../Loading";

type PlaygroundProps = {
  problem: ProblemDetails;
  gameMode?: boolean;
  gameData?: {
    player: Player;
    myProgress: PlayerProgress;
    setMyProgress: React.Dispatch<
      React.SetStateAction<PlayerProgress | undefined>
    >;
    updateCode: (
      gameId: number,
      playerId: number,
      playerName: string,
      problemId: number,
      problemTitle: string,
      code: string
    ) => void;
  };
};

const Playground = ({
  problem,
  gameMode = false,
  gameData = undefined,
}: PlaygroundProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [userCode, setUserCode] = useState<string>("");
  const [showTestcases, setShowTestcases] = useState(true);

  const [runResults, setRunResults] = useState<RunResult[]>();
  const [submitResult, setSubmitResult] = useState<SubmitResult>();
  const [execError, setExecError] = useState<ExecutionError>();
  const [splitRatio, setSplitRatio] = useState<number>(50);
  const [pending, setPending] = useState<boolean>(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const pendingStart = () => {
    setPending(true);
    setExecError(undefined);
    setRunResults(undefined);
    setSubmitResult(undefined);
  };
  const pendingStop = () => {
    setShowTestcases(false); //switch to result page
    setPending(false);
  };

  const handleRun = () => {
    pendingStart();
    fetch(RUN_EXAMPLE_CASES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problemId: problem.id || 0,
        language: "js",
        code: userCode,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.type === "error") {
          setExecError(result.data);
        } else {
          setRunResults(result.data);
        }
      })
      .catch((error) => {
        toast.error("run failed");
        console.log(error);
      })
      .finally(() => {
        pendingStop();
      });
  };

  const handleSubmit = () => {
    pendingStart();
    const endPoint = gameMode ? PLAYER_SUBMIT : RUN_TEST_CASES;
    fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        gameMode
          ? {
              problemId: problem.id || 0,
              language: "js",
              code: userCode,
              playerId: gameData?.player.id,
              gameId: gameData?.player.gameId,
              progress: gameData?.myProgress.progress,
              finishedAt: gameData?.myProgress.finishedAt,
            }
          : {
              problemId: problem.id || 0,
              language: "js",
              code: userCode,
            }
      ),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        if (result.type === "error") {
          setExecError(result.data);
        } else {
          setSubmitResult(result.data);
        }

        if (result.data.passed) {
          toast.success("Passed !");
          const problemStatus = JSON.parse(
            localStorage.getItem("problemStatus") || "{}"
          );
          problemStatus[problem.id] = true;
          localStorage.setItem("problemStatus", JSON.stringify(problemStatus));
          if (gameMode) {
            gameData?.setMyProgress({
              id: gameData.myProgress.id,
              name: gameData.myProgress.name,
              progress: result.progress,
              finishedAt: result.finishedAt,
            });
          }
        }
      })
      .catch((error) => {
        toast.error("submit failed");
        console.log(error);
      })
      .finally(() => {
        pendingStop();
      });
  };

  const onChangeCode = (code: string) => {
    if (problem) {
      localStorage.setItem(
        `code?problem_id=${problem.id}&${gameMode && "gameMode"}`,
        code
      );
      if (gameMode) {
        gameData?.updateCode(
          gameData.player.gameId,
          gameData.player.id,
          gameData.player.name,
          problem.id,
          problem.title,
          code
        );
      }
    }
    setUserCode(code);
  };

  const resetUserCode = () => {
    if (problem) setUserCode(problem.boilerplate.replace(/\n\s+/g, "\n"));
  };

  useEffect(() => {
    if (problem) {
      const storedCode = localStorage.getItem(
        `code?problem_id=${problem.id}&${gameMode && "gameMode"}`
      );
      if (storedCode !== null) {
        setUserCode(storedCode);
      } else {
        setUserCode(problem.boilerplate.replace(/\n\s+/g, "\n"));
      }
    }
  }, [problem]);

  return (
    <div className="w-full overflow-auto flex flex-col">
      {problem && (
        <>
          <div className="flex items-center justify-between bg-dark-layer-2 h-10 w-full">
            <div className="flex items-center text-white">
              <button className="flex cursor-pointer items-center rounded-lg bg-dark-fill-3 text-dark-label-2 px-2 py-1 hover:bg-dark-fill-2">
                JavaScript
              </button>
            </div>
            <div className="flex items-center m-2">
              <button className="editor-nav-btn group" onClick={resetUserCode}>
                <div className="text-dark-gray-6 font-bold text-lg">
                  <IoRefreshOutline />
                </div>
              </button>

              <button
                className="editor-nav-btn group"
                onClick={handleFullScreen}
              >
                <div className="text-dark-gray-6 font-bold text-lg">
                  {!isFullScreen ? (
                    <AiOutlineFullscreen />
                  ) : (
                    <AiOutlineFullscreenExit />
                  )}
                </div>
                {/* <div className="absolute p-2 right-0 top-5 group-hover:scale-100 scale-0 bg-gray-200 text-dark-layer-2 duration-100 translate-x-3 whitespace-nowrap ">
          Full Screen
        </div> */}
              </button>
            </div>
          </div>

          <div className=" bg-dark-layer-1 h-full relative">
            <div className="flex flex-col h-[calc(100vh-140px)]">
              <Split
                direction="vertical"
                minSize={0}
                snapOffset={60}
                sizes={[splitRatio, 100 - splitRatio]}
                className="h-full"
                onDragEnd={(size) => {
                  setSplitRatio(size[0]);
                }}
              >
                <CodeMirror userCode={userCode} onChangeCode={onChangeCode} />

                {/* Console area */}
                <div className="w-full px-5 overflow-auto relative">
                  <div className="flex h-11 sticky top-0 bg-dark-layer-1 z-10">
                    <div
                      className={`flex h-full items-center text-white mx-2 border-b-2 cursor-pointer ${
                        showTestcases ? "border-white" : "border-transparent"
                      }`}
                      onClick={() => setShowTestcases(true)}
                    >
                      Testcases
                    </div>
                    <div
                      className={`flex h-full  items-center text-white mx-2 border-b-2 cursor-pointer ${
                        showTestcases ? "border-transparent" : "border-white"
                      }`}
                      onClick={() => setShowTestcases(false)}
                    >
                      Result
                    </div>
                  </div>

                  <TestCasesArea
                    problem={problem}
                    showTestcases={showTestcases}
                  />
                  <ResultsArea
                    problem={problem}
                    pending={pending}
                    runResults={runResults}
                    showTestcases={showTestcases}
                    execError={execError}
                    submitResult={submitResult}
                  />
                </div>
              </Split>
            </div>
            <PlaygroundFooter
              handleRun={handleRun}
              handleSubmit={handleSubmit}
              splitRatio={splitRatio}
              setSplitRatio={setSplitRatio}
              pending={pending}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Playground;
