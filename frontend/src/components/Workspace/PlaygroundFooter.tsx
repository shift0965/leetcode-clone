import { BsChevronUp } from "react-icons/bs";

type PlaygroundFooterProps = {
  handleSubmit: () => void;
  handleRun: () => void;
  splitRatio: number;
  pending: boolean;
  setSplitRatio: React.Dispatch<React.SetStateAction<number>>;
};

const PlaygroundFooter = ({
  handleRun,
  handleSubmit,
  splitRatio,
  pending,
  setSplitRatio,
}: PlaygroundFooterProps) => {
  return (
    <div className="flex bg-dark-layer-1 absolute bottom-0 z-10 w-full">
      <div className="mx-5 my-[10px] flex justify-between w-full">
        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          {pending ? (
            <div className="px-3 py-1.5 font-medium text-dark-label-2 items-center transition-all inline-flex text-sm">
              Pending...
            </div>
          ) : (
            <button
              aria-label="toggle result area"
              className="px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2"
              onClick={() => {
                setSplitRatio((prev) => {
                  return prev > 90 ? 50 : 100;
                });
              }}
            >
              Console
              <div
                className={`ml-1 transform transition duration-200 ease-in-out flex items-center ${
                  splitRatio > 90 ? "rotate-0" : "rotate-180"
                }`}
              >
                <BsChevronUp className="fill-gray-6 mx-1 fill-dark-gray-6" />
              </div>
            </button>
          )}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button
            aria-label="run"
            className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 text-dark-label-2 rounded-lg 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleRun}
            disabled={pending}
          >
            Run
          </button>
          <button
            aria-label="submit"
            className="px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg
                       disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={pending}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default PlaygroundFooter;
