import { ProblemDetails } from "../../types.const";

interface DescriptionAreaProps {
  problem: ProblemDetails;
}
const DescriptionArea = ({ problem }: DescriptionAreaProps) => {
  return (
    <div className="flex px-0 py-4 h-[calc(100vh-88px)] overflow-y-auto">
      <div className="px-5">
        {/* Problem heading */}
        <div className="w-full">
          <div className="flex space-x-4">
            <div className="flex-1 mr-2 text-lg font-semibold text-white">
              {problem.id}. {problem.title}
            </div>
          </div>

          <div className="flex items-center mt-4">
            <div
              className={`${
                problem.difficulty === "Hard"
                  ? "bg-dark-pink text-dark-pink"
                  : problem.difficulty === "Medium"
                  ? "bg-dark-yellow text-dark-yellow"
                  : "bg-dark-green-s text-dark-green-s"
              } inline-block rounded-[21px] bg-opacity-[.20] px-2.5 py-1 text-xs font-semibold`}
            >
              {problem.difficulty}
            </div>
          </div>
          <div
            className="text-white text-md description mt-5"
            dangerouslySetInnerHTML={{ __html: problem.description }}
          ></div>

          {/* Examples */}
          <div className="mt-6">
            {problem.exampleCases.map((example, id) => (
              <div key={id}>
                <p className="font-medium text-white">Example {id + 1}: </p>
                <div className="example-card">
                  {example.image && (
                    <img
                      src={example.image}
                      className="mt-2 w-full max-w-[450px]"
                    />
                  )}
                  <pre className="text-sm">
                    <strong className="text-white">Input: </strong>
                    {problem.inputKeys.map((key, id) => (
                      <span className="mr-4" key={id}>
                        {key} = {JSON.stringify(example.input[id])}
                      </span>
                    ))}
                    <br />
                    <strong>Output: </strong>
                    {JSON.stringify(example.output)} <br />
                    {example.explanation && (
                      <>
                        <strong>Explanation: </strong>
                        {example.explanation}
                      </>
                    )}
                  </pre>
                </div>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="my-8 pb-4">
            <div className="text-white text-md font-semibold">Constraints:</div>
            {problem.constraints.map((constraint, id) => {
              return (
                <ul className="text-white ml-5 list-disc mt-2" key={id}>
                  <div dangerouslySetInnerHTML={{ __html: constraint }}></div>
                </ul>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionArea;
