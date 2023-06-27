import { ProblemDetails } from "../../types.const";
import DescriptionArea from "./DescriptionArea";

type DescriptionProps = {
  problem: ProblemDetails | undefined;
  //_solved: boolean;
};

const Description = ({ problem }: DescriptionProps) => {
  return (
    <div className="bg-dark-layer-1">
      {problem && (
        <>
          <div className="flex h-10 w-full items-end bg-dark-layer-2 text-white overflow-x-hidden">
            <div
              className={
                "bg-dark-layer-1 rounded-t-[5px] px-5 py-[7px] text-sm cursor-pointer"
              }
            >
              Description
            </div>
          </div>
          <DescriptionArea problem={problem} />
        </>
      )}
    </div>
  );
};

export default Description;
