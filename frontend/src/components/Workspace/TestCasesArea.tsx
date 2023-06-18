import { ProblemDetails } from "../../types.const";
import { useState } from "react";
import ValueDisplayArea from "./ValueDisplayArea";

interface TestCasesAreaProps {
  problem: ProblemDetails;
  showTestcases: boolean;
}

const TestCasesArea = ({ problem, showTestcases }: TestCasesAreaProps) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  return (
    <div className={`${showTestcases ? "block" : "hidden"}`}>
      <div className="flex">
        {problem.exampleCases.map((e, index) => (
          <div
            className="mr-2 items-start mt-2 "
            key={index}
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
      <div className="mt-4">
        {problem.exampleCases.map((example, exampleId) => {
          return (
            <div
              className={`${
                exampleId === activeTestCaseId ? "block" : "hidden"
              }`}
            >
              <div className="mt-4">
                {problem.inputKeys.map((key, InputId) => (
                  <ValueDisplayArea
                    label={key}
                    value={
                      problem.exampleCases[activeTestCaseId]?.input[InputId]
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestCasesArea;
