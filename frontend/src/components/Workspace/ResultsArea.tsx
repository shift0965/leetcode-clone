import {
  ExecutionError,
  ProblemDetails,
  SubmitResult,
} from "../../types.const";
import { useState, useEffect } from "react";
import { RunResult } from "../../types.const";
import ValueDisplayArea from "./ValueDisplayArea";

interface ResultsAreaProps {
  problem: ProblemDetails;
  pending: boolean;
  showTestcases: boolean;
  runResults: RunResult[] | undefined;
  submitResult: SubmitResult | undefined;
  execError: ExecutionError | undefined;
}

const ResultsArea = ({
  problem,
  pending,
  showTestcases,
  runResults,
  execError,
  submitResult,
}: ResultsAreaProps) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [accepted, setAccepted] = useState<boolean>(true);

  useEffect(() => {
    runResults?.forEach((res) => {
      if (!res.passed) {
        setAccepted(false);
      }
    });
  }, [runResults]);

  return (
    <div className={`${showTestcases ? "hidden" : "block"} py-4`}>
      {execError && (
        <>
          <h1 className="text-dark-pink font-semibold text-xl ml-1">
            {execError.name}
          </h1>
          <div className="w-full cursor-text rounded-lg border px-3 py-[8px] bg-dark-fill-3 border-transparent text-dark-pink bg-dark-pink bg-opacity-[15%] mt-3">
            <pre className="whitespace-pre-wrap text-sm leading-6">
              {execError.line && `Line ${execError.line}\n`}
              {execError.message}
            </pre>
          </div>
        </>
      )}
      {runResults && (
        <>
          <h1 className="font-semibold text-xl ml-1">
            {accepted ? (
              <span className="text-dark-green-s">Accepted</span>
            ) : (
              <span className="text-dark-pink">Wrong Answer</span>
            )}
          </h1>
          <div className="flex mt-1">
            {problem.exampleCases.map((e, exampleId) => (
              <div
                className="mr-2 items-start mt-2 "
                key={exampleId}
                onClick={() => setActiveTestCaseId(exampleId)}
              >
                <div className="flex flex-wrap items-center gap-y-4">
                  <div
                    className={`items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                  ${
                    activeTestCaseId === exampleId
                      ? "text-white"
                      : "text-gray-500"
                  }
                `}
                  >
                    <div
                      className={`w-1 h-1 rounded-full mr-2 ${
                        runResults[exampleId].passed
                          ? " bg-dark-green-s"
                          : "bg-dark-pink"
                      }`}
                    ></div>
                    Case {exampleId + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {problem.exampleCases.map((example, exampleId) => {
            return (
              <div
                key={exampleId}
                className={`${
                  exampleId === activeTestCaseId ? "block" : "hidden"
                }`}
              >
                <div className="mt-4">
                  <ValueDisplayArea
                    label="Stdin"
                    value={example.input
                      .map((input) => JSON.stringify(input))
                      .join(", ")}
                  />
                </div>
                <div className="mt-4">
                  <ValueDisplayArea
                    label="Stdout"
                    value={runResults[activeTestCaseId].stdout.join("\n")}
                  />
                </div>
                <div className="mt-4">
                  <ValueDisplayArea
                    label="Output"
                    value={runResults[activeTestCaseId].output}
                  />
                </div>
                <div className="mt-4">
                  <ValueDisplayArea
                    label="Expected"
                    value={runResults[activeTestCaseId].expected}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}

      {submitResult && submitResult.passed && (
        <>
          <h1 className="font-semibold text-xl ml-1">
            <span className="text-dark-green-s">Passed</span>
          </h1>
          <div className=" text-dark-gray-7 text-md tracking-wide flex h-24 justify-center items-center">
            All the test cases are passed
          </div>
        </>
      )}
      {submitResult && !submitResult.passed && (
        <>
          <h1 className="font-semibold text-xl ml-1">
            <span className="text-dark-pink">Failed</span>
          </h1>
          <div>
            <div className="mt-4">
              <ValueDisplayArea
                label="Input"
                value={submitResult.input
                  ?.map((value) => JSON.stringify(value))
                  .join(", ")}
              />
            </div>
            <div className="mt-4">
              <ValueDisplayArea label="Output" value={submitResult.output} />
            </div>
            <div className="mt-4">
              <ValueDisplayArea
                label="Expected"
                value={submitResult.expected}
              />
            </div>
          </div>
        </>
      )}

      {!(runResults || execError || submitResult) && (
        <div className=" text-dark-gray-7 text-md tracking-wide flex h-24 justify-center items-center">
          {pending ? "Pending..." : "You need to run you code first"}
        </div>
      )}
    </div>
  );
};

export default ResultsArea;
