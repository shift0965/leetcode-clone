import { ProblemDetails } from "../../types.const";
import { useState, useEffect } from "react";
import {
  AiOutlineSetting,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import Split from "react-split";
import EditorFooter from "./EditorFooter";
import { RUN_EXAMPLE_CASES } from "../../api.const";
import TestCasesArea from "./TestCasesArea";
import ResultsArea from "./ResultsArea";
import { RunResult, ExecutionError } from "../../types.const";
import CodeMirror from "./CodeMirror";

type PlaygroundProps = {
  problem: ProblemDetails | undefined;
};

const Playground = ({ problem }: PlaygroundProps) => {
  const [language, setLanguage] = useState("Javascript");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [settings, setSettings] = useState({});
  const [userCode, setUserCode] = useState<string>("");
  const [showTestcases, setShowTestcases] = useState(true);

  const [runResults, setRunResults] = useState<RunResult[]>([]);
  const [execError, setExecError] = useState<ExecutionError>();

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const handleRun = () => {
    setExecError(undefined);
    setRunResults([]);
    fetch(RUN_EXAMPLE_CASES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problemId: problem?.id || 0,
        language: "js",
        code: userCode,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          return response.json().then((error) => {
            throw error;
          });
        }
        return response.json();
      })
      .then((result) => {
        setRunResults(result);
      })
      .catch((error) => {
        setExecError(error);
      })
      .finally(() => {
        //switch to result
        setShowTestcases(false);
      });
  };
  const handleSubmit = () => {
    console.log(userCode);
  };

  useEffect(() => {
    if (problem) {
      setUserCode(problem.boilerplate.replace(/\n\s+/g, "\n"));
    }
  }, [problem]);

  return (
    <div className="w-full overflow-auto flex flex-col">
      {problem && (
        <>
          <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full">
            <div className="flex items-center text-white">
              <button className="flex cursor-pointer items-center rounded-lg bg-dark-fill-3 text-dark-label-2 px-2 py-1.5 hover:bg-dark-fill-2">
                {language}
              </button>
            </div>
            <div className="flex items-center m-2">
              <button
                className="editor-nav-btn"
                onClick={() =>
                  setSettings({ ...settings, settingsModalIsOpen: true })
                }
              >
                <div className="text-dark-gray-6 font-bold text-lg">
                  <AiOutlineSetting />
                </div>
                {/* <div className="absolute p-2 right-0 top-5 group-hover:scale-100 scale-0 bg-gray-200 text-dark-layer-2 duration-100 translate-x-3">
          Settings
        </div> */}
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
            <div className="flex flex-col h-[calc(100vh-150px)]">
              <Split
                direction="vertical"
                minSize={60}
                sizes={[60, 40]}
                className="h-full"
              >
                <CodeMirror userCode={userCode} setUserCode={setUserCode} />

                {/* Result Header */}
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
                    runResults={runResults}
                    showTestcases={showTestcases}
                    execError={execError}
                  />
                </div>
              </Split>
            </div>
            <EditorFooter handleRun={handleRun} handleSubmit={handleSubmit} />
          </div>
        </>
      )}
    </div>
  );
};

export default Playground;
