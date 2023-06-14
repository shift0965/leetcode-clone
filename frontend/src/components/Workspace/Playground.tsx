import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import {
  AiOutlineSetting,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import Split from "react-split";

const Playground = () => {
  const [language, setLanguage] = useState("Javascript");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [settings, setSettings] = useState({});
  const [showTestcases, setShowTestcases] = useState(true);
  const [activeTestCaseId, setActiveTestCaseId] = useState(0);

  const problem = {
    examples: [
      // { id: 0, inputs: { nums: [2, 7, 11, 15] }, outputText: {} },
      {
        id: 0,
        inputs: [
          { label: "nums", value: "[3,2,4]" },
          { label: "target", value: "6" },
        ],
      },
    ],
  };

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  return (
    <div className="w-full overflow-auto flex flex-col">
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

          <button className="editor-nav-btn group" onClick={handleFullScreen}>
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

      <div className="flex flex-col  bg-dark-layer-1 h-[calc(100vh-94px)]">
        <Split
          direction="vertical"
          minSize={60}
          sizes={[60, 40]}
          className=" h-full"
        >
          <div className="w-full overflow-auto h-full flex flex-col">
            <ReactCodeMirror
              className="codeMirror"
              value="const a=0"
              theme={vscodeDark}
              extensions={[javascript()]}
            />
          </div>

          <div className="w-full px-5 overflow-auto relative ">
            <div className="flex h-10 mt-2">
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
            <div className="flex">
              {problem.examples.map((example, index) => (
                <div
                  className="mr-2 items-start mt-2 "
                  key={example.id}
                  onClick={() => setActiveTestCaseId(index)}
                >
                  <div className="flex flex-wrap items-center gap-y-4">
                    <div
                      className={`items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									`}
                    >
                      Case {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-4">
              {problem.examples.map((example, idx) => (
                <>
                  {example.inputs.map(({ label, value }) => (
                    <>
                      <p className="text-sm mt-4 text-white">{label} =</p>
                      <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        {value}
                      </div>
                    </>
                  ))}
                </>
              ))}
            </div>
          </div>
        </Split>
      </div>
    </div>
  );
};

export default Playground;
